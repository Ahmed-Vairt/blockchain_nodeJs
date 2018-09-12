const express = require("express");
const router = express.Router();

function searchNameOnly(nameValue, myArray)
{
    for (var i=0; i < myArray.length; i++)
    {
        if (myArray[i].name === nameValue)
        {
            return myArray[i];
        }
    }
    if (myArray.name !== nameValue)
    {
        //if no data found
        return ("No data found against this name");
    }
}

function searchAddrOnly(adderValue, myArray)
{
    for (var i=0; i < myArray.length; i++)
    {
        if (myArray[i].hash === adderValue)
        {
            return myArray[i];
        }
    }
    if (myArray.hash !== adderValue)
    {
        //if no data found
        return ("Address not Valid");
    }
}

function searchAddr(frmaddr, toaddr, myArray)
{
    for (var i=0; i < myArray.length; i++)
    {
        if (myArray[i].hash === frmaddr)
        {
            // return myArray[i];
            for (var i=0; i < myArray.length; i++)
            {
                if (myArray[i].hash === toaddr)
                {
                    return myArray[i];
                }
            }
            if (myArray.hash !== toaddr)
            {
                //if no data found
                return ("no data");
            }
        }
    }
    if (myArray.hash !== frmaddr)
    {
        //if no data found
        return ("no data");
    }
}

function searchTransOnly(adderValue, myArray)
{
    for (var i=0; i < myArray.length; i++)
    {
        if (myArray[i].receiptAddrs === adderValue)
        {
            return myArray[i];
        }
    }
    if (myArray.receiptAddrs !== adderValue)
    {
        //if no data found
        return ("Transaction address is NOT VALID...!");
    }
}

function checkAmount(fromaddr, toaddr, amount, myArray)
{
    if (searchAddr(fromaddr, toaddr, myArray) == "no data")
    {
        //if no data found against hash
        return ("no data");
    }
    else
    {
        for (var i=0; i < myArray.length; i++)
        {
            if (myArray[i].hash === fromaddr)
            {
                if (myArray[i].token <= amount)
                {
                    // console.log(myArray[i].token + "--------" + amount);
                    //transaction not valid
                    return ("Transaction not Allowed");
                }
                else
                {
                    for (var x=0; x < myArray.length; x++)
                    {
                        if (myArray[x].hash === toaddr)
                        {
                            console.log((myArray[x].token) = (+myArray[x].token) + (+amount));
                            (myArray[x].receivedTrans) = (+myArray[x].receivedTrans) + (+1);

                        }
                    }

                    (myArray[i].token) = myArray[i].token - amount;
                    (myArray[i].sendTrans) = (+myArray[i].sendTrans) + (+1);
                    return myArray[i];
                }
            }
        }
    }
}

exports.searchNameOnly = searchNameOnly;
exports.searchAddrOnly = searchAddrOnly;
exports.searchTransOnly = searchTransOnly;
exports.searchAddr = searchAddr;
exports.checkAmount = checkAmount;