'use client';

import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import mermaid from 'mermaid';
import { useEffect, useId, useState } from 'react';

function isDarkTheme() {
  return document.documentElement.classList.contains('dark');
}

function initMermaid(dark: boolean) {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: dark ? 'dark' : 'default',
    flowchart: {
      htmlLabels: true,
      useMaxWidth: false,
    },
  });
}

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '-');
  const [svg, setSvg] = useState<string>();
  const [failed, setFailed] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(isDarkTheme());

    const observer = new MutationObserver(() => {
      setDark(isDarkTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let active = true;

    initMermaid(dark);

    mermaid
      .render(`mermaid-${id}`, chart)
      .then(({ svg: nextSvg }) => {
        if (!active) return;
        setSvg(nextSvg);
        setFailed(false);
      })
      .catch(() => {
        if (!active) return;
        setFailed(true);
      });

    return () => {
      active = false;
    };
  }, [chart, dark, id]);

  if (failed) {
    return (
      <CodeBlock title="Mermaid">
        <Pre>{chart}</Pre>
      </CodeBlock>
    );
  }

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border bg-fd-card p-4 shadow-sm">
      {svg ? (
        <div
          className="flex min-w-max justify-center [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-none"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <Pre>{chart}</Pre>
      )}
    </div>
  );
}
