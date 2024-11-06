// NEXT_PUBLIC_ENCRYPTION_KEY
let ENCRYPTION_KEY = 'secret';

// const makeKey = async (key) => {
//   return await crypto.subtle.importKey(
//     'raw',
//     Buffer.from(key, 'base64'),
//     {
//       name: 'AES-GCM',
//       length: 256
//     },
//     true,
//     ['encrypt', 'decrypt']
//   );
// };

// export const encryptSymmetric = async (plaintext) => {
//   const key = ENCRYPTION_KEY;
//   const iv = crypto.getRandomValues(new Uint8Array(12));
//   const encodedPlaintext = new TextEncoder().encode(plaintext);
//   const secretKey = await makeKey(key); // using the

//   const ciphertext = await crypto.subtle.encrypt(
//     {
//       name: 'AES-GCM',
//       iv
//     },
//     secretKey,
//     encodedPlaintext
//   );

//   return {
//     ciphertext: Buffer.from(ciphertext).toString('base64'),
//     iv: Buffer.from(iv).toString('base64')
//   };
// };

// export const decryptSymmetric = async (ciphertext, iv) => {
//   const key = ENCRYPTION_KEY;
//   const secretKey = await makeKey(key);

//   const cleartext = await crypto.subtle.decrypt(
//     {
//       name: 'AES-GCM',
//       iv: Buffer.from(iv, 'base64')
//     },
//     secretKey,
//     Buffer.from(ciphertext, 'base64')
//   );
//   const data = new TextDecoder().decode(cleartext);
//   return data;
// };

// export const saveToLocalStorage = async (name, data) => {
//   const stringified_data = JSON.stringify(data);
//   const encrypted_data = await encryptSymmetric(stringified_data);
//   localStorage.setItem(name, JSON.stringify(encrypted_data));
// };

// export const getFromLocalStorage = async (name) => {
//   const raw_data = localStorage.getItem(name);
//   if (!raw_data) return null;

//   const encrypted_data = JSON.parse(raw_data);
//   const decrypted_data = await decryptSymmetric(encrypted_data.ciphertext, encrypted_data.iv);

//   const un_stringified_data = JSON.parse(decrypted_data);
//   return un_stringified_data;
// };

// export const removeFromLocalStorage = (name) => {
//   localStorage.removeItem(name);
// };

import CryptoJS from 'crypto-js';

export const encryptData = (data) => {
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
  return ciphertext;
};

export const decryptData = (ciphertext) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const saveToLocalStorage = (name, data) => {
  const encrypted_data = encryptData(data);
  localStorage.setItem(name, encrypted_data);
};

export const getFromLocalStorage = (name) => {
  const encrypted_data = localStorage.getItem(name);
  if (!encrypted_data) return null;

  const decrypted_data = decryptData(encrypted_data);
  return decrypted_data;
};

export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};
