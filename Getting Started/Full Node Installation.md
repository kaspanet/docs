![](RackMultipart20201215-4-15jlsns_html_ba4ab6024277b8b9.gif)

# Kaspad: Full Node Installation Guide

Kaspad is a reference full node Kaspa implementation written in Go (golang).

## Compilation Requirements

Go 1.16 or later.

## Setup

Mining Kaspa requires two components: a node (kaspad), and a miner. A third component is required to create and maintain a wallet. The node listens for new blocks while the miner is searching for blocks to report to the node. All three components are provided as stand alone files which require no installation. 

You need to either download precompiled binaries, or compile the codebase yourself. The first option is recommended for most users.

Note that all kaspad and the miner must be running in parallel. That is, each should be running from a different console and should not be distured as long as mining takes place.

#### Download Binaries

The easiest way to use kaspad is to download the binaries from [here](https://github.com/kaspanet/kaspad/releases/latest). After downloading the binaries that fit your operating system, you should extract them to some folder.

Notice that the rest of the tutorial assumes that you installed from source, so before each command you run you should first run: 
```bash
$ cd <THE_EXTRACTED_BINARIES_FOLDER>
```

Linux and Mac users might need to add `./` to any command so it'll run the corresponding binary. For example:
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

You can invoke ```kaspad --help``` to get a list of more running flags.

The first time you run kaspad it will retrieve peer information from Kaspa's DNS server and will start synchronizing with the network. First synchronization may take up to several hours (depending on your CPU strength and bandwidth). It is impossible to mine before the network is synced. Every time you run kaspad it will incrementally sync any blocks accumulated while it was offline, this is typically a much shorter process (as long as kaspad was not shut down for more than several hours).

### Creating a Wallet (optional)

To run a miner you need to create a keypair to mine into:
```bash
$ kaspawallet create
```

You will be asked to choose a password for the wallet (a password must be at least 8 characters long, and it won't be shown on the screen you as you entering it). After that you should run this command in order to start the wallet daemon:
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
```

**Note**: Every time you ask kaspawallet for an address you will get a different address. This is perfectly fine. Every secret key is associated with many different public addresses and there is no reason not to use a fresh one for each transaction.

At this point your can close the wallet daemon, though you should keep it running of you want to be able to check your balance and make transactions

### Running a miner (optional)

**Note**: Our miner was highly superceded by Elichai's miner (see below), we recommend that you use that miner instead.

After having created a wallet, copy the address and run kaspaminer with it:
```bash
$ kaspaminer --miningaddr kaspa:<YOUR_CREATED_ADDRESS>
```

**Note:** The miner is single threaded, so it is best to run several instances of it to utilize more than one CPU core.
**Note:** Mining cannot start before the network is syncrhonized. In order to conserve your CPU, the miner will not start mining before the node is synced. Hence, it is expected to see a mining rate of 0 Hashes/second for a while as kaspad obtains the current network state.

### Mining on Additional Computers
Not all machines need to run kaspad. Once you have a running node, any other machine can report their blocks to it by using the ```-s``` flag:

```bash
$ kaspaminer -s <node IP address> --miningaddr kaspa:<YOUR_CREATED_ADDRESS>
```

You can run ```ifconfig``` in Linux or Mac or ```ipconfig``` in Windows on the machine running kaspad to find out its IP address.

### Elichai's Miner

Available here: https://github.com/elichai/kaspa-miner/releases/latest

Elichai's miner is an efficient miner written in Rust which outperforms the native minor by about an order of magnitude. The syntax is largely the same only the ```--miningaddr``` flag has been renamed to ```--mining-address``` and the ```-s``` flag has been replaced with ```--kaspad-address```.

A typical invocation of the miner might look like

```bash
$ kaspa-miner-v0.1.0-win64-amd64 --kaspad-address <node IP address> --mining-address <wallet address>
```

Like in the native miner, when running the miner from the same machine running kaspad, the ```--kaspad-address``` flag may be omitted.

**Note:** Elichai's miner is multi threaded, so it is **not needed** to run several instances. By default, it will run one thread per physical/logical core (but not a virtual one, aka HyperThreading/SMT core). If you want to run it on more or less cores, this could be adjusted with the ```--threads``` flag

**Note:** Unlike the native miner, Elichai's miner is churning blocks regardless of the sync status of kaspad. Any blocks discovered while the network is out of sync will not be accepted. If you get the error ```"Block not submitted - IBD is running"``` this simply means the node is out of sync, either because the initial sync has not finished yet or because it fell out of sync momentarily.

**Note for Windows users:** Elichai's binary is unsigned, which means that it is automatically blocked by Windows defender in some systems. In order to run it, you might have to manually add an exclusion. **DO NOT TURN OFF WINDOWS DEFENDER COMPLETELY JUST TO RUN THE MINER!**

**Note for Linux/Mac users:** Sometimes the system does not recognize the miner file as an executable. This results in a ```permission denied``` error when trying to invoke the miner. This could be fixed by issuing the command ```chmod +x <file name>```.

### Opening Ports

By forwarding port 16111 (unless configured otherwise) to the machine running kaspad, your node becomes a public node which other members of the network can use to sync. Even though private nodes can still mine, it is encouraged that you make your node public for the general health of the network. Like any other decentralized systems, Kaspa works best when there are many public nodes.

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

You may want to join our discord server for further questions: https://discord.gg/SfHCaDchrs

---

[Back](/Getting%20Started/README.md) | [Docs Home](../../main/README.md)
