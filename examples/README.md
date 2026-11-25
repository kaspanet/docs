# Integrate examples

Simple runnable examples for the docs pages under `content/docs/integrate`.

## Setup

1. Unzip the latest `kaspa-wasm32-sdk-<version>.zip` into:

   ```text
   examples/kaspa-wasm32-sdk/
   ```

2. Install the one Node dependency used by the Node examples:

   ```bash
   npm install
   ```

3. Run a Node example:

   ```bash
   node ./node/getting-started.js
   ```

   Or run the wallet flow:

   ```bash
   node ./node/wallet.js
   ```

4. Serve `examples/` with any static server for browser examples:

   ```bash
   python -m http.server 8080
   ```

   Then open `http://localhost:8080/browser/getting-started.html` or `http://localhost:8080/browser/wallet.html`.

5. Run a Rust example (requires a sibling `rusty-kaspa` checkout next to this repo because `rust/Cargo.toml` uses `../../../rusty-kaspa/...` path dependencies):

   ```bash
   cargo run --manifest-path ./rust/Cargo.toml --bin getting_started
   ```

   Or run the wallet flow:

   ```bash
   cargo run --manifest-path ./rust/Cargo.toml --bin wallet
   ```

## Broadcast

Send-capable wallet examples use a `broadcast` constant near the top of each file.

Keep it set to `false` to estimate only.

Set it to `true` when you actually want to submit a transaction.
