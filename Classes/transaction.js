const express = require("express");
const router = express.Router();
const functionsCall = require("../routes/functionsCall");
const {jsRsa} = require("./jsrsa");
let jsrsa = new jsRsa();

//amount is token

var generateTrans = function(fromAddress, toAddress, amount, myArray)
{
    var searchaddr = functionsCall.checkAmount(fromAddress, toAddress, amount, myArray);

    if (searchaddr == "no data")
    {
        return "Address is NOT VALID!...";
    }
    else if (searchaddr == "Transaction not Allowed")
    {
        return "You are NOT HAVING such AMOUNT!...";
    }
    else
    {
        var sign = jsrsa.generateSign(searchaddr.prvGenKey ,amount);
        let transData = {
            sign: sign,
            searchaddr: searchaddr
        }
        return (transData);
    }
}

exports.generateTrans = generateTrans;