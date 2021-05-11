# Open Projects

The following is a running list of projects important to Kaspa. These would benefit from leadership and/or contributions from the community.

1. Support for Rollups: Defining the API that the base layer should expose to the rollup; implementing the required functionality on the bae layer; integrating with existing rollup projects.

2. Increase block rate to 10 blocks per second. Requires:
  2.1. Implementation of a Kaspad client in a more performant language (e.g. Rustlang) which will enable processing blocks order-of-magnitude faster.
  2.2. Support for SPV nodes; DAG-adapted FlyClient; related: pruning headers (currently only old block data is pruned).

3. Research on MEV and flashbots resistance as it relates to blockDAGs.

4. Design fee-market mechanism (e.g., [Redesigning Bitcoin's Fee Market paper](https://arxiv.org/pdf/1709.08881.pdf)), potentially combined with elastic throughput caps.

5. Support for Lightning Network; op_codes that make Lightning compatibility easier. 

6. Implementation of batch validation (from O(n) to O(n/logn) validation time) of Shnorr signatures; and of interactive aggregation (from O(n) space and time to O(1) space and time)).

7. Integration of off-chain privacy mixing hubs (e.g., ValueShuffle).

8. Stateless client design, e.g. via class group accumulators, to allow pruning the UTXO set. Can be done at the first stage outside consensus (which leaves open the question of how new stateless nodes perform trustless IBD).

9. Sharding and Data Availability scheme: Design a mechanism wherein miners do not need to receive the entire block in order to accept and mine atop it; instead, the miner needs to verify that the block was fully published (w.h.p.) via data availability proofs. (Follow Eth 2.0's research on the use of [Kate commitments] for DA proofs (https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)). This would alleviate the bandwidth constraint imposed on the throughput of Kaspa.

10. Research and design of a mechanism for direct txn relay to miners, as an alternative to the existing shared mempool model. This has benefits for DAG throughput efficiency (as it can reduce collisions, i.e., miners mining the same txns across parallel blocks), and for pre-trade privacy (related to MEV, see article 3.). The mechanism should address challenges regarding fairness and centralization among miners, due to the elimination of a shared mempool, as well as user privacy.

---
Discussions of these projects and suggestions for other Kaspa-related projects can take place on [Discord](https://discord.gg/RBXH7gkZnz).

