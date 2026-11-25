import { cn } from "@/lib/cn";
import { Code, Lightbulb, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const PATTERN_SNIPPET_STATUS = {
  argent: {
    badge: "Argent · Implemented",
    icon: Code,
  },
  prototype: {
    badge: "L1 Pattern · Conceptual",
    icon: Lightbulb,
  },
} as const;

type PatternSnippetStatus = keyof typeof PATTERN_SNIPPET_STATUS;

type PatternSnippetProps = {
  children: ReactNode;
  sourceHref?: string;
  sourceLabel?: string;
  status: PatternSnippetStatus;
  title: string;
};

function PatternSnippetIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon aria-hidden="true" className="pattern-snippet__icon" />;
}

export function PatternSnippet({
  children,
  sourceHref,
  sourceLabel,
  status,
  title,
}: PatternSnippetProps) {
  const { badge, icon } = PATTERN_SNIPPET_STATUS[status];

  return (
    <aside className={cn("pattern-snippet", `pattern-snippet--${status}`)}>
      <div className="pattern-snippet__header">
        <div className="pattern-snippet__heading">
          <span className="pattern-snippet__badge">
            <PatternSnippetIcon icon={icon} />
            <span>{badge}</span>
          </span>
          <span className="pattern-snippet__title">{title}</span>
        </div>
        {sourceHref && sourceLabel ? (
          <a
            className="pattern-snippet__source"
            href={sourceHref}
            rel="noreferrer"
            target="_blank"
          >
            {sourceLabel}
          </a>
        ) : null}
      </div>
      <div className="pattern-snippet__body">{children}</div>
    </aside>
  );
}
