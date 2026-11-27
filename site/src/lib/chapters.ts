import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { catalog } from '../data/catalog';
import draftSources from '../data/draft-sources.json';
import { readBranchFile, readRepoFile, repoRoot } from './repoSource';
import { renderChapter } from './renderChapter';
import { renderDocument } from './renderDocument';
import { shouldIncludeDrafts, shouldIncludeWorkspace } from './siteMode';
import { briefPaths, documentRoutes } from './workspace';

async function loadChapters() {
  const approved = new Map<string, string>();
  for (const file of await readdir(resolve(repoRoot, 'chapters'))) {
    const match = /^(\d{2})-(.+)\.md$/.exec(file);
    if (!match) continue;
    if (approved.has(match[1])) throw new Error(`Multiple approved files for chapter ${match[1]}`);
    approved.set(match[1], `chapters/${file}`);
  }

  const showDrafts = shouldIncludeDrafts();
  const showWorkspace = shouldIncludeWorkspace();
  const chapters = await Promise.all(catalog.map(async (chapter) => {
    const approvedFile = approved.get(chapter.number);
    if (approvedFile) {
      const markdown = await readRepoFile(approvedFile);
      return { ...chapter, ...renderChapter(chapter.number, markdown), status: 'approved' as const };
    }

    const draft = showDrafts ? draftSources[chapter.number as keyof typeof draftSources] : undefined;
    if (draft) {
      const markdown = await readBranchFile(draft).catch((error: unknown) => {
        const message = `[chapters] Draft ${chapter.number} (PR #${draft.prNumber}) unavailable at ${draft.branch}:${draft.path}`;
        if (showWorkspace) throw new Error(message, { cause: error });
        console.warn(`${message}: ${error}`);
        return undefined;
      });
      if (markdown === undefined) return undefined;
      return { ...chapter, ...renderChapter(chapter.number, markdown), status: 'draft' as const, draftPr: draft.prNumber };
    }

    const brief = showWorkspace ? briefPaths.get(chapter.number) : undefined;
    if (!brief) return undefined;
    const markdown = await readRepoFile(brief);
    return { ...chapter, ...renderDocument(markdown, brief, documentRoutes), status: 'brief' as const };
  }));

  return { chapters: chapters.filter((chapter) => chapter !== undefined) };
}

let chapterBuild: ReturnType<typeof loadChapters> | undefined;

export function getChapters() {
  if (import.meta.env.DEV) return loadChapters();
  return chapterBuild ??= loadChapters();
}
