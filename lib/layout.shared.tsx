import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

type SharedNavOptions = NonNullable<BaseLayoutProps['nav']> & {
  mode?: 'top' | 'auto';
};

export type SharedLayoutOptions = BaseLayoutProps & {
  nav?: Partial<SharedNavOptions>;
};

export function baseOptions(): SharedLayoutOptions {
  return {
    nav: {
      title: (
        <span className="kaspa-docs-brand">
          <Image
            src="/apple-icon.png"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="kaspa-docs-brand__logo"
          />
          {appName}
        </span>
      ),
      mode: 'top',
      transparentMode: 'none',
    },
    themeSwitch: {
      enabled: true,
      mode: 'light-dark-system',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
