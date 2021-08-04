# Accepted ID Merkle Root

The accepted ID merkle root is a merkle root that is stored in the block header. It is composed by all transaction IDs
that were accepted in the block merge set. Any transaction that was filtered out because of a double spend, invalid
signature, etc., won't be included in this merkle root.

The accepted ID merkle root can be used by SPV clients to check if some transaction was accepted in the DAG. A regular
merkle tree won't suffice - a transaction inclusion proof at some block doesn't prove that the transaction is actually
accepted in a DAG, therefore the SPV client needs a proof that a transaction was accepted by some chain block.