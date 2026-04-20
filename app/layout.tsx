import { RootProvider } from "fumadocs-ui/provider/next";
import { Open_Sans, Source_Code_Pro } from "next/font/google";
import type { Metadata } from "next";
import "./global.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: {
    default: "Kaspa Docs",
    template: "%s | Kaspa Docs",
  },
  description:
    "Documentation for Kaspa - the fastest proof-of-work cryptocurrency powered by the GHOSTDAG protocol.",
  metadataBase: new URL("https://docs.kaspa.org"),
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${sourceCodePro.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider
          theme={{ defaultTheme: "system" }}
          search={{ options: { type: "static", api: "/api/search" } }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
