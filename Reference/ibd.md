# IBD - Initial Blocks Downloading

IBD is a state in which a node realizes that it's far behind, so instead of passively getting newly broadcast blocks
from its peers, it actively requests the missing data that it's unaware of.

## IBD triggers

Once an orphan block is accepted, the receiving node (syncee) sends a request for the sender node (syncer) to send it
the hashes of 5 blocks in exponential jumps in the selected chain of the said orphan (blocks in depth 1, 2, 4, 8, 16)

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
9. The syncee requests the full blocks in the future of the pruning point and validates them.
10. The syncee commits the staged consensus.
11. The syncee resolves the virtual.