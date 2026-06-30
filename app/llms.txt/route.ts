import { getPageMarkdownUrl, source } from "@/lib/source";

export const revalidate = false;

type PageRef = {
  description?: string;
  slugs: string[];
  title?: string;
};

const sections: {
  description: string;
  pages: PageRef[];
  title: string;
}[] = [
  {
    title: "Kaspa Integrations",
    description:
      "Use this pack for RPC connectivity, wallets, accepted transaction ingestion, transaction payloads, and node operation.",
    pages: [
      { slugs: [] },
      { slugs: ["integrate"] },
      { slugs: ["integrate", "getting-started"] },
      { slugs: ["integrate", "wallet"] },
      { slugs: ["integrate", "accepted-transactions"] },
      { slugs: ["integrate", "transaction-payload"] },
      { slugs: ["integrate", "kaspa-node"] },
      { slugs: ["references"] },
    ],
  },
  {
    title: "Toccata: Covenants and Silverscript",
    description:
      "Use this pack for L1 covenant design, state transitions, transaction v1, compute budgets, and Silverscript covenant source.",
    pages: [
      { slugs: ["toccata", "agent-brief"] },
      { slugs: ["toccata"] },
      { slugs: ["toccata", "covenant-state"] },
      { slugs: ["toccata", "transaction-v1"] },
      { slugs: ["toccata", "script-pricing"] },
      { slugs: ["toccata", "silverscript"] },
      { slugs: ["toccata", "argent"] },
      { slugs: ["toccata", "decision-guide"] },
      { slugs: ["toccata", "references"] },
    ],
  },
  {
    title: "Toccata: Based Apps and Inline ZK",
    description:
      "Use this pack for user lanes, L1 payload operations, off-chain execution, proof settlement, and direct in-script proof verification.",
    pages: [
      { slugs: ["toccata", "agent-brief"] },
      { slugs: ["toccata"] },
      { slugs: ["toccata", "based-apps"] },
      { slugs: ["toccata", "inline-zk"] },
      { slugs: ["toccata", "transaction-v1"] },
      { slugs: ["toccata", "script-pricing"] },
      { slugs: ["toccata", "decision-guide"] },
      { slugs: ["toccata", "references"] },
    ],
  },
];

export function GET() {
  return new Response(renderLLMsIndex(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

function renderLLMsIndex() {
  return [
    "# Kaspa Docs for Agents",
    "",
    "Read the section that matches the task, in order. Use `/llms-full.txt` only when you need the complete docs corpus as fallback context.",
    "",
    "## Complete Corpus",
    "",
    "- [Full docs corpus](/llms-full.txt): exhaustive Markdown export of every docs page.",
    "",
    ...sections.flatMap((section) => [
      `## ${section.title}`,
      "",
      section.description,
      "",
      ...section.pages.map(renderPageRef),
      "",
    ]),
  ].join("\n");
}

function renderPageRef(ref: PageRef) {
  const page = source.getPage(ref.slugs);

  if (!page) {
    throw new Error(`Missing LLM docs page for slugs: ${ref.slugs.join("/")}`);
  }

  const title = ref.title ?? page.data.title ?? page.url;
  const description = ref.description ?? page.data.description;
  const suffix = description ? `: ${oneLine(description)}` : "";

  return `- [${escapeMarkdownLinkText(title)}](${escapeMarkdownUrl(
    getPageMarkdownUrl(page).url,
  )})${suffix}`;
}

function oneLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function escapeMarkdownLinkText(value: string) {
  return value.replace(/([[\]])/g, "\\$1");
}

function escapeMarkdownUrl(value: string) {
  return value.replace(/([()])/g, "\\$1");
}
