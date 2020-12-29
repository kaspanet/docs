
# Transactions
[This is a work in progress.]


## Transaction Structure
   Size | Field | Description
   --- | --- | ---
   4 bytes | Version | Specifies rules 
   8 bytes | Input Counter| Number of inputs 
   Variable| Inputs | One or more transaction input structures
   8 bytes | Output Counter| Number of outputs 
   Variable | Outputs | One or more transaction output structures
   8 bytes | Locktime | what units are used for locktime ?
   20 bytes | Subnetwork Id | Reserved. The default value is 20 zeroed bytes.
   8 bytes | GAS | ?
   32 bytes | Payload Hash | 32 zeroed bytes
   8 bytes | Payload ? | ?
   


   ### Transaction Input Structure
   Size | Field | Description
   --- | --- | ---
   32 bytes | Transaction ID (Hash) | Points to the transaction containing the UTXO to be spent
   4 bytes | Index | The index number of the UTXO to be spent
   8 bytes | script.length | length of signature Script
   Variable | signature Script | Unlocking script that fulfills the conditions of the UTXO locking...
   8 bytes | Sequence Number | 


   ### Coinbase Transaction Input Structure
   Size | Field | Description
   --- | --- | ---
   32 bytes | Transaction ID (Hash) | All bits are zero ?
   4 bytes | Index | all bits are one: 0xFFFFFFFF ?
   1-9 bytes | Coinbase Data Size | Length of the coinbse data, from 2 to 100 bytes ?
   Variable | Coinbase data | 
   8 bytes | Sequence Number | 
  

   ### Transaction Output Structure
   Size | Field | Description
   --- | --- | ---
   8 bytes | Amount | Kaspa value 
   8 bytes | script.length | length of Script
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
 "transaction": {
    "version": 1,
    "inputs": [
      {
        "previousOutpoint": {
          "transactionId": "ece2916ff2a69d6ddac0c3ff259b8f3032383033e1bd0887152a1c990c1b2418",
          "index": 0
        },
        "signatureScript": "4175203423d29312e470771ab3b643655879d7cba721874db14ae3a8904da69201769dc28d5bfddd30c80f46b720d0fc53791c4a32d80dd5157b77f3429a314a130120c26f917722916764419faac71bd6ae2b97e6385ec6cc5d1f85d3fc87790029f4",
        "sequence": 4294967295
      }
    ],
    "outputs": [
      {
        "amount": 1000,
        "scriptPubKey": "76a914ef948254c1dfba15a5c34d5840ce2e988e32654a88ac"
      },
      {
        "amount": 4999998600,
        "scriptPubKey": "76a91488963bdc0de0775612aea7003b40b34ed97b4de788ac"
      }
    ],
    "lockTime": 0,
    "payloadHash": "0000000000000000000000000000000000000000000000000000000000000000",
    "subnetworkId": "0000000000000000000000000000000000000000",
    "fee": 400
  }
  ```

