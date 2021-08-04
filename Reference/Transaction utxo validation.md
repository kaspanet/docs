## Transactions UTXO validation

_ValidateTransactionInContextAndPopulateFee_ validates aspects of the transaction that cannot be checks without knowing
the UTXO that are related to its inputs. When calculating the UTXO set of the DAG, any transaction that fails this check
is filtered out.

The validation consists of these rules:

1. **checkTransactionCoinbaseMaturity** - Checks that the transaction doesn't spend an immature coinbase output.
2. **checkTransactionOutputAmounts** - Checks that the output don't spend more than the inputs have.
3. **checkTransactionSequenceLock** - Checks that the sequence lock is active for all inputs.
4. **validateTransactionSigOpCounts** - Checks that the declared amount of sig-ops per input is the actual one.
5. **validateTransactionScripts** - Checks the inputs scripts successfully unlock the script public key of the relevant
   UTXO.