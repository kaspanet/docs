# Kaspa Docs

Source for the Kaspa documentation site - guides for integrating with Kaspa (SDK setup, wallets, transactions, running a node) and documentation of upcoming programmability features.

The site is a [Next.js](https://nextjs.org) app built with [Fumadocs](https://fumadocs.dev). Content is written in MDX.

## Repository layout

| Path            | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| `content/docs/` | The documentation pages (MDX). This is where most contributions land.                    |
| `examples/`     | Runnable code examples (Node.js, browser, Rust, Java) backing the integration guides.    |
| `app/`          | Next.js app routes and layout.                                                           |
| `components/`   | React components used by the site and MDX content.                                       |
| `lib/`          | Content source adapter and shared layout options.                                        |
| `legacy/`       | The previous markdown-only documentation, kept for reference. Not published on the site. |
| `Reference/`    | Research material (papers, LaTeX sources). Not published on the site.                    |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see the site.

## Checks

CI runs these on every pull request - run them locally before pushing:

```bash
npm run lint
npm run format:check
npm run types:check
npm run build
```

## Contributing

Contributions are welcome - see [CONTRIBUTING.md](CONTRIBUTING.md). Missing documentation is tracked in the [issues](https://github.com/kaspanet/docs/issues).
