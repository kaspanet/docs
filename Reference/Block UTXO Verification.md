Block UTXO Verification
=======================

UTXO verification is the process of verifying that a block within the DAG does not violate a set a rules against virtual UTXO set.\
UTXO verification is quite computationally costly, so to avoid attacks we observe that only blocks merged by the virtual selected parent chain need to have their transactions verified against the virtual UTXO set.

Blocks that have not had their UTXO verified are marked by the `BlockStatus` `StatusUTXOPendingVerification`.


resolveBlockStatus
==================

resolveBlockStatus (`domain/consensus/processes/consensusstatemanager/resolve_block_status.go`) is the main function responsible for verifying block UTXO.\
This function expects a block with status `StatusUTXOPendingVerification`, and at the end of the process decides whether it is `StatusDisqualifiedFromChain` or `StatusUTXOValid`.

The process it takes is as follows:
1. Follow the block's selected parent chain until a block with a status OTHER than `StatusUTXOPendingVerification` is found.
2. For every block in said selected parent chain, from low block to high block:
   * If the block's selected parent has the status `StatusDisqualifiedFromChain` then this block inherits that status.
   * Otherwise, verify the block's UTXO and decide whether its status becomes `StatusDisqualifiedFromChain` or `StatusUTXOValid`.


Performance Considerations
==========================

resolveBlockStatus is unique within the consensus in that it may process blocks other than the block that's currently being inserted via validateAndInsertBlock.\
Since the selected parent chain that needs to ne updated may be very large, to conserve RAM, for every block that gets UTXO verified, a completely new and separate database transaction is opened. This transaction runs in parallel to the singular database transaction that encompasses the entirety of validateAndInsertBlock.\
The only things that happen within the separate database transactions are:
1. The BlockStatus of the current chain block is updated.
2. The UTXO of the current chain block is updated.

If the node is to crash, for example, between the third and the fourth block in the selected parent chain of the original validateAndInsertBlock block, observe that no harm will be done:
* The first, second, and third blocks in the selected parent chain would have an updated BlockStatus.
* The fourth block and above would remain with their old `StatusUTXOPendingVerification` status.
* The original validateAndInsertBlock block would not have been inserted to the DAG.

This means that when the original block would be added again via validateAndInsertBlock, the process would simply continue from the fourth block.
