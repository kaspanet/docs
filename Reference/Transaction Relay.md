Transaction Relay
=================

Transactions in Kaspa always originate from an external application, such as a wallet. \
The external application is to create valid transactions and send them to a Kaspa node via the `SubmitTransaction` RPC command. \
In addition, transactions are propagated between Kaspa nodes via the P2P network.


Transaction Inv Messages
------------------------

A `MsgInvTransaction` message contains a list of Kaspa transaction IDs. \
A kaspa node that sends a `MsgInvTransaction` message is expected to have all the transactions whose IDs are included in the message.


Broadcasting Transaction Inv Messages
-------------------------------------

Once a transaction had been accepted into the node's mempool (either through the `SubmitTransaction` RPC command or via a P2P peer), its ID is added to a list of candidate transaction IDs to broadcast.

A transaction propagation event occurs when one or more of the following conditions is met:
* 500ms had elapsed since the last propagation event.
* 2^17 or more transaction IDs had been collected.

On transaction propagation, a new `MsgInvTransaction` message is created, and up to 2^17 transaction IDs are added to it. \
This message is then sent to every single P2P peer that the Kaspa node is connected to.


Receiving and Handling Transaction Inv Messages
-----------------------------------------------

On receving a `MsgInvTransaction` message, a Kaspa node is to filter the transaction IDs contained within by whether they're known to the node. \
All unknown transaction IDs are to be collected into a new `MsgRequestTransactions` message and sent to the peep that sent the original `MsgInvTransaction` message. \
The peer is expected to answer immediately, and to itself know of all the transaction IDs in the `MsgRequestTransactions` message.
For every transaction ID within the `MsgRequestTransactions` message, the peer is expected to send a separate `MsgTx` message. The `MsgTx` messages must be in the same order as they were in the `MsgRequestTransactions` message. \
The local Kaspa node is waits for `MsgTx` messages and attempts to insert them into the mempool one by one. \
If any of the transactions gets rejected from the mempool, the peer is considered to be misbehaving and must be banned.



