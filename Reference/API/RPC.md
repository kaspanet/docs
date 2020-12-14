# RPC API

[This is a work in progress.]

This is an external Kaspad API. The information below is intended for users who run a full Kaspa node - miners, researchers etc.

## Kaspa CTL

Kaspa CTL is a command-line tool for interacting with the RPC API.

### Installation

To install Kaspa CTL, run the following:

```
git clone https://github.com/kaspanet/kaspad.git  
cd kaspad/cmd/kaspactl  
go install .
```

### Using Kaspa CTL

To run an RPC API command, open a terminal and input the command as shown in the example below:

```
kaspactl --testnet -s localhost '{"addPeerRequestMessage":{"address":"1.2.3.4:5678"}}'
```

***{which one is correct?}***

```
kaspactl --rpcserver=127.0.0.1:16616 --devnet '{"getBlockDagInfoRequest": {}}' 
```

This command requests "getBlockDagInfo" from the Kaspad at 127.0.0.1:16616 and prints the response to the screen.

## API Commands

### AddPeer

Instructs Kaspad to connect to a given IP address. Returns an empty response or an error message

#### Messages
* AddPeerRequestMessage
    * string address
    * bool isPermanent
* AddPeerResponseMessage
    * RPCError error = 1000

### GetBlock

Requests info on a block corresponding to a given block hash Returns block info if the block is known. Returns an error message otherwise

#### Messages

* GetBlockRequestMessage
    * string hash
    * string subnetworkId
    * bool includeTransactionVerboseData
* GetBlockResponseMessage
    * string blockHash
    * BlockVerboseData blockVerboseData
    * RPCError error = 1000;

### GetBlockCount

Returns the amount of blocks in the DAG

#### Messages

* GetBlockCountRequestMessage
* GetBlockCountResponseMessage
    * uint64 blockCount
    * RPCError error = 1000;

### GetBlockDagInfo

Returns info on the current state of the DAG

#### Messages

* GetBlockDagInfoRequestMessage
* GetBlockDagInfoResponseMessage
    * string networkName
    * uint64 blockCount
    * repeated string tipHashes
    * double difficulty
    * int64 pastMedianTime
    * repeated string virtualParentHashes
    * RPCError error = 1000;

### GetBlockTemplate

Returns a "template" by which a miner can mine a new block

#### Messages

* GetBlockTemplateRequestMessage
    * string payAddress
* GetBlockTemplateResponseMessage
    * BlockMessage blockMessage

### GetConnectedPeerInfo

Returns a list of the peers currently connected to this Kaspad, along with some statistics on them

#### Messages

* GetConnectedPeerInfoRequestMessage
* GetConnectedPeerInfoResponseMessage
    * repeated GetConnectedPeerInfoMessage infos
    * RPCError error = 1000

### GetCurrentNetwork

Returns the network this Kaspad is connected to (Mainnet, Testnet)

#### Messages

* GetCurrentNetworkRequestMessage
* GetCurrentNetworkResponseMessage
    * string currentNetwork
    * RPCError error = 1000

### GetPeerAddresses

Returns a list of all the addresses (IP, port) this Kaspad knows and a list of all addresses that are currently banned by this Kaspad

#### Messages

* GetPeerAddressesRequestMessage
* GetPeerAddressesResponseMessage
    * repeated GetPeerAddressesKnownAddressMessage addresses
    * repeated GetPeerAddressesKnownAddressMessage bannedAddresses
    * RPCError error = 1000

### GetSelectedTipHash

Returns the hash of the current selected tip block of the DAG

#### Messages

* GetSelectedTipHashRequestMessage
* GetSelectedTipHashResponseMessage
    * string selectedTipHash
    * RPCError error = 1000

### ShutDown

Instructs this node to shut down
Returns an empty response or an error message

#### Messages

* ShutDownRequestMessage
* ShutDownResponseMessage
    * RPCError error = 1000

### SubmitBlock

Extracts a block out of the request message and attempts to add it to the DAG
Returns an empty response or an error message

#### Messages

* SubmitBlockRequestMessage 
    * BlockMessage block
* SubmitBlockResponseMessage 
    * RPCError error = 1000

### SubmitTransaction

Extracts a transaction out of the request message and attempts to add it to the mempool Returns an empty response or an error message

#### Messages

* SubmitTransactionRequestMessage
    * TransactionMessage transaction
* SubmitTransactionResponseMessage
    * string txId
    * RPCError error = 1000

