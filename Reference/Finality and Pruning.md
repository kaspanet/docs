# Finality and pruning

## Finality

A reorg over F blocks is illegal in Kaspa. If a new block cause a reorg over F, we mark the block we set the block
as `DisqualifiedFromChain`, leave the virtual untouched and use some warning mechanism for the user to let her know that
some human intervention is needed.

## Pruning

When assuming a set of rules that is described in the [pruning paper](./prunality/Prunality.pdf), we can prove that
blocks that point below some point at depth P (the pruning point)
cannot be merged into the selected chain without violating the finality rule. This means that we can reject blocks that
point below the pruning point
(there's no point in having them if they're never going to be merged into the selected chain). This means any data that
belongs to a block below the pruning point can be deleted.

## Syncing from pruned node

Because pruned node lack any block data below the pruning point, when a new node tries to sync from it, it cannot get
the whole history from it. This is why for now it just trusts a blue work declaration of the selected tip, and download
the anti past of the pruning point of the node with the most blue work. Later on we plan to add some proof that shows
nodes don't lie about their blue work. The draft of this mechanism can be
found [here](https://github.com/kaspanet/research/issues/3).

The current implemented protocol is described [here](https://github.com/kaspanet/kaspad/issues/1734).

## How we use finality on IBD

When we're IBDing we request the antipast of the pruning point. When an unsynced node builds its virtual it can
temporarily think that the selected chain doesn't go through the pruning point, and then it means the past UTXO of the
validated block cannot be obtained, because we only have the UTXO set of the pruning point, but we don't have any data
on the UTXO of its past. This is why on IBD we set the pruning point as virtual's finality point, so any reorg below the
pruning point will violate finality and will be ignored. Because this can happen naturally, we don't raise a finality
conflict for such case.

This is less relevant since we changed IBD to resolve the virtual at the last phase, where we already know the selected
chain. This is still relevant in some edge cases where IBD is cut in the middle and we somehow get a block on relay that
points to the pruning point anticone.