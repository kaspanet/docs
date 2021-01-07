
# Transactions
[This is a work in progress.]


## Transaction Structure
   Size     | Field         | Description
   -------- | ------------- | -------------
   2 bytes  | Version       | Specifies rules
   8 bytes  | Input Counter | Number of inputs
   Variable | Inputs        | One or more transaction input structures
   8 bytes  | Output Counter| Number of outputs
   Variable | Outputs       | One or more transaction output structures
   8 bytes  | Locktime      | what units are used for locktime ?
   20 bytes | Subnetwork Id | Reserved. The default value is 20 zeroed bytes
   8 bytes  | GAS           | Reserved. the default value is 8 zeroed bytes
   32 bytes | Payload Hash  | 32 zeroed bytes
   8 bytes  | Payload size  | Reserved. the default value is 8 zeroed bytes
   Variable | Payload       | Reserved. the default value is empty



   ### Transaction Input Structure
   Size     | Field           | Description
   -------- | --------------- | -----------
   32 bytes | Transaction ID  | Points to the transaction containing the UTXO to be spent
   4 bytes  | Index           | The index number of the UTXO to be spent
   8 bytes  | Script length   | length of signature Script
   Variable | Signature Script| Unlocking script that fulfills the conditions of the UTXO (Usualy containing a signature)
   8 bytes  | Sequence Number | Related to time locks


   ### Transaction Output Structure
   Size     | Field             | Description
   -------- | ----------------- | -----------
   8 bytes  | Amount            | Kaspa value
   8 bytes  | Script version    | The version of the script (currently only 0 is supported)
   8 bytes  | Script length     | length of Script
   Variable | Script Public key | Locking script defining the conditions needed to spend the output



## Transaction Locktime
TO DO

## Transaction Fees
TO DO

## Gas
Reserved for future use.

## Examples

#### Transaction Structure
```json
 "Transaction": {
    "Version": 0,
    "Inputs": [
      {
        "PreviousOutpoint": {
          "TransactionID": "ece2916ff2a69d6ddac0c3ff259b8f3032383033e1bd0887152a1c990c1b2418",
          "Index": 0
        },
        "SignatureScript": "41bbfd299edb70e5998541684013a275a685eb69ea720c3abce08f2f03f3f5e6abc17d474ca720992e03652275cdabf01d80e8eb5084524e532e59b68b7a55d8850120f9a7699db2eec6a4116373fde8e5c7f46af3d81c96b912cdc0e2dd67d00ed6d7",
        "Sequence": 0
      }
    ],
    "Outputs": [
      {
        "Value": 2500000000,
        "ScriptPublicKey": {
          "Script": "76a914663f308631fe9daedb16a8ff45a56112861c02af88ac",
          "Version": 0
        }
      },
      {
        "Value": 4999998600,
        "ScriptPublicKey": {
          "Script": "76a914663f308631fe9daedb16a8ff45a56112861c02af88ac",
          "Version": 0
        }
      }
    ],
    "LockTime": 0,
    "SubnetworkID": "0000000000000000000000000000000000000000",
    "PayloadHash": "0000000000000000000000000000000000000000000000000000000000000000",
    "Payload": null,
    "Fee": 400
  }
  ```
