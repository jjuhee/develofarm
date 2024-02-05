// import CryptoJS from "crypto-js"

// const secretKey = "12" //process.env.REACT_APP_SECRET_ID

// // encoding
// export const encrypt = (val: string) => {
//   const encrypted = CryptoJS.AES.encrypt(val, secretKey).toString()
//   return encrypted
// }

// // decoding
// // decoding
// export const decrypt = (encrypted) => {
//   try {
//     // Base64로 인코딩된 문자열을 WordArray로 디코딩
//     const ciphertextBytes = CryptoJS.enc.Base64.parse(encrypted);
//     const decryptedBytes = CryptoJS.AES.decrypt(
//       { ciphertext: ciphertextBytes },
//       CryptoJS.enc.Utf8.parse(secretKey),
//       { format: CryptoJS.JsonFormatter }
//     );

//     const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);

//     return decrypted;
//   } catch (error) {
//     console.error("Decryption error:", error);
//     return null;
//   }
// };
