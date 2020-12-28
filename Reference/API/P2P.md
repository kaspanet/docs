# P2P API

The P2P API is part of the Kaspad software. It is used automatically by any running Kaspad for communicating with the Kaspa network and thus is transparent to Kaspad end-users. The information below is intended for software developers.

## API Flows

### Version Receive

#### Messages:

* MsgVersion
* MsgVerAck

#### Flow:

1. When a connection is established with a peer, wait for a MsgVersion.
2. Check that this Kaspad is compatible with the peer.
3. If it is, send MsgVerAck. If not, disconnect.

### Version Send

#### Messages:

* MsgVersion
* MsgVerAck

#### Flow:

1. When a connection is established with a peer, create a MsgVersion and send it to the peer.
2. Wait for a MsgVerAck.

### Address Receive

#### Messages:

* MsgRequestAddresses
* MsgAddresses

#### Flow:

1. After receiving a MsgVerAck, send a MsgRequestAddresses to the peer.
2. Wait for a MsgAddresses.
3. Add the received addresses (if there are any) to the Kaspad's address list.

### Address Send

#### Messages:

* MsgRequestAddresses
* MsgAddresses

#### Flow:

1. Wait for a MsgRequestAddresses.
2. When a MsgRequestAddresses is received, compile a list of addresses Kaspad knows of and create a MsgAddresses with this list.
3. Send the MsgAddresses to the peer.

**The above four messages (Version Receive, Version Send, Address Receive and Address Send) together comprise a handshake between two nodes (Kaspads).**

### Block Inv Receive

#### Messages:

* MsgInvRelayBlock
* MsgRequestRelayBlocks
* MsgBlock

#### Flow:

1. Wait for a MsgInvRelayBlock.
2. When a MsgInvRelayBlock is received, check if this block should be downloaded (e.g, it was not already downloaded in the past from another peer).
3. If the block should be downloaded, create a new MsgRequestRelayBlocks and include the hash of the wanted block in it.
4. Send the MsgRequestRelayBlocks to the peer.
5. Wait for a MsgBlock.
6. Try to add the MsgBlock to the DAG.
7. If successful, broadcast a MsgInvRelayBlock with the block's hash included.If the block turns out to be invalid, return a MsgReject. If the status of the block is unknown (its ancestors are unknown), save the block and do not broadcast a MsgInvRelayBlock.

### Block Request Receive

#### Messages:

* MsgRequestRelayBlocks
* MsgBlock

#### Flow:

1. Wait for MsgRequestRelayBlocks.
2. When a MsgRequestRelayBlocks is received, find the block that corresponds to the hash in the message.
3. If the block is not found, ban the peer.
4. If the block is found, create a new MsgBlock and add the block corresponding to the hash to it.
5. Send the MsgBlock to the peer.

### Transaction Inv Receive

#### Messages:

* MsgInvTransaction
* MsgRequestTransactions
* MsgTx

#### Flow:

1. Wait for MsgInvTransaction.
2. When a MsgInvTransaction is received, check if this transaction should be downloaded.
3. If the transaction should be downloaded, create a new MsgRequestTransactions and include the hash of the wanted transaction in it.
4. Send the MsgRequestTransactions to the peer.
5. Wait for a MsgTx.
6. Try to add the MsgTx to the mempool.
7. If successful, broadcast MsgInvTransaction with the transaction's hash included. If not, return a MsgReject and ban the peer.

### Transaction Request Receive

#### Messages:

* MsgRequestTransactions
* MsgTx

#### Flow:

1. Wait for MsgRequestTransactions.
2. When a MsgRequestTransactions is received, find the transaction that corresponds to the hash in the message.
3. If the transaction is not found, ban the peer.
4. If the transaction is found, create a new MsgTx and add the transaction corresponding to the hash to it.
5. Send the MsgTx to the peer.

### Initial Block Download (IBD)

#### Messages:

* MsgBlockLocator
* MsgIBDBlock
* MsgDoneHeaders
* MsgIBDRootNotFound
* MsgIBDRootUTXOSetAndBlock
* MsgHeader
* MsgSelectedTip
* MsgRequestSelectedTip
* MsgRequestBlockLocator
* MsgRequestHeaders
* MsgRequestNextHeaders
* MsgRequestIBDRootUTXOSetAndBlock
* MsgRequestIBDBlocks

#### Flow:

This is the protocol to be used by a node that is far behind to "sync up" quickly with the rest of the network. The flow has not been finalized yet.

### Ping Receive

#### Messages:

* MsgPing
* MsgPong

#### Flow:

1. Wait for a MsgPing.
2. When a MsgPing is received, send back a MsgPong with the same nonce as the one received in the MsgPing.

### Ping Send

#### Messages:

* MsgPing
* MsgPong

#### Flow:

1. Every two minutes randomly generate a nonce and send a MsgPing with that nonce included.
2. Wait for a MsgPong.
3. When a MsgPong is received, compare the nonce in the MsgPong with the one that the Kaspad generated.
4. If it is not equal, ban the peer.

### Reject

#### Messages:

* MsgReject

#### Flow:

1. Wait for a MsgReject.
2. When a MsgReject is received, print the included Reason and disconnect the peer.

[Back](../../Reference/README.md)
[Docs Home](../../../docs/README.md)