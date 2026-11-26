import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { catalog } from '../data/catalog';
import draftSources from '../data/draft-sources.json';
import { renderChapter } from './renderChapter';

// Astro runs from the site directory, including when Vercel builds the project.
const repoRoot = resolve(process.cwd(), '..');

export function shouldIncludeDrafts(): boolean {
  if (process.env.VERCEL_ENV === 'production') return false;
  if (process.env.INCLUDE_DRAFTS === 'true') return true;
  if (process.env.INCLUDE_DRAFTS === 'false') return false;
  return process.env.VERCEL_ENV === 'preview' || import.meta.env.DEV;
}

type DraftSource = (typeof draftSources)[keyof typeof draftSources];

async function readDraft(number: string, { branch, path, prNumber }: DraftSource) {
  try {
    return await readFile(resolve(repoRoot, path), 'utf8');
  } catch {
    // Draft files may only exist on their review branches.
  }

  for (const ref of [`origin/${branch}`, branch]) {
    try {
      return execFileSync('git', ['show', `${ref}:${path}`], {
        cwd: repoRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      });
    } catch {
      // Vercel clones may lack Git or the draft refs.
    }
  }

  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  const token = process.env.GITHUB_TOKEN;
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/tikazyq/ten-tomorrows/${branch}/${encodedPath}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        signal: AbortSignal.timeout(5_000),
      },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (error) {
    console.warn(`[chapters] Draft ${number} (PR #${prNumber}) unavailable at ${branch}:${path}: ${error}`);
    return undefined;
  }
}

async function loadChapters() {
  const chapterDir = resolve(repoRoot, 'chapters');
  const approved = new Map<string, string>();
  for (const file of await readdir(chapterDir)) {
    const match = /^(\d{2})-(.+)\.md$/.exec(file);
    if (!match) continue;
    if (approved.has(match[1])) throw new Error(`Multiple approved files for chapter ${match[1]}`);
    approved.set(match[1], file);
  }

  const showDrafts = shouldIncludeDrafts();
  const chapters = await Promise.all(catalog.map(async (chapter) => {
    const approvedFile = approved.get(chapter.number);
    if (approvedFile) {
      const markdown = await readFile(resolve(chapterDir, approvedFile), 'utf8');
      return { ...chapter, ...renderChapter(chapter.number, markdown), draftPr: undefined };
    }

    const draft = showDrafts ? draftSources[chapter.number as keyof typeof draftSources] : undefined;
    if (!draft) return undefined;
    const markdown = await readDraft(chapter.number, draft);
    if (markdown === undefined) return undefined;
    return { ...chapter, ...renderChapter(chapter.number, markdown), draftPr: draft.prNumber };
  }));

  return { showDrafts, chapters: chapters.filter((chapter) => chapter !== undefined) };
}

let chapterBuild: ReturnType<typeof loadChapters> | undefined;

export function getChapters() {
  if (import.meta.env.DEV) return loadChapters();
  return chapterBuild ??= loadChapters();
}
