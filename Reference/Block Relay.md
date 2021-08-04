Block Relay
===========

Blocks in Kaspa always originate from an external application, such as a miner. \
The external applidation is to request block templates using the `GetBlockTemplate` RPC command, generate valid blocks out of them, and send them to a Kaspa node via the `SubmitBlock` RPC command. \
In addition, blocks are propagated between Kaspa nodes via the P2P network.


Block Inv Messages
------------------

A `MsgInvRelayBlock` message contains exactly one Kaspa block hash. \
A Kaspa node that sends a `MsgInvRelayBlock` message is expected to have the block whose hash is included in the message.


Broadcasting Block Inv Messages
-------------------------------

Once a block has been added to the node's DAG (either through the `SubmitBlock` RPC command or via a P2P peer), a new `MsgInvRelayBlock` is created and the block's hash is added to it. \
This message is then sent to every single P2P peer that the Kaspa node is connected to.


Receiving and Handling Block Inv Messages
-----------------------------------------

On receiving a `MsgInvRelayBlock` message, a Kaspa node checks whether it already knows about a block. \
If it does, and the block is known to be invalid, the peer that sent the original `MsgInvRelayBlock` is considered to be misbehaving and must be banned. \
If it does, and the block is known to be an orphan, skip the block. \
If it does not know about the block, the node is to create a new `MsgRequestRelayBlocks` message, add to it the block hash from the original `MsgInvRelayBlock` message, and send it to the peer that sent the original `MsgInvRelayBlock` message. \
The peer is expected to answer immediately, and to itself know of the block hash contained within the `MsgRequestRelayBlocks` message.

The local Kaspa node then waits for a `MsgBlock` message. Once it arrives, it processes it the following way:
* The node calculates the hash pf the received block. Is the calculated hash equal to the hash in the original `MsgInvRelayBlock` message? If it isn't, the peer must be banned.
* Does received block contain one or more transactions? If it doesn't, the peer had attempted to send a HeaderOnly block and is misbehaving, and as such must be banned.
* The node attempts to add the block to the DAG.
** If the block is found to a pruned block, ignore it.
** If the block is missing one or more of its parents, the block is considered an orphan and is processed through Orphan Resolution (see below).
** If the block was rejected for any other reason, disconnect from the peer immediately (but do not ban them).


Choice of Orphan Resolution Method
----------------------------------

An orphan block is any block whose parents aren't currently know to the Kaspa node. \
Orphan blocks may be resolved (that is to say, the Kaspa node gain enough information to either accept the block into the DAG or reject it) either via Relay Orphan Resolution or IBD.

To choose a method, a node must do as follows:
* Create a `MsgRequestBlockLocator` message, set the message's `highHash` to the orphan block's hash, and set the message's `limit` to the logorithm of the maximum amount of chain blocks the Kaspa node is willing to resolve using Relay Orphan Resolution. \
That is to say, if the `limit` is set to `5`, the node is willing to resolve up to 32 chain blocks (2^5 = 32) using Relay Orphan Resolution.
* Send the `MsgRequestBlockLocator` message to the peer that originally sent the orphan.
* The peer is expected to answer immediately with a `MsgBlockLocator` message containing `limit + 1` hashes of a logorithmic set of chain blocks under `highHash`. \
Meaning that if `limit` is set to `5`, the hashes are expected to be of depths 1, 2, 4, 8, 16, and 32.
* The Kaspa node is to go over all these hashes.
** If ANY of them are known, it chooses Relay Orphan Resolution.
** Otherwise, it chooses IBD.


Relay Orphan Resolution
-----------------------

Blocks chosen to be resolved using Relay Orphan Resolution are added to a dedicated Orphan Pool. \
Every time a block gets added to this pool, the Kaspa node is to collect a set of blocks that will resolve one "step" of blocks from the pool.

These blocks, called the Orphan Roots, are collected in the following fashion:
1. Add the original orphan block to a queue.
2. For every block in the queue:
   * If the block is a known orphan, add all its parents to the queue.
   * Otherwise, if the block is not in the DAG, add it to the Orphan Roots.

The Kaspa node must then create `MsgRequestRelayBlocks` messages containing the above Orphan Roots and send them to the peer that sent the original orphan block. \
The response `MsgBlock` messages are then handled as though they came in through the regular block relay that is outlined in the rest of this document.


IBD
---

Please see [IBD](Reference/ibd.md).
