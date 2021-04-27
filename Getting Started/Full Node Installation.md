![](RackMultipart20201215-4-15jlsns_html_ba4ab6024277b8b9.gif)

# Kaspad: Full Node Installation Guide

Kaspad is a reference full node Kaspa implementation written in Go (golang).

This project is currently under active development and is in a pre-Alpha state. Some things still don&#39;t work and APIs are far from finalized. The code is provided for reference only.

## Requirements

Go 1.16 or later.

## Installation

#### Build from Source

- Install Go according to the installation instructions here:
  http://golang.org/doc/install

- Ensure Go was installed properly and is a supported version:

```bash
$ go version
```

- Run the following commands to obtain and install kaspad including all dependencies:

```bash
$ git clone https://github.com/kaspanet/kaspad
$ cd kaspad
$ go install . ./cmd/...
```

- Kaspad (and utilities) should now be installed in `$(go env GOPATH)/bin`. If you did
  not already add the bin directory to your system path during Go installation,
  you are encouraged to do so now.


## Getting Started

Kaspad has several configuration options available to tweak how it runs, but all
of the basic operations work with zero configuration (except the testnet flag).

```bash
$ kaspad --testnet
```

### Running miner (optional)
After running a node you can launch a miner and start mining nodes.

To run a miner you need to create a keypair to mine into:
```bash
$ wallet create --testnet
```
The result will look something like this:
```
This is your private key, granting access to all wallet funds. Keep it safe. Use it only when sending Kaspa.
Private key (hex):      547f40e991a115b9cda6a5203a2a6f8031d76c46c6575228d213abf04b57a4e7

This is your public address, where money is to be sent.
Address (kaspa-testnet-4):      kaspatest:qzlhwgd94es8ww2nm2l7pkll2y50zshwsuefcezlql
```
Save the result somewhere, and run kaspaminer:
```bash
$ kaspaminer --testnet --miningaddr kaspatest:<YOUR_CREATED_ADDRESS>
```

### Opening Ports

It's not required in order to participate in the network, but it's recommended to configure your router to forward kaspad inbound port (16211 on testnet, unless configured otherwise)

### Hardware Requirements

**Minimum:**
- 100 GB disk space
- 7th generation i7 4-core processor or AMD equivalent
- 8GB memory
- 10 Mbit internet connection

**Recommended:**
- 9th generation i7 8-core processor or AMD equivalent
- 16 GB memory
- 40 Mbit internet connection


### Installation Using KDX

See [this guide](/Getting%20Started/Desktop%20Installation.md) for installing the Kaspa desktop application.

### Discord

You may want to join our discord server for further questions: [https://discord.gg/WmGhhzk](https://discord.gg/WmGhhzk)

---

[Back](/Getting%20Started/README.md) | [Docs Home](../../main/README.md)
