Block Rewards, Transaction Fees, and Coinbase Transactions
==========================================================

In Bitcoin, miners are rewarded for their service through two mechanisms:
* Block Reward - every block creates an agreed-upon amount of bitcoins and awards them to the miner that mined the block.
* Transaction Fees - an amount out of every transaction is implictly transferred over from the payer of the transaction to the miner that mined the block containing it.
Both the Block Reward and the Transaction Fees are detailed explicitly in a special transaction called the Coinbase Transaction.

Kaspa inherits those two basic mechanisms and the concept of a coinbase transaction. However, a DAG, as opposed to a chain, brings in a couple of complications that must be addressed. We discuss them below.


Coinbase Transaction in the World of DAGs
-----------------------------------------

A block chain, as opposed to a block DAG, makes coinbase transactions relatively simple. \
A block chain block creates a transaction that pays a set, verifiable amount of money to itself. When creating such a transaction, the miner does not have to take into account any block but the mined block itself.

Under GHOSTDAG, however, this is problematic:
* Parallel blocks could contain conflicting transaction, and the miner who should get the fee for the transaction can not be determined before the blocks containing it are ordered by a merging block.
* Miners must be discouraged from mining red blocks.
* Transactions that happen to have been mined in a red block should NOT be penalized, and must be included in the DAG.
* The hash power that went into mining a red block should not be void. Instead, the Block Rewards and Transaction Fees must be diverted elsewhere.


Kaspa Coinbase Transactions
---------------------------

A Kaspa coinbase transaction must be the first transaction within the block. It must contain zero inputs and one or more outputs. \
In addition, the Kaspa coinbase must contain a transaction payload containing the address to which Block Rewards and Fees will be paid into.

Coinbase transaction outputs are collected in the following manner:
* For every block in the **blue** merge set:
  * Collect the sum of all the fees from all transactions accepted by the blue block.
  * Calculate the Block Reward for the block given its DAA score.
  * Extract the pay address of the **blue block** from its coinbase transaction.
  * Create a transaction output paying the sum of the Block Reward and the Transaction Fees to the pay address in the blue block.
* For every block in the **red** merge set:
  * Collect the sum of all the fees from all the transaction accepted by the red block.
  * Calculate the Block Reward for the block given its DAA score.
* Calculate the sum of all the Block Rewards and Transaction Fees from **all the red blocks**.
* Create a singular transaction output paying this sum to **this block's** pay address.

Note that unlike Bitcoin, miners do not pay themselves for the block that they had mined. \
Instead, the miners that had **merged** a block are to decide whether the original miner is awarded (if the block is blue) or this miner is awarded (if the block is red). \
This has the interesting property that ultimately the Virtual Selected Parent Chain dictates the color of each block, and as such  also dictates which miner receives what reward.

