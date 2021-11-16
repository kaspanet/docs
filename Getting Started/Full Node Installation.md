![](RackMultipart20201215-4-15jlsns_html_ba4ab6024277b8b9.gif)

# Kaspad: Full Node Installation Guide

Kaspad is a reference full node Kaspa implementation written in Go (golang).

This project is currently under active development and is in a pre-Alpha state. Some things still don&#39;t work and APIs are far from finalized. The code is provided for reference only.

## Compilation Requirements

Go 1.16 or later.

## Setup

Mining Kaspa requires two components: a node (kaspad), and a miner. A third component is required to create and maintain a wallet. The node listens for new blocks while the miner is searching for blocks to report to the node. All three components are provided as stand alone files which require no installation. 

You need to either download precompiled binaries, or compile the codebase yourself. The first option is recommended for most users. 

#### Download Binaries

The easiest way to use kaspad is to download the binaries from [here](https://github.com/kaspanet/kaspad/releases/latest). After downloading the binaries that fit your operating system, you should extract them to some folder.

Notice that the rest of the tutorial assumes that you installed from source, so before each command you run you should first run: 
```bash
$ cd <THE_EXTRACTED_BINARIES_FOLDER>
```

and then should add `./` to any command so it'll run the corresponding binary. For example:
```bash
./kaspad --utxoindex
```


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
of the basic operations work with zero configuration except the `--utxoindex` flag (you can omit this flag if you don't use the wallet):

```bash
$ kaspad --utxoindex
```

### Creating a Wallat (optional)

To run a miner you need to create a keypair to mine into:
```bash
$ kaspawallet create
```

You will be asked to choose a password for the wallet. After that you should run this command in order to start the wallet daemon:
```bash
$ kaspawallet start-daemon
```

And then run this in order to request an address from the wallet:
```bash
$ kaspawallet show-address
```

Your screen will show you something like this:
```
The wallet address is:
kaspa:0123456789abcdef0123456789abcdef0123456789

### Running a miner (optional)

```
After having created a wallet, copy the address and run kaspaminer with it:
```bash
$ kaspaminer --miningaddr kaspa:<YOUR_CREATED_ADDRESS>
```

Note that the miner is single threaded, so it is best to run several instances of it to utilize more than one CPU core.

### Mining on Additional Computers
Not all machines need to run kaspad. Once you have a running node, any other machine can report their blocks to it by using the ```-s``` flag:

```bash
$ kaspaminer -s <node IP address> --miningaddr kaspa:<YOUR_CREATED_ADDRESS>
```

You can run ```ifconfig``` in Linux or Mac or ```ipconfig``` in Windows on the machine running kaspad to find out its IP address.

### Opening Ports

It's not required in order to participate in the network, but it's recommended to configure your router to forward kaspad inbound port (16111, unless configured otherwise)

### Kaspad Hardware Requirements

**Minimum:**
- 100 GB disk space
- 7th generation i7 4-core processor or AMD equivalent
- 8GB memory
- 10 Mbit internet connection

**Recommended:**
- 9th generation i7 8-core processor or AMD equivalent
- 16 GB memory
- 40 Mbit internet connection

### Discord

You may want to join our discord server for further questions: [https://discord.gg/WmGhhzk](https://discord.gg/WmGhhzk)

---

[Back](/Getting%20Started/README.md) | [Docs Home](../../main/README.md)
