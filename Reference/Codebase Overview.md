General
=======

The kaspad codebase is comprised of the following logical component:
* Consensus
* Mining
* P2P Protocol
* RPC

The Consensus and Mining logical components may be found under the `domain` package and are called, respectively, `consensus` and `miningmanager`.\
The P2P Protocol and RPC logical components may be found under the `app` package and are called, respectively, `protocol` and `rpc`.

Database and server infrastructure may be found under the `infrastructure` package.\
The server (package `network/netadapter`) is used for both P2P and RPC.\
The database (package `db/database`) is used for Consensus and networking (`network/addressmanager`).

Both P2P and RPC are built on top of gRPC and use Protobufs as a network data format.


Top-Level Architecture
======================

The package `app` implements rudimentary dependency injection (`app/component_manager.go`).\
The package `app` and its child packages may call into any logical or infrastructural component.\
The package `domain` and its child packages may call only into the `infrastructure` package.\
The package `infrastrcuture` and its child packages should not call into any other package.


What Happens When Kaspad Starts
===============================

1. The process entrypoint (`main.go`) immediately calls `app.StartApp()` (`app/app.go`).
2. Command line arguments are read and components (including database and P2P and RPC servers) are initialized accordingly.
3. The P2P connection manager (`infrastructure/network/connmanager`) is started and immediately attempts to connect to a number of previously-known peers. The peer addresses are stored in the P2P address manager (`infrastructure/network/addressmanager`).
   * If, for whatever reason, there aren't enough known peers to connect to, the connection manager may poll the DNS Seeder for more addresses (`infrastructure/network/connmanager/connmanager.go` `ConnectionManager::seedFromDNS`).
4. Once a peer is connected, both this kaspad and the remote kaspad initiate the handshake protocol (`app/protocol/flows/handshake`) in which sufficient data is exchanged for both peers to decide on whether to keep or drop the connection.
5. This kaspad and the remote kaspad will now exchange messages according to the rest of the P2P protocol, which can be found in its entirety in the `app/protocol/flows` package.


How a Block Gets Added to the Block DAG
=======================================

1. A miner (a separate process, e.g. the CPU miner in `cmd/kaspaminer`) connects to kaspad via RPC (e.g. by using the `infrastructure/network/rpcclient` package).
2. The miner calls the RPC GetBlockTemplate command.
3. The command is handled by kaspad in 'app/rpc/rpchandlers/get_block_template.go'.
4. The handler calls into the Mining logical component and requests a block template (`domain/miningmanager/blocktemplatebuilder/blocktemplatebuilder.go`). A block template is simply a block that's only missing a correct nonce to be valid.
5. The miner receives the block template via RPC and begins to solve it.
6. Once the block is solved, the miner calls the RPC SubmitBlock command with the solved block as payload.
7. The command is handled by kaspad in `app/rpc/rpchandles/submit_block.go`.
8. The handler calls into the Consensus logical component and requests to add the solved block (`domain/consensus/processes/blockprocessor/validateandinsertblock.go` `blockProcessor::validateAndInsertBlock`).
9. If the block had been successfully added to the DAG, the following processes occur in kaspad:
    * Transactions that had been included in the block are removed from the mempool (`domain/miningmanager/mempool/handle_new_block_transactions.go`).
    * The block is propagated to all the currently connected P2P peers. The peers handle block propagation messages in `app/protocol/flows/blockrelay`.


How a Transaction Gets Added to the Mempool
===========================================

1. A wallet (a separate process, e.g. the wallet in `cmd/kaspawallet`) creates a transaction from scratch.
2. the wallet connects to kaspad via RPC (e.g. by using the `infrastructure/network/rpcclient` package).
3. The wallets calls the RPC SubmitTransaction command with the transaction as payload.
4. The command is handled by kaspad in `app/rpc/rpchandlers/submit_transaction.go`.
5. The handler calls into the Mining logical component and requests to add a transaction to the mempool (`domain/miningmanager/mempool/validate_and_insert_transaction.go`).
6. If the transaction had been successfully added to the mempool, the transaction is propagated to all the currently connected P2P peers. The peers handle transaction propagation messages in `app/protocol/flows/transactionrelay`.
