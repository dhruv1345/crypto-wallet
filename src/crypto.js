// src/crypto.js
import { ec as EC } from 'elliptic';
// import bs58 from 'bs58';
const ec = new EC('secp256k1');

export function generateKeyPair() {
  const key = ec.genKeyPair();
  return {
    publicKey: key.getPublic('hex'),
    privateKey: key.getPrivate('hex'),
  };
}

export function signMessage(privateKey, message) {
  const key = ec.keyFromPrivate(privateKey);
  const signature = key.sign(message);
  return signature.toDER('hex');
}

export function verifySignature(publicKey, message, signature) {
  const key = ec.keyFromPublic(publicKey, 'hex');
  return key.verify(message, signature);
}
