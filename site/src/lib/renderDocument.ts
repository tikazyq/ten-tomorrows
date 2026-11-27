import { Marked, type Tokens } from 'marked';
import { posix } from 'node:path';

export function renderDocument(markdown: string, sourcePath: string, documentRoutes: ReadonlyMap<string, string>) {
  const body = markdown.replace(/^\uFEFF?#[^\S\r\n]+[^\r\n]+(?:\r?\n|$)/, '').trimStart();
  const headings: { id: string; title: string }[] = [];
  const anchors = new Set<string>();
  const parser = new Marked({
    gfm: true,
    walkTokens(token) {
      if (token.type !== 'link') return;
      const link = token as Tokens.Link;
      const relative = /^([^#]+)(#.*)?$/.exec(link.href);
      if (/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(link.href)) return;
      if (!relative) return;

      const path = posix.resolve('/', posix.dirname(sourcePath), relative[1]).slice(1);
      const route = documentRoutes.get(path);
      if (route) link.href = route + (relative[2] ?? '');
    },
    renderer: {
      heading({ depth, tokens }) {
        const html = this.parser.parseInline(tokens);
        if (depth !== 2) return `<h${depth}>${html}</h${depth}>\n`;

        const id = `sec-${headings.length + 1}`;
        const title = this.parser.parseInline(tokens, this.parser.textRenderer);
        headings.push({ id, title });

        // Retain GitHub-style fragments already used in the source documents.
        const anchor = title.toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, '').replace(/ /g, '-');
        const alias = anchor && !/^sec-\d+$/.test(anchor) && !anchors.has(anchor)
          ? `<span id="${anchor}"></span>`
          : '';
        anchors.add(anchor);
        return `<h2 id="${id}">${alias}${html}</h2>\n`;
      },
    },
  });

  const html = parser.parse(body, { async: false }).replaceAll(
    /<table>[\s\S]*?<\/table>/g,
    '<div class="table-wrap">$&</div>',
  );
  const characterCount = body.match(/\p{Script=Han}/gu)?.length ?? 0;
  return {
    html,
    headings,
    characterCount,
    readingMinutes: Math.max(1, Math.round(characterCount / 450)),
  };
}
