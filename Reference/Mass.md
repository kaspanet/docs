# Mass

Mass is the equivalent to Bitcoin block size. Instead of limiting the block size, Kaspa weighs each part of the
transaction differently and sums it into a measure called "mass", and then limits it instead of the block size.

The main difference between Bitcoin's size and Kaspa's mass is that each signature operation that the input requires
adds 1000 "grams" for the transaction mass (this is done because signature operations is the part of the transaction
that takes the most CPU), and each byte of the script public key adds 10 extra grams (this is done because we want to
keep the UTXO set small).