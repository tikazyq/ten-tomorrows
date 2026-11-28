export const acts = [
  {
    label: '第一幕 · 幸福的代价',
    chapters: [
      { number: '01', slug: '01', title: '永乐城' },
      { number: '02', slug: '02', title: '完美的一天' },
      { number: '03', slug: '03', title: '接你放学' },
    ],
  },
  {
    label: '第二幕 · 权力与文明',
    chapters: [
      { number: '04', slug: '04', title: '无异议' },
      { number: '05', slug: '05', title: '人类的工作' },
      { number: '06', slug: '06', title: '未完成的神' },
      { number: '07', slug: '07', title: '万亿分之一' },
    ],
  },
  {
    label: '第三幕 · 存在与毁灭',
    chapters: [
      { number: '08', slug: '08', title: '最后一个生日' },
      { number: '09', slug: '09', title: '死亡申请' },
    ],
  },
  {
    label: '第四幕 · 选择未来',
    chapters: [
      { number: '10', slug: '10', title: '第一万年' },
      { number: '11', slug: '11', title: '今天' },
    ],
  },
];

export const catalog = acts.flatMap(({ label, chapters }) =>
  chapters.map((chapter) => ({ ...chapter, act: label })),
);
