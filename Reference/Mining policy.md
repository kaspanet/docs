# Mining policy

There's a flag in the getBlockTemplate RPC response that tells the miner if it's recommended to mine or not. The flag is
true iff:

1. The node is connected to at least one peer.
2. The node is not in IBD mode.
3. The timestamp of selected parent of the virtual is not more than one hour in the past.

## Rationale

The rationale behind the mining policy is composed of two reasons:

1. We don't want to interrupt the IBD with blocks that are mined by the same node, that are gonna be red anyway.
2. We don't want to spam the network with deep red blocks.

## Flaws

The main flaw in this policy is that if there's a netsplit and both sides IBD from each other there will be no mining at
all at this time. It can be even planned by an attacker with a small sub-DAG that sends blocks in a very slow rate.

This can be probably solved if we allow normal block relay during IBD, and remove the second law from the mining policy.