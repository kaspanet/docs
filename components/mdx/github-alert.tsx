import { cn } from '@/lib/cn';
import {
  BadgeInfo,
  CircleAlert,
  Info,
  Lightbulb,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from 'react';

const GITHUB_ALERTS = {
  note: {
    icon: Info,
    title: 'Note',
  },
  tip: {
    icon: Lightbulb,
    title: 'Tip',
  },
  important: {
    icon: BadgeInfo,
    title: 'Important',
  },
  warning: {
    icon: TriangleAlert,
    title: 'Warning',
  },
  caution: {
    icon: CircleAlert,
    title: 'Caution',
  },
} as const;

type GitHubAlertName = keyof typeof GITHUB_ALERTS;

type GitHubAlertProps = {
  children: ReactNode;
  title: string;
  type: GitHubAlertName;
};

type GitHubBlockquoteProps = ComponentProps<'blockquote'>;

function isParagraphElement(
  node: ReactNode,
): node is ReactElement<ComponentProps<'p'>> {
  return isValidElement(node) && node.type === 'p';
}

function isWhitespaceText(node: ReactNode): node is string {
  return typeof node === 'string' && node.trim().length === 0;
}

function parseAlertMarker(
  value: string,
): { name: GitHubAlertName; remainder: string } | null {
  const match = value.match(
    /^\s*\[!(note|tip|important|warning|caution)\](?:[ \t]*\r?\n?)?(.*)$/is,
  );

  if (!match) {
    return null;
  }

  return {
    name: match[1].toLowerCase() as GitHubAlertName,
    remainder: match[2],
  };
}

function parseAlertParagraph(paragraph: ReactElement<ComponentProps<'p'>>): {
  paragraphChildren: ReactNode[];
  title: string;
  type: GitHubAlertName;
} | null {
  const paragraphChildren = Children.toArray(paragraph.props.children);
  const firstContentIndex = paragraphChildren.findIndex(
    (child) => !isWhitespaceText(child),
  );

  if (firstContentIndex === -1) {
    return null;
  }

  const firstContent = paragraphChildren[firstContentIndex];

  if (typeof firstContent !== 'string') {
    return null;
  }

  const parsed = parseAlertMarker(firstContent);

  if (!parsed) {
    return null;
  }

  const nextChildren = [...paragraphChildren];

  if (parsed.remainder.length > 0) {
    nextChildren[firstContentIndex] = parsed.remainder;
  } else {
    nextChildren.splice(firstContentIndex, 1);
  }

  return {
    paragraphChildren: nextChildren,
    title: GITHUB_ALERTS[parsed.name].title,
    type: parsed.name,
  };
}

function GitHubAlertIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon aria-hidden="true" className="github-alert__icon" />;
}

export function GitHubAlert({ children, title, type }: GitHubAlertProps) {
  const { icon } = GITHUB_ALERTS[type];

  return (
    <blockquote className={cn('github-alert', `github-alert-${type}`)}>
      <div className="github-alert__title">
        <GitHubAlertIcon icon={icon} />
        <span>{title}</span>
      </div>
      <div className="github-alert__body">{children}</div>
    </blockquote>
  );
}

export function GitHubBlockquote({
  children,
  ...props
}: GitHubBlockquoteProps) {
  const blockquoteChildren = Children.toArray(children);
  const firstContentIndex = blockquoteChildren.findIndex(
    (child) => !isWhitespaceText(child),
  );
  const firstContent =
    firstContentIndex === -1 ? null : blockquoteChildren[firstContentIndex];

  if (!isParagraphElement(firstContent)) {
    return <blockquote {...props}>{children}</blockquote>;
  }

  const parsed = parseAlertParagraph(firstContent);

  if (!parsed) {
    return <blockquote {...props}>{children}</blockquote>;
  }

  const nextChildren = [...blockquoteChildren];

  if (parsed.paragraphChildren.length > 0) {
    nextChildren[firstContentIndex] = cloneElement(
      firstContent,
      undefined,
      ...parsed.paragraphChildren,
    );
  } else {
    nextChildren.splice(firstContentIndex, 1);
  }

  return (
    <GitHubAlert title={parsed.title} type={parsed.type}>
      {nextChildren}
    </GitHubAlert>
  );
}
