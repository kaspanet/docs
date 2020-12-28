![](RackMultipart20201215-4-15jlsns_html_ba4ab6024277b8b9.gif)

# Kaspad: Installation Guide

Kaspad is a reference full node Kaspa implementation written in Go (golang).

This project is currently under active development and is in a pre-Alpha state. Some things still don&#39;t work and APIs are far from finalized. The code is provided for reference only.

## Prerequisites

### Go Language Installation

1. Install Go following the installation instructions here:
[http://golang.org/doc/install](http://golang.org/doc/install)  
2. Check that Go is installed properly and is a supported version (currently 1.14):



        $ go version

        $ go env GOROOT GOPATH


NOTE: The GOROOT and GOPATH above must not be the same path. It is recommended that GOPATH is set to a directory in your home directory such as ~/dev/go to avoid write permission issues. It is also recommended to add $GOPATH/bin to your PATH at this point.

### Opening Ports

1. Check that the default inbound port that Kaspad uses (#TBD) is open.
 If it is occupied by another application, you will have to select another port when starting Kaspad (see Configuration Options below).
2. On your router, set port forwarding to the default inbound port.
3. In the settings of your firewall, make the following changes:

    - Open inbound traffic to the default inbound port
    - Open outbound traffic to the following ports:

        - DNS Seeder port - #TBD
        - Default ports of other Kaspads - #TBD

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

## Installation

### Build from Source

Run the following commands to obtain and install Kaspad including all its dependencies:

    $ git clone https://github.com/kaspanet/kaspad $GOPATH/src/github.com/kaspanet/kaspad

    $ cd$GOPATH/src/github.com/kaspanet/kaspad

    $ ./test.sh

    $ go install . ./cmd/...

./test.sh tests can be skipped, but some things might not run correctly on your system if tests fail. **What happens if the tests fail?** 

Kaspad (and utilities) are now installed in $GOPATH/bin. **If you did not already add the bin directory to your system path during Go installation, you are encouraged to do so now.** 
 ***Needs clarification*** 

### Installation Using KDX

See [this guide](/Getting%20Started/Desktop%20Installation.md) for installing the Kaspa desktop application.

## Starting Kaspad

Starting Kaspad for basic operation does not require any additional configuration. However, Kaspad has various configuration options available to modify the way it runs (see below).

### Basic Operation

Linux/BSD/POSIX/Source

$ ./kaspad

### Configuration Options

_ **TBD - Input from Denis** _

## Troubleshooting

### Error Messages

**TBD - Input from Denis/Mike**

**There should be a list of all error and issue messages and troubleshooting instructions for each of them. When and how are they displayed?**

### Discord

You may want to join our discord server for further questions: [https://discord.gg/WmGhhzk](https://discord.gg/WmGhhzk)

### Issue Tracker

The [integrated github issue tracker](https://github.com/kaspanet/kaspad/issues) is used for this project.

## License

Kaspad is licensed under the copyfree [ISC License](https://choosealicense.com/licenses/isc/).

[Back](/Getting%20Started/README.md)
[Docs Home](../../docs/README.md)
