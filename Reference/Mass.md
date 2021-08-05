# Mass

Mass is the equivalent to Bitcoin block size. Instead of limiting the block size, Kaspa weighs each part of the
transaction differently and sums it into a measure called "mass", and then limits it instead of the block size.

The main difference between Bitcoin's size and Kaspa's mass is that each signature operation that the input requires
adds 1000 "grams" for the transaction mass (this is done because signature operations is the part of the transaction
that takes the most CPU), and each byte of the script public key adds 10 extra grams (this is done because we want to
keep the UTXO set small).

## Input sigops field

Calculating the number of sigops a transaction uses requires knowing the UTXOs related to the inputs. This means we can
know the number of sigops only when we're doing UTXO verification, which is done only for chain block. This is
problematic because we want to check the mass limit for every block.

In order to solve it we require from the user to fill a sigop count field in each input, so the transaction mass could
be calculated context free. If a transaction lies about its sigop count it's not added to the DAG.