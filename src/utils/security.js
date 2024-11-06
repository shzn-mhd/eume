import CryptoJS from 'crypto-js';

const SECRET_KEY = 'secret'; // Store this in environment variables

export const signUserData = (userData) => {
  const dataString = JSON.stringify(userData);
  const signature = CryptoJS.HmacSHA256(dataString, SECRET_KEY).toString();
  return JSON.stringify({
    data: userData,
    signature
  });
};

export const verifyUserData = (secureDataString) => {
  if (!secureDataString) return false;
  
  try {
    const { data, signature } = JSON.parse(secureDataString);
    const computedSignature = CryptoJS.HmacSHA256(
      JSON.stringify(data),
      SECRET_KEY
    ).toString();
    
    return computedSignature === signature;
  } catch (error) {
    return false;
  }
}; 