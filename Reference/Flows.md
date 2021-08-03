Flows
=====

P2P Flows implement the Kaspa P2P protocol. Applicative P2P communication does not happen in Kaspad outside of these flows. \
All flows may be found under the package `app/protocol/flows`.


Handshake
---------

Triggered once a connection with a peer is established. \
It makes no difference whether this kaspad or the peer kaspad had initiated the connection. \
This flow must run exactly once per connection, before any other flow is started.

Each peer sends the following information:
* P2P protocol version
* The name of the network (i.e. `mainnet`/`testnet`/`devnet`)
* Service flags detailing all the services that the kaspad supports
* The current timestamp
* The local address
* A unique P2P node ID
* A user agent
* Whether transaction relay is enabled (currently does nothing)
* The peer's subnetwork ID (currently does nothing)

Each kaspad determines whether the other kaspad is compatible with this kaspad, and disconnects immediately if it does not.


Address Exchange
----------------

Once a pair of kaspa peers successfully shook hands, each sends a `GetAddresses` message. \
The other peer must respond with an `Addresses` message or be disconnected.

While a `GetAddresses` message gets sent out of each kaspad exactly once, a kaspad will always respond to any number of incoming `GetAddresses` messages. \
This is done to support external tools which may request an updated list of addresses every so often.

A kaspa node may respond to a `GetAddresses` message with an `Addresses` message containing any number of other kaspa node addresses it is familiar with. \
If a kaspa node does not wish to share any addresses, it is to send an empty `Addresses` message.\
Currently, kaspad sends a shuffled list of up to 2500 addresses it is familiar with.


Ping
----

Once a pair of kaspa peers successfully shook hands, each sends a `Ping` message at an interval of 2 minutes. \
The remote peer must respond with a `Pong` message or be disconnected.

A `Ping` message contains a random uint64 nonce. \
A `Pong` message incoming from the remote peer is expected to contain the exact same nonce. If it isn't, the peer is misbehaving and must be banned.


Block Relay
-----------

See [Block Relay](Block%20Relay.md)


Transaction Relay
-----------------

See [Transaction Relay](Transaction%20Relay.md)
