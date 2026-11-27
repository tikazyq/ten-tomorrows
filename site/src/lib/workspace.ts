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
};

const draftChapters = [
  { number: '02', title: '完美的一天', brief: '02-完美的一天.md', outline: '02_完美的一天_结构方案.md' },
  { number: '03', title: '接你放学', brief: '03-已办结.md', outline: '03_已办结_结构方案.md', formerTitle: '已办结' },
  { number: '08', title: '最后一个生日', brief: '08-最后一个生日.md', outline: '08_最后一个生日_结构方案.md' },
] as const;

const groups: { title: string; docs: WorkspaceDoc[] }[] = [
  {
    title: '世界观与设定',
    docs: [
      { slug: 'story-bible', title: '故事圣经 v0.8', path: 'canon/story-bible.md' },
      { slug: 'tech-boundaries', title: '技术设定与证据边界', path: 'research/技术设定边界.md' },
    ],
  },
  {
    title: '第一阶段 · 结构方案与审稿',
    docs: [
      ...draftChapters.map(({ number, title, outline, ...chapter }) => ({
        slug: `phase1-${number}`,
        title: `${number}《${title}》结构方案${'formerTitle' in chapter ? `（旧题：${chapter.formerTitle}）` : ''}`,
        path: `outputs/phase1/${outline}`,
      })),
      { slug: 'phase1-cross-review', title: '三篇故事交叉审稿', path: 'outputs/phase1/三篇故事_交叉审稿.md' },
      { slug: 'phase1-titles', title: '标题与因果评估', path: 'outputs/phase1/标题与因果评估.md' },
      { slug: 'phase1-decisions', title: '第一阶段待用户决策', path: 'outputs/phase1/第一阶段_待用户决策.md' },
    ],
  },
  {
    title: '第二阶段 · 审读与连续性',
    docs: draftChapters.map(({ number, title }) => ({
      slug: `phase2-${number}-review`,
      title: `${number}《${title}》审读与连续性`,
      path: `${posix.dirname(draftSources[number].path)}/审读与连续性.md`,
      branch: draftSources[number].branch,
    })),
  },
  {
    title: '章节任务书',
    docs: draftChapters.map(({ number, title, brief, ...chapter }) => ({
      slug: `brief-${number}`,
      title: `${number}《${title}》任务书${'formerTitle' in chapter ? `（旧题：${chapter.formerTitle}）` : ''}`,
      path: `briefs/${brief}`,
    })),
  },
  {
    title: '目录与编辑规范',
    docs: [
      { slug: 'toc-status', title: '全书目录与标题状态', path: 'editorial/目录与标题状态.md' },
      { slug: 'v08-continuity', title: 'v0.8 连续性检查', path: 'editorial/v0.8-连续性检查.md' },
      { slug: 'plan', title: '创作执行计划', path: 'editorial/创作执行计划.md' },
      { slug: 'writing-guide', title: '写作 Agent 统一指令', path: 'editorial/写作Agent_统一指令.md' },
      { slug: 'review-process', title: '审稿与交接流程', path: 'editorial/审稿与交接流程.md' },
    ],
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
    { href: `/work/brief-${number}`, label: '任务书' },
    { href: `/work/phase1-${number}`, label: '结构方案' },
    { href: `/work/phase2-${number}-review`, label: '审读与连续性' },
  ];
}

async function loadWorkspace() {
  if (!shouldIncludeWorkspace()) return [];

  return Promise.all(groups.map(async ({ title, docs }) => ({
    title,
    docs: await Promise.all(docs.map(async ({ slug, title, path, branch }) => {
      const markdown = branch ? await readBranchFile({ path, branch }) : await readRepoFile(path);
      return { slug, title, ...renderDocument(markdown, path, documentRoutes) };
    })),
  })));
}

let workspaceBuild: ReturnType<typeof loadWorkspace> | undefined;

export function getWorkspace() {
  if (import.meta.env.DEV) return loadWorkspace();
  return workspaceBuild ??= loadWorkspace();
}
