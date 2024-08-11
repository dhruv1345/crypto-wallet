// src/components/Wallet.js
import React, { useState } from 'react';
import { generateKeyPair, signMessage, verifySignature } from '../crypto';

const Wallet = () => {
  const [keys, setKeys] = useState({ publicKey: '', privateKey: '' });
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [isValid, setIsValid] = useState(null);

  const generateKeys = () => {
    const newKeys = generateKeyPair();
    setKeys(newKeys);
  };

  const handleSignMessage = () => {
    if (keys.privateKey) {
      const sig = signMessage(keys.privateKey, message);
      setSignature(sig);
    }
  };

  const handleVerifySignature = () => {
    if (keys.publicKey && signature) {
      const valid = verifySignature(keys.publicKey, message, signature);
      setIsValid(valid);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333' }}>Crypto Wallet</h2>
      <button style={{ margin: '10px 0', padding: '10px', cursor: 'pointer' }} onClick={generateKeys}>
        Generate Key Pair
      </button>
      <div>
        <p><strong>Public Key:</strong> {keys.publicKey}</p>
        <p><strong>Private Key:</strong> {keys.privateKey}</p>
      </div>
      <div>
        <h3>Sign a Message</h3>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={handleSignMessage}>Sign Message</button>
        {signature && <p><strong>Signature:</strong> {signature}</p>}
      </div>
      <div>
        <h3>Verify Signature</h3>
        <button onClick={handleVerifySignature}>Verify Signature</button>
        {isValid !== null && (
          <p><strong>Signature is {isValid ? 'Valid' : 'Invalid'}</strong></p>
        )}
      </div>
    </div>
  );
};

export default Wallet;
