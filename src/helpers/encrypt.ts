import CryptoJS from 'crypto-js';

const SECRET_KEY = 'aXRzIHRpbWUgdG8gZWFybiBhIGxvdCBvZiBtb25leSBiaXRjaGVzIQ==';


export const encryptData = (data: any) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encrypted;
};

export const decryptData = (encryptedData: string) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
};