const crypto = require("crypto");
const fs= require("fs");
const {encryptPayload,encryptData} = require('../helper/encrypt')
const decryptKey=()=>{
const privateKey = crypto.createPrivateKey(fs.readFileSync(__dirname+'/keys/privateKey.key'));
const encryptedKey = encryptPayload();
const binaryData=Buffer.from(encryptedKey,'base64');
const decryptedKey = crypto.privateDecrypt({key:privateKey,padding:crypto.constants.RSA_PKCS1_PADDING},binaryData).toString('base64');
return decryptedKey

}

const decryptData=(response,iv)=>{
// const data = encryptData ();
// console.log(response.length)
console.log(response)
const x=response.slice(16);
const z= x+iv.slice(0,16)
console.log(z.length)
const decryptedKey = decryptKey();
const decryptData = crypto.createDecipheriv('aes-128-cbc',decryptedKey,iv.slice(0,16));
let decrypted = decryptData.update(response,'base64');
decrypted = decrypted+decryptData.final();
// console.log(decrypted);
return decrypted;
}


module.exports = {decryptKey,decryptData};