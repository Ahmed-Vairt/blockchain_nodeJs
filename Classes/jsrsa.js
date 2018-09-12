const express = require("express");
const router = express.Router();
var jsrsasign = require("jsrsasign");


// usage in code: (nodeRsa is a variable of this)
// nodeRsa.encrypt(plainData) or nodeRsa.encrypt(plainData, rsaPublicKey)

class jsRsa
{
    constructor()
    {
        console.log("JsRsa constructor called");
    }

    generateSign(privateKey,data)
    {
        // let required = [ 'msgsigned'];

        var rsa = new jsrsasign.RSAKey();
        rsa.readPrivateKeyFromPEMString(privateKey);
        var hashAlg = 'sha256';
        var hSig = rsa.sign(data, hashAlg);

        return hSig;
    }
}



// router.get("/doVerify",(req,res,next)=>{
//     var sMsg = document.form1.msgverified.value;
//     var hSig = document.form1.sigverified.value;
//
//     var pubKey = KEYUTIL.getKey(document.form1.cert.value);
//     var isValid = pubKey.verify(sMsg, hSig);
//
//     // display verification result
//     if (isValid) {
//         _displayStatus("valid");
//     } else {
//         _displayStatus("invalid");
//     }
// });
//
// router.get("/doVerify",(req,res,next)=>{
//     _displayStatus("reset");
//     document.form1.msgverified.value = document.form1.msgsigned.value;
//     document.form1.sigverified.value = document.form1.siggenerated.value;
// });
// module.exports = router;

exports.jsRsa = jsRsa;