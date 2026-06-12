# Contributing to Kaspa Docs

Thanks for helping improve the Kaspa documentation. Contributions of all sizes are welcome - fixing a typo, clarifying a guide, adding code examples, or writing a missing page.

## Finding something to work on

- The [open issues](https://github.com/kaspanet/docs/issues) track missing and desired documentation.
- If you want to write about something that has no issue yet, open one first so the scope can be discussed.

## Making changes

1. Fork the repository and create a branch.
2. Documentation pages live in `content/docs/` as MDX files. Each section has a `meta.json` that controls page ordering and titles in the sidebar - add new pages there.
3. Code examples that accompany guides live in `examples/`. If a guide shows code, prefer keeping a matching runnable example there so it can be tested.
4. Preview your changes locally:

   ```bash
   npm install
   npm run dev
   ```

5. Run the same checks CI will run:

   ```bash
   npm run lint
   npm run format:check
   npm run types:check
   npm run build
   ```

   `npm run format` fixes formatting automatically.

6. Open a pull request against `main` describing what the change improves.

## Writing guidelines

- Write for a developer new to Kaspa: spell out prerequisites, ports, and flags rather than assuming them.
- Keep code examples runnable end to end - a reader should be able to copy, paste, and see output.
- When referencing Rusty Kaspa releases or versions, prefer links that stay current (e.g. `releases/latest`) over hardcoded version tags.

## Content that doesn't belong here

- `legacy/` is the archived pre-2026 documentation and is not maintained - improvements should go to `content/docs/` instead.
- Changes to the SDKs themselves belong in [kaspanet/rusty-kaspa](https://github.com/kaspanet/rusty-kaspa) (Rust/WASM) or [kaspanet/kaspa-python-sdk](https://github.com/kaspanet/kaspa-python-sdk) (Python).
