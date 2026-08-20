import { lexer, Marked } from "marked";
import { uniqueSlug, type TocItem } from "./writing-read.ts";

export function parseMarkdownToc(body: string): TocItem[] {
  const used = new Map<string, number>();
  const items: TocItem[] = [];
  for (const token of lexer(body)) {
    if (token.type === "heading" && (token.depth === 2 || token.depth === 3)) {
      items.push({
        id: uniqueSlug(token.text, used),
        text: token.text,
        level: token.depth,
      });
    }
  }
  return items;
}

export function renderWritingHtml(body: string): string {
  const used = new Map<string, number>();
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth, text }) {
        const inner = this.parser.parseInline(tokens);
        if (depth === 2 || depth === 3) {
          const id = uniqueSlug(text, used);
          return `<h${String(depth)} id="${id}">${inner}</h${String(depth)}>\n`;
        }
        return `<h${String(depth)}>${inner}</h${String(depth)}>\n`;
      },
      link({ href, title, tokens }) {
        const inner = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
        const extra = href.startsWith("http") ? ` rel="noopener noreferrer" target="_blank"` : "";
        return `<a href="${escapeAttr(href)}"${titleAttr}${extra}>${inner}</a>`;
      },
    },
  });
  return marked.parse(body, { async: false }) as string;
}

function escapeAttr(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}
