import { getPageMarkdownUrl, source } from "@/lib/source";
import { llms } from "fumadocs-core/source";

export const revalidate = false;

export function GET() {
  let text = llms(source).index();
  const pages = source
    .getPages()
    .toSorted((a, b) => b.url.length - a.url.length);

  for (const page of pages) {
    const markdownUrl = getPageMarkdownUrl(page).url;
    text = text.replaceAll(`](${page.url})`, `](${markdownUrl})`);
  }

  return new Response(text);
}
