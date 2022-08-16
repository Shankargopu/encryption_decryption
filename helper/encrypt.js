const crypto=require("crypto");
const fs= require("fs");
const sessionKey=  Math.random().toFixed(16).split('.')[1];
const encodedKey= Buffer.from(sessionKey,'utf-8').toString("base64");   // B64 encoding - session key

const encryptPayload=()=>{

const publicKey = crypto.createPublicKey(fs.readFileSync(__dirname+'/keys/publicKey.crt'));
const keyBuffer= Buffer.from(sessionKey,'base64')  // create key Buffer
// const decodeBuffer = Buffer.from(keyData,'base64').toString('utf-8');
// console.log(decodeBuffer)
const encryptedPayload= crypto.publicEncrypt({key:publicKey, padding:crypto.constants.RSA_PKCS1_PADDING},keyBuffer).toString('base64');

return encryptedPayload
}

const encryptData=(body)=>{
    
    // var keyBase64 = "DWIzFkO22qfVMgx2fIsxOXnwz10pRuZfFJBvf4RS3eY=";
    var ivBase64  = 'e3a74e3c7599f3ab4601d587bd2cc768';
    const iv= Buffer.from(ivBase64).toString('base64');
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    // console.log(iv.slice(0,16) + '...............')
    const cipher  = crypto.createCipheriv('aes-128-cbc',sessionKey,iv.slice(0,16));
    let encryptedData= cipher.update(JSON.stringify(body),'utf-8','base64');
    encryptedData=encryptedData+cipher.final('base64');
    // console.log(encryptedData)
    // const decodeData=Buffer.from(encryptedData,'base64').toString('base64').slice(0,16);
    // console.log(decodeData)
    // console.log(iv.slice(0,16))
    // console.log(base64regex.test(decodeData))
    return { encryptedData , iv}    
}

module.exports = {encryptPayload,encryptData}