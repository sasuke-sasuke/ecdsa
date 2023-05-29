const {secp256k1} = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1)).slice(-20);

console.log(`**************************************************`);
console.log(`Private key: ${toHex(privateKey)}`);
console.log(`Public key: ${toHex(publicKey)}`);
console.log(`Address: 0x${toHex(address)}`);
console.log(`**************************************************`);

