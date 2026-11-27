import { posix } from 'node:path';
import draftSources from '../data/draft-sources.json';
import { readBranchFile, readRepoFile } from './repoSource';
import { renderDocument } from './renderDocument';
import { shouldIncludeWorkspace } from './siteMode';

type WorkspaceDoc = {
  slug: string;
  title: string;
  path: string;
  branch?: string;
  chapter?: string;
  optional?: boolean;
};

const draftChapters = [
  { number: '02', title: '完美的一天', brief: '02-完美的一天.md', outline: '02_完美的一天_结构方案.md' },
  { number: '03', title: '接你放学', brief: '03-接你放学.md', outline: '03_已办结_结构方案.md' },
  { number: '08', title: '最后一个生日', brief: '08-最后一个生日.md', outline: '08_最后一个生日_结构方案.md' },
] as const;

const groups: { section: 'core' | 'archive' | 'chapter'; title: string; docs: WorkspaceDoc[] }[] = [
  {
    section: 'core',
    title: '工作底稿',
    docs: [
      { slug: 'story-bible', title: '故事圣经', path: 'canon/story-bible.md' },
      { slug: 'toc-status', title: '全书目录与进度', path: 'editorial/目录与标题状态.md' },
      { slug: 'tech-boundaries', title: '技术设定与证据边界', path: 'research/技术设定边界.md' },
      { slug: 'guide', title: '创作与审稿规范', path: 'editorial/创作与审稿规范.md' },
    ],
  },
  {
    section: 'archive',
    title: '第一阶段归档（Gate A 已合并）',
    docs: [
      ...draftChapters.map(({ number, title, outline }) => ({
        slug: `phase1-${number}`,
        title: `${number}《${title}》结构方案`,
        path: `outputs/phase1/${outline}`,
        chapter: number,
      })),
      { slug: 'phase1-cross-review', title: '三篇故事交叉审稿', path: 'outputs/phase1/三篇故事_交叉审稿.md' },
      { slug: 'phase1-titles', title: '标题与因果评估', path: 'outputs/phase1/标题与因果评估.md' },
      { slug: 'phase1-decisions', title: '第一阶段待用户决策', path: 'outputs/phase1/第一阶段_待用户决策.md' },
    ],
  },
  {
    section: 'archive',
    title: '历史笔记与旧版流程',
    docs: [
      { slug: 'chapter-01-retrospective', title: '《永乐城》创作复盘', path: 'editorial/archive/01-永乐城创作复盘.md', optional: true },
      { slug: 'v08-continuity', title: 'v0.8 连续性检查', path: 'editorial/archive/v0.8-连续性检查.md' },
      { slug: 'writing-guide', title: '写作 Agent 统一指令', path: 'editorial/archive/写作Agent_统一指令.md' },
      { slug: 'plan', title: '创作执行计划', path: 'editorial/archive/创作执行计划.md' },
      { slug: 'review-process', title: '审稿与交接流程', path: 'editorial/archive/审稿与交接流程.md' },
    ],
  },
  {
    section: 'chapter',
    title: '第二阶段 · 审读与连续性',
    docs: draftChapters.map(({ number, title }) => ({
      slug: `phase2-${number}-review`,
      title: `${number}《${title}》审读与连续性`,
      path: `${posix.dirname(draftSources[number].path)}/审读与连续性.md`,
      branch: draftSources[number].branch,
      chapter: number,
    })),
  },
  {
    section: 'chapter',
    title: '章节任务书',
    docs: draftChapters.map(({ number, title, brief }) => ({
      slug: `brief-${number}`,
      title: `${number}《${title}》写作任务书`,
      path: `briefs/${brief}`,
      chapter: number,
    })),
  },
];

export const briefPaths = new Map([
  ['04', 'briefs/04-未写的答案.md'],
  ['05', 'briefs/05-人类的工作.md'],
  ['06', 'briefs/06-未完成的神.md'],
  ['07', 'briefs/07-万亿分之一.md'],
  ['09', 'briefs/09-死亡申请.md'],
  ['10', 'briefs/10-第一万年.md'],
  ['11', 'briefs/11-今天-终章预案.md'],
]);

export const documentRoutes = new Map<string, string>([
  ['chapters/01-永乐城.md', '/01'],
  ['briefs', '/#contents-title'],
  ...Array.from(briefPaths, ([number, path]): [string, string] => [path, `/${number}`]),
  ...groups.flatMap(({ docs }) => docs.map(({ path, slug }): [string, string] => [path, `/work/${slug}`])),
]);

export function relatedDocuments(number: string) {
  return [
    { href: `/work/phase2-${number}-review`, label: '审读与连续性' },
    { href: `/work/brief-${number}`, label: '写作任务书' },
    { href: `/work/phase1-${number}`, label: '第一阶段结构方案' },
  ];
}

async function loadWorkspace() {
  if (!shouldIncludeWorkspace()) return [];

  return Promise.all(groups.map(async ({ section, title, docs }) => {
    const rendered = await Promise.all(docs.map(async ({ slug, title, path, branch, chapter, optional }) => {
      const markdown = await (branch ? readBranchFile({ path, branch }) : readRepoFile(path))
        .catch((error: NodeJS.ErrnoException) => {
          if (optional && error.code === 'ENOENT') return undefined;
          throw error;
        });
      if (markdown === undefined) return undefined;
      return { slug, title, chapter, ...renderDocument(markdown, path, documentRoutes) };
    }));

    return { section, title, docs: rendered.filter((doc) => doc !== undefined) };
  }));
}

let workspaceBuild: ReturnType<typeof loadWorkspace> | undefined;

export function getWorkspace() {
  if (import.meta.env.DEV) return loadWorkspace();
  return workspaceBuild ??= loadWorkspace();
}
