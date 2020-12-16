Wallet API
==========

VirtualSelectedParentBlueScoreChanged Notifications
------------------------
```
type NotifyVirtualSelectedParentBlueScoreChangedRequestMessage struct {}

type NotifyVirtualSelectedParentBlueScoreChangedResponseMessage struct {
	Error *RPCError
}

type VirtualSelectedParentBlueScoreChangedNotificationMessage struct {
	VirtualSelectedParentBlueScore uint64
}
```
GetVirtualSelectedParentBlueScore
--------------------------
```
type GetVirtualSelectedParentBlueScoreRequestMessage struct {}

type GetVirtualSelectedParentBlueScoreResponseMessage strcut {
    BlueScore uint64

	Error *RPCError
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
	Removed []*UTXOsByAddressesEntry
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

type SubmitTransactionResponseMessage struct {
    TransactionID string
    
    Error *RPCError
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
	IsCoinbase bool
}
```
