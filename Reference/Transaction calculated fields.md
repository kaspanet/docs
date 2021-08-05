# Transaction calculated fields

The `DomainTransaction` struct that is representing the transaction inside the consensus, has some calculated fields:
`Fee`, `Mass` and `DomainTransactionInput.UTXOEntry`. These fields are not sent on the wire, and are calculated with the
transaction and consensus data. Once they are calculated, the fields are populated in the transaction and used by other
functions.

Note: It's important to validate on entry points of `Consensus` that transactions don't have calculated fields already
filled.