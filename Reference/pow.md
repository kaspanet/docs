# Proof of Work

The block hash that is calculated for the proof of work target is calculated differently from the hash that is used as
the block identifier (mainly when referencing parents). This decoupling makes it easier to change the PoW hash algorithm
and maybe even allow to change it to some other function that is not a secured hash, but maintains only the property of
known chance to make a result lower than some target.