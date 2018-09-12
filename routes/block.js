const express = require("express");
const router = express.Router();
const {BlockChain} = require("../Classes/BlockChain");
const functionsCall = require("./functionsCall");
const transaction = require("../Classes/transaction");
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

let blockchain = new BlockChain();

router.get("/chain",(req,res,next)=>{
    let fullChain = {
        chain: blockchain.chain,
        length: blockchain.chain.length
    }
    return res.json(fullChain);
});

router.get("/searchData/name/:valuue",(req,res,next)=> {
    var resultObject = functionsCall.searchNameOnly(req.params.valuue, blockchain.chain);
    return res.json(resultObject);
});

router.get("/searchData/addr/:valuue",(req,res,next)=> {
    var resultObject = functionsCall.searchAddrOnly(req.params.valuue, blockchain.chain);
    return res.json(resultObject);
});

router.get("/searchTrans/receiptAddr/:valuue",(req,res,next)=> {
    var resultObject = functionsCall.searchTransOnly(req.params.valuue, blockchain.transaction);
    return res.json(resultObject);
});

router.get("/genTrans/:fromAddr/:toAddr/:amouunt",(req,res,next)=> {
    //
    // if (req.params.fromAddr == req.params.toAddr)
    // {
    //     return "Transaction to SAME ADDRESS is NOT ALLOWED...!";
    // }
    // else
    // {
        var genTrans = transaction.generateTrans(req.params.fromAddr, req.params.toAddr, req.params.amouunt, blockchain.chain);

        if (genTrans != "Address is not valid!...")
        {
            if (genTrans != "You are not having such amount!...")
            {
                var trans = blockchain.newTransaction(genTrans['searchaddr'].name, req.params.amouunt, genTrans['searchaddr'].pubGenKey, genTrans['sign'], req.params.fromAddr, req.params.toAddr);
                return res.json(trans);
            }
            else
            {
                return res.json(genTrans);
            }
        }
        else
        {
            return res.json(genTrans);
        }
    // }

});

router.get("/allTrans",(req,res,next)=>{
    let allTran = {
        allTransactions: blockchain.transaction,
        length: blockchain.transaction.length
    }
    return res.json(allTran);
});

router.get('/nextBlock/:passphrase', (req, res, next) => {

    if(req.params.passphrase == "") return next({status:400,message: "Passphrase required!"});

    // let enc_passphrase = key.encrypt(req.params.passphrase, 'base64');
    // console.log('encrypted: ', enc_passphrase);

    // let dec_passphrase = key.decrypt(enc_passphrase, 'utf8');
    // console.log('decrypted: ', dec_passphrase);

    console.log("requesting.... " + req.params.passphrase);
    let block = blockchain.generateNextBlock(req.params.passphrase);
    return res.json({status:1, message: `New Block will be added in the blockchain index = ${block}`});

});

router.get("/mine",(req,res,next)=>{
    let last_proof = blockchain.lastBlock().proof;
    let proof = blockchain.proofOfWork(last_proof);
    let token = 100;
    let sendTrans = 0;
    let receivedTrans = 0;
    let reward_data = {
        name:"",
        encrypted_data:""
    }
    // Reward The Miner
    //blockchain.generateNextBlock(reward_data.data,reward_data.encrypted_data);

    // Forge New Block
    let block = blockchain.newBlock(token, proof, sendTrans, receivedTrans);
    let response = {
        'status': 1,
        'message': "New Block Forged",
        'index': block['index'],
        'name': block['name'],
        'token': block['token'],
        'proof': block['proof'],
        'hash': block['hash'],
        'previous_hash': block['previous_hash'],
        'private_Key': block['prvGenKey'],
        'public_Key': block['pubGenKey'],
        // 'Signature' : block['signGen'],
        'sendTrans' : block['sendTrans'],
        'receivedTrans' : block['receivedTrans']

    }
    return res.json(response);

});

module.exports = router;

