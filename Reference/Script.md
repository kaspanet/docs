# Script

Kaspa script works like Bitcoin script, except some minor changes:

1. There's no redundant extra pop in OP_CHECKMULTISIG.
2. OP_CHECKSEQUENCEVERIFY and OP_CHECKLOCKTIMEVERIFY pop the stack instead of peeking.
3. OpCheckSig, OpCheckSigVerify, OpCheckMultiSig etc use the Schnorr signature scheme. There are also opcodes for ECDSA:
   OpCheckSigECDSA and OpCheckMultiSigECDSA.
4. There are some [changes](../Specs/BIP143-like%20SigHashes.md) to the sighash mechanism.