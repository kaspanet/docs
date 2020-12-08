Wallet API
==========

BlockAdded Notifications
------------------------
```
type NotifyBlockAddedRequestMessage struct {}

type NotifyBlockAddedResponseMessage struct {
	Error *RPCError
}

type BlockAddedNotificationMessage struct {
	Block *RPCBlock
}
```
ChainChanged Notifications
--------------------------
```
type NotifyChainChangedRequestMessage struct {}

type NotifyChainChangedResponseMessage strcut {
	Error *RPCError
}

type ChainChangedNotificationMessage struct {
	RemovedChainBlockHashes []string
	AddedChainBlocks []*ChainBlock
}

type ChainBlock struct {
	Hash string
	AcceptedBlocks []*AcceptedBlock
}

type AcceptedBlock struct {
	Hash string
	AcceptedTransactionIDs []string
}
```
UTXOsChanged Notifications
--------------------------
```
type NotifyUTXOsChangedRequestMessage struct {
	Addresses []string
}

type NotifyUTXOsChangedResponseMessage struct {
	Error *RPCError
}

type UTXOsChangedNotificationMessage struct {
	Added []*UTXOsByAddressesEntry
	Removed []*RPCOutpoint
}
```
GetUTXOsByAddresses
-------------------
```
type GetUTXOsByAddressesRequestMessage struct {
	Addresses []string
}

type GetUTXOsByAddressesResponseMessage struct {
	Entries []*UTXOsByAddressesEntry

	Error *RPCError
}

type UTXOsByAddressesEntry struct {
	Address string
	Outpoint *RPCOutpoint
	UTXOEntry *RPCUTXOEntry
}
```
SubmitTransaction
-----------------
```
type SubmitTransactionRequestMessage struct {
	Transaction *RPCTransaction
}
```
Dependant Types
---------------
```
type RPCTransaction struct {
	Version int32
	Inputs []*RPCTransactionInput
	Outputs []*RPCTransactionOutput
	LockTime uint64
	SubnetworkID string
	Gas uint64
	PayloadHash string
	Payload string
}

type RPCTransactionInput struct {
	PreviousOutpoint *RPCOutpoint
	SignatureScript string
	Sequence uint64
}

type RPCTransactionOutput struct {
	Amount uint64
	ScriptPubKey string
}

type RPCOutpoint struct {
	TransactionID string
	Index uint32
}

type RPCUTXOEntry struct {
	Amount uint64
	ScriptPubKey string
	BlockBlueScore uint64
}

type RPCBlock struct {
	BlockHeader *RPCBlockHeader
	Transactions []*RPCTransaction
	BlueScore uint64
}

type RPCBlockHeader struct {
	Version int32
	ParentHashes []string
	HashMerkleRoot string
	AcceptedIDMerkleRoot string
	UTXOCommitment string
	Timestamp int64
	Bits uint64
	Nonce uint64
}
```
