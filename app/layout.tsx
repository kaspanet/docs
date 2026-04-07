import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Open_Sans, Source_Code_Pro } from 'next/font/google';
import type { Metadata } from 'next';
import { appName } from '@/lib/shared';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.kaspa.org'),
  applicationName: appName,
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description:
    'Documentation for Kaspa - the fastest proof-of-work cryptocurrency powered by the GHOSTDAG protocol.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${sourceCodePro.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider theme={{ defaultTheme: 'system' }}>{children}</RootProvider>
      </body>
    </html>
  );
}
