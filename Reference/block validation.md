# Block validation

Block validation is generally divided to three categories:

1. Header validation (proof of work, difficulty, etc) - skipped for blocks with already validated header.
2. Block body validation (merkle root, mass, etc).
3. UTXO validation (double spends, signatures, UTXO commitment, accepted ID merkle root).

In Bitcoin if each of these validations fails the block is completely rejected, but in Kaspa the situation is a bit
different:
If we would validate the UTXO from the point-of-view of each block, it would mean we would have to restore the past UTXO
of each block, which can be a heavy operation. In the other hand if we won't validate them, there will be no guarantee
that the UTXO commitment is correct, so syncing with SPV assumption will be impossible (or using the accepted ID merkle
root for an SPV wallet).

This is why we decided to validate the UTXO of only chain blocks. If the UTXO validation fails for a chain block, we
change its status to `DisqualifiedFromChain`, which means the virtual won't point to this block as a selected parent (it
will point to this block only when there are other UTXO-valid blocks with more blue work). This means that we can only
trust the UTXO commitment and accepted ID merkle root of chain blocks, but it's fine since an SPV client should know to
differentiate between chain blocks and non-chain blocks.

## DoS prevention

In order to prevent DoS, we want to check the block difficulty and Proof-of-Work as soon as possible. The only exception
are the validations that check we have the required data in order calculate the difficulty (such as checking the block
is not an orphan, so we'll be able to calculate its difficulty window), and checking for pruning violation, because it's
much easier to check for pruning violation than to calculate the difficulty, and if we won't do that, it'll be very easy
for an attacker to build a lot of blocks on top of genesis.

This argument will be less relevant once we start deleting headers in the past of the pruning point. In this case, the
attacker won't be able to point to genesis (or similar block) because it'll be deleted.

## List of consensus rules

### ValidateHeaderInIsolation

_ValidateHeaderInIsolation_ checks everything related to the standalone block header, without any relation to the rest
of the DAG. It consists of these checks:

1. **checkBlockVersion** - Checks that the block version is not above the maximum allowed block version (currently 0).
2. **checkBlockTimestampInIsolation** - Checks that the block timestamp is not too much into the future.
3. **checkParentsLimit** - Checks that there are no more than 10 parents. This is done in order to limit the size of the
   block header. Note: we should consider increasing this number once we implement deleting pruned headers, when the
   only consideration of limiting the number of headers will be bandwidth and not hard disk space.

### ValidatePruningPointViolationAndProofOfWorkAndDifficulty

_ValidatePruningPointViolationAndProofOfWorkAndDifficulty_ checks proof-of-work, difficulty, and everything else that
checks we have the preliminary data to check difficulty that is not covered by anything else. It also checks pruning
point violation first because it's very cheap to violate pruning even with the right difficulty (
see [DoS Prevention](#DoS-prevention)). This function is part of header validation, so it's not called when validating a
block that has an existing header in the DAG.

It consists of these rules:

1. **checkParentNotVirtualGenesis** - Checks that none of the parents is the virtual genesis. The virtual genesis is
   only a virtual block and headers are not allowed to point to it.
2. **checkParentHeadersExist** - Checks that all the parents exist. Blocks with trusted data skip this check.
3. **checkParentsIncest** - Checks that non of the parents in the past of each other. If this happens it means that one
   of the parents is redundant and the miner didn't really point to its tips.
4. **checkPruningPointViolation** - Checks that the block doesn't point to a block in the past of the pruning point.
   This check can be deleted once we delete pruned headers (it'll just cause such blocks to be unresolvable orphans).
5. **checkProofOfWork** - Checks that proof-of-work of the block is valid.
6. **validateDifficulty** - Checks that the bits field of the header represents the actual block difficulty.

### ValidateBodyInIsolation

_ValidateBodyInIsolation_ checks everything related to the standalone block body, without any relation to the rest of
the DAG. It consists of these checks:

1. **checkBlockHashMerkleRoot** - Checks that the hashMerkleRoot in the block header corresponds to the transactions in
   the block.
2. **checkBlockContainsAtLeastOneTransaction** - Checks that the block contains at least one transaction.
3. **checkFirstBlockTransactionIsCoinbase** - Checks that the first transaction is the coinbase transaction.
4. **checkBlockContainsOnlyOneCoinbase** - Checks that there's no more than one coinbase.
5. **checkCoinbase** - Checks that the coinbase is syntactically correct: That the payload actually contains the
   scriptPublicKey and a blue score (not necessarily the right blue score).
6. **checkBlockTransactionOrder** - Checks that transactions are ordered by subnetwork ID. Since the subnetwork ID
   feature is currently disabled, this check is pretty redundant.
7. **checkTransactionsInIsolation** - Call to _ValidateTransactionInIsolation_ for each transaction, which consists of:
    * **checkTransactionInputCount** - Checks the transaction has at least one input.
    * **checkTransactionAmountRanges** - Checks that the sum of the output values is not greater than the maximum amount
      of kaspa in the system (mainly a sanity check).
    * **checkDuplicateTransactionInputs** - Checks that no input appears twice.
    * **checkCoinbaseLength** - Checks that the coinbase payload length is not longer than 150 bytes. This is done
      because the coinbase mass is ignored, so we want to impose some limits on it or miners will be able to freely spam
      the network.
    * **checkGasInBuiltInOrNativeTransactions** - Checks that the transaction doesn't have gas. This is pretty
      irrelevant because subnetworks are currently disabled.
    * **checkSubnetworkRegistryTransaction** - Checks that the payload of registry transaction is not more than 8. This
      is pretty irrelevant because subnetworks are currently disabled.
    * **checkNativeTransactionPayload** - Checks that native transaction don't have payload (only coinbase can have
      payload). This is done mainly for historical reasons and we probably want to cancel this rule.
    * **checkTransactionSubnetwork** - Checks that transactions with subnetwork ID other than the node don't have any
      payload. This check should be deleted since we changed the way partial nodes work.
    * We check the transaction version is not more than the maximum allowed.
8. **checkBlockMass** - Checks that the block mass is not above the limit.
9. **checkBlockDuplicateTransactions** - Checks that there are no duplicate transactions in the block.
10. **checkBlockDoubleSpends** - Checks that the block doesn't spends the same input twice. This check helps for
    potential pluralization, because it means you don't have to update the UTXO set while validating for double spends
    with the block past.
11. **checkBlockHasNoChainedTransactions** - Checks that non of the transactions are dependent on another transaction in
    the same block. This check helps for potential pluralization, because it means you don't have to update the UTXO set
    while validating for double spends with the block past.

### ValidateHeaderInContext

_ValidateHeaderInContext_ checks everything related to the header that cannot be checked without relation to the rest of
the DAG. It consists of these checks:

1. **validateMedianTime** - Checks that the block timestamp is not less than the median time of the 263 blocks with the
   most blue work in the block past.
2. **checkMergeSizeLimit** - Checks that the merge set is not bigger than 1000. This is related
   to [prunality](./prunality).
3. **CheckBoundedMergeDepth** - For full explanation check [prunality](./prunality).

### ValidateBodyInContext

_ValidateHeaderInContext_ checks everything related to the block body that cannot be checked without relation to the
rest of the DAG. It consists of these rules:

1. **checkBlockIsNotPruned** - Checks that this block body doesn't belong a pruned header. This check can be deleted
   once we delete pruned headers.
2. **checkBlockTransactions** - Checks that all of the block transactions are finalized (due to their sequence or lock
   time).
3. **checkParentBlockBodiesExist** - Checks that the body of all parents exist. This is needed so we'll be able to apply
   the merge set transactions to the UTXO later on. The only exception for this is if one of the parents is pruned.

### verifyUTXO

_verifyUTXO_ checks everything related to the block body that cannot be checked without the past UTXO of the block. Any
violation here will cause the block to be `DisqualifiedFromChain`. It consists of these rules:

1. **validateUTXOCommitment** - Checks that the UTXO commitment corresponds to its past UTXO.
2. **validateAcceptedIDMerkleRoot** - Checks that the accepted ID merkle root corresponds to the block acceptance data.
3. **validateCoinbaseTransaction** - Checks that the coinbase transaction has all the correct values.
    1. **validateBlockTransactionsAgainstPastUTXO** - Checks that the block transactions don't have double spends with
       its past, and that _ValidateTransactionInContextAndPopulateFee_ passes for each transactions. This check might be
       redundant: its only purpose is to prevent from miners to purposely include double spends and invalid
       transactions, but since invalid transactions (such as transactions with wrong signatures) can be included in
       non-chain blocks and handled properly (just be dropped when validating) this is probably not so important, and
       the miner also have an incentive not to include such transactions because they won't pay him any fee.