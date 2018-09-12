const express = require("express");
const router = express.Router();
var jsecrypt = require("jsencrypt");
var removeNewline = require('newline-remove');

class jsEncryption
{
    constructor()
    {
    console.log("JsEncryption constructor called");
    }
    generateAllKeys(data)
    {
        // const {jsRsa} = require("./jsrsa");
        // let jsrsa = new jsRsa();


        var sKeySize = "512";
        var keySize = parseInt(sKeySize);
        var crypt = new jsecrypt.JSEncrypt({default_key_size: keySize});

        // Js encrypted RSA Key
        // console.log(crypt.getKey());

        var prvKey = removeNewline(crypt.getPrivateKey());
        var pubKey = removeNewline(crypt.getPublicKey());
        // var sign    = jsrsa.generateSign(prvKey,data);

        let allKeys = {
            prvGKey : prvKey,
            pubGKey : pubKey
            // signG    : sign

        }
        // console.log(allKeys);
        return allKeys;
    }
}
//
// router.get("/generateKeys",(req,res,next)=>{
//     var sKeySize = "512";
//     var keySize = parseInt(sKeySize);
//     var crypt = new jsecrypt.JSEncrypt({default_key_size: keySize});
//
//     // Js encrypted RSA Key
//     // console.log(crypt.getKey());
//
//     var prvKey = (crypt.getPrivateKey());
//     var pubKey = (crypt.getPublicKey());
//
//     res.json(prvKey + "_____________________________________________" + pubKey);
//
//     // getting key from url // prvKey or pubKey
//     // var key = req.params.key;
//     //
//     // if(key == "prvKey")
//     // {
//     //     res.json(prvKey);
//     // }
//     // else if (key == "pubKey")
//     // {
//     //     res.json(pubKey);
//     // }
//     // else
//     // {
//     //     res.json("Please enter correct key name");
//     // }
//
// });

// module.exports = router;

exports.jsEncryption = jsEncryption;