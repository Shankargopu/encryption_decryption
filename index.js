const {encryptData,encryptPayload}= require('./helper/encrypt')
const  {decryptKey,decryptData}  = require('./helper/decrypt')

const decryptBody=()=>{

      const body={
        "URN":"13517981323", 
            "MobileNo":"7032771013", 
            "DOB":"15/02/1994" 
      }
      console.log('Original Data..................')
      console.log(body );
    const data = encryptData(body)
    console.log('encrypted data............')
     console.log(data)
    const key = encryptPayload()
    const iv= data.iv
    decryptKey()
    const encryptedResponse={
     "requestId":"", 
    "service":"", 
"encryptedKey":`${key}`, 
"oaepHashingAlgorithm":"NONE", 
"iv":`${data.iv}` ,
"encryptedData":`${data.encryptedData}`, 
"clientInfo":"", 
"optionalParam":"" 


    }
const decryptedData= decryptData(data.encryptedData,iv);
console.log('decrypted data......')
console.log(decryptedData);
  }
decryptBody()
module.exports = decryptBody;