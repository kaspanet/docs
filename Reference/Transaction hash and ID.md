# Transaction Hash and Transaction ID

In Kaspa there are two transaction identifiers: Transaction hash and Transaction ID. Transaction hash is just a hash of
all transaction components, and the transaction ID is a hash of all transaction components except the input signature
scripts.

Transaction ID is needed because the transaction hash is malleable. So to prevent malleability we use transaction ID
everywhere, except the `hashMerkleRoot` in the block header, that uses the transaction hash, because the block header
has to have a commitment to all components of the block body.

The concept of transaction ID resembles the concept of segwit in Bitcoin.