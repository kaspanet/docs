# IBD - Initial Blocks Downloading

IBD is a state in which a node realizes that it's far behind, so instead of passively getting newly broadcast blocks
from its peers, it actively requests the missing data that it's unaware of.

## IBD triggers

Once an orphan block is accepted, the receiving node (syncee) sends a request for the sender node (syncer) to send a
block locator of size 5 from the said orphan.

## The IBD Flow

Once IBD is triggered:

1. We'll try to find the highest shared block hash between the nodes using a block locator (not deeper than the pruning
   point in the syncee side).
2. If there's such hash the syncee requests the full blocks from that point, validates them, and resolve the virtual
   after that.
3. Otherwise, the syncee request the blue work of the sent orphan.
4. If it's lower than the syncee virtual blue work, the syncee stops the IBD.
5. If it's higher than the syncee virtual blue work, the syncee requests the headers proof (TBD).
6. If the proof is invalid, the syncee bans the peer.
7. The syncee creates staging consensus, if 7-8 fails, she deletes the staging consensus and bans the peer.
8. The syncee requests the pruning point and its anticone with meta data (DAA score etc...).
9. The syncee requests the headers in the future of the pruning point and validates them.
10. The syncee commits the staged consensus.
11. The syncee requests full blocks for the blocks that are header only.
12. The syncee resolves the virtual.

## Work division

When designing the IBD flow, we always had in mind reducing as much as possible pressure from the syncer, to avoid the
network from "DoSing" itself. Because syncing is a one time thing for a node, it's better to put the work on the syncee
side where possible.

## Block locators

A block locator is a primitive that contains exponential jumps (with the base of 2) in some block's selected chain.
There are two kinds of block locators that are used during IBD:

1. The block locator that the syncer is requested to send if the block it sends is an orphan. This block locator is
   pretty cheap to produce, since it requires only 5 exponential jumps, which requires traversing on 16 chain blocks.
2. When finding the highest shared chain block on IBD the wide can be pretty range (until the pruning point), so it'll
   be inefficient to manually traverse it only to collect logarithmic number of blocks. This is why we use an index of
   chain blocks, where every chain block has its own index that represents its height in the chain. This way we don't
   need to traverse the whole DAG, and building a block locator is O(log(n)).