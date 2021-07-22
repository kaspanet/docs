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