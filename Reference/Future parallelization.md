# Thoughts on future parallelization

When adding a block, there are few places that should be locked while updated:

1. Validating and updating the UTXO set (a.k.a updating virtual parents).
2. Not reading from reachability store when there's a reindex.
3. Updating the DAG tips.

Each one of these things should have its dedicated lock and database transaction. When updating the virtual we should
just check if the current block is already in the past of the virtual, and exit early in that case.