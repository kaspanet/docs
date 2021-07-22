# The virtual block

The virtual block is a template block that is used in order to mine the next block. In most cases the virtual points to
all DAG tips, but there are some restrictions:

1. The virtual block has to be a valid block, which means it cannot have more than 10 parents, it cannot have a merge
   set larger than 1000 blocks, and it cannot violate the bounded merge depth (a.k.a kosherizing) rules.

2. Each block in the selected parent chain of the virtual cannot have double spends with its own past and has to have a
   correct UTXO commitment. This is done in order to incentivize miners to verify transactions and make a correct UTXO
   commitment.

3. A reorg of more than F blocks in the virtual is invalid.

## Virtual parents selection rules

In order to keep the above rules, we first select virtual's selected parent by iterating over all blocks that are not
`DisqualifiedFromChain` in a descending order by their blue work, and select the first one that preserves rule #2.

Then we make a candidate list of the top 30 bluest tips. We limit the candidate list in order to save performance in
cases where we have thousands of tips.

Then we start to iterate in this order: `candidates[:5]`, `candidates[25:]` and candidates[10:25]. We do it on order to
make the DAG merge far tips faster. We stop iterating when the virtual has 10 parents or there are no left candidates.

For each candidate:

1. We check if it increases the virtual merge set to be over 1000. If it does, we try to replace it with some candidate
   in its past that satisfies the merge set limit requirement.

2. We skip it if we see that it violates the bounded merge depth rule. We might consider trying to replace it with some
   candidate in its past that doesn't violate this rule. This can prevent an attack where miners mine on top of blocks
   in order to prevent anyone else from building on top of them. Anyway, this kind of attack is probably very costly.