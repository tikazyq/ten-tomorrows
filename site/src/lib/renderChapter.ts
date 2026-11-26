import { marked, type Tokens } from 'marked';

export function renderChapter(number: string, markdown: string) {
  let body = markdown.replace(/^\uFEFF?#[^\S\r\n]+[^\r\n]+(?:\r?\n|$)/, '').trimStart();
  const opening = /^\*([^*\r\n]+)\*(?:\r?\n|$)/.exec(body);
  let subtitle = opening?.[1];
  if (opening) body = body.slice(opening[0].length).trimStart();

  const isYongle = number === '01';
  if (isYongle && subtitle?.startsWith('《十个明天》第一章')) {
    subtitle = '约 2058 年';
    body = body.replace(/^---[^\S\r\n]*(?:\r?\n|$)/, '').trimStart();
  }

  const tokens = marked.lexer(body, { gfm: true });
  const html = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const next = tokens[i + 1];

    if (isYongle && token.type === 'paragraph') {
      const { text, tokens: inline } = token as Tokens.Paragraph;
      if (/^\*保育网络／栖居单元 .+ · 日终审阅\*$/.test(text)) {
        html.push(`<p class="archive-label">${marked.parseInline(text.slice(1, -1), { async: false })}</p>`);
        continue;
      }
      if (text.startsWith('夜色沿着街巷向北漫开。')) {
        html.push(`<p class="ending-pause">${marked.Parser.parseInline(inline)}</p>`);
        continue;
      }
    }

    if (isYongle && token.type === 'heading' && (token as Tokens.Heading).depth === 3) {
      const { text, tokens: inline } = token as Tokens.Heading;
      const title = marked.Parser.parseInline(inline);
      if (text.startsWith('单元元数据｜') && next?.type === 'table') {
        const table = marked.parser([next]).replace('<table>', '<table class="meta-table">');
        html.push(`<h3 class="metadata-title">${title}</h3><div class="table-wrap">${table}</div>`);
        i++;
        continue;
      }
      if (text.startsWith('系统日志｜')) {
        html.push(`<h3 class="system-title">${title}</h3>`);
        continue;
      }

      const reportClass = text.startsWith('分析日志｜') ? 'analysis-report'
        : text.startsWith('知识库节选｜') ? 'knowledge-report' : undefined;
      if (reportClass && next?.type === 'blockquote') {
        const content = marked.parser((next as Tokens.Blockquote).tokens);
        html.push(`<blockquote class="${reportClass}"><p class="report-label"><span class="report-dot" aria-hidden="true"></span><strong>${title}</strong></p>${content}</blockquote>`);
        i++;
        continue;
      }
    }

    html.push(marked.parser([token]));
  }

  const characterCount = `${subtitle ?? ''}${body}`.match(/\p{Script=Han}/gu)?.length ?? 0;
  return {
    subtitle,
    html: html.join(''),
    characterCount,
    readingMinutes: Math.max(1, Math.round(characterCount / 450)),
  };
}
