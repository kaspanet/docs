The main thing changed from [this outdated spec](./utxo) is that UTXO diffs have key that is composed from both its
outpoint and its accepting block DAA score. This is done because the DAA score of the accepting block can be changed
during reorgs.