import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { GitHubBlockquote } from "@/components/mdx/github-alert";
import { Mermaid } from "@/components/mdx/mermaid";
import { PatternSnippet } from "@/components/mdx/pattern-snippet";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    blockquote: GitHubBlockquote,
    Mermaid,
    PatternSnippet,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
