const CryptoJs = require("crypto-js");
const request = require("request-promise");
const async = require("async");
const url = require("url");
const lodash = require('lodash');


// Good for Json Dumps with keys in sorted order - simmilar to python's 
// json.dumps(dict, sort_keys=True)
const stringify = require('json-stable-stringify');


class BlockChain{
    constructor(){
        this.chain = [];
        this.transaction = [];
        this.current_data = "Genesis Block";
        this.newBlock(100, 100, 0, 0, 1);
        this.nodes = new Set();
    }

    newBlock(token, proof, sendTrans, receivedTrans, previous_hash= null){

        console.log(this.current_data);
        var myName = ((this.current_data).toString()).replace(/\[|\]/g,"");
        console.log("data to data");
        console.log(myName);

        const {jsEncryption} = require("./jsEncryption");
        let jsencryption = new jsEncryption();
        let allKeys = jsencryption.generateAllKeys(myName);
        let block = {
            index: this.chain.length,
            timestamp : Date.now(),
            name : myName,
            token : token,
            proof:proof,
            hash:this._hash(this.chain.length),
            previous_hash : previous_hash || this._hash(this.chain.length-1),
            prvGenKey : allKeys['prvGKey'],
            pubGenKey : allKeys['pubGKey'],
            // signGen   : allKeys['signG']
            sendTrans : sendTrans,
            receivedTrans : receivedTrans
        };

        this.chain.push(block);
        this.current_data = [];
        return block;
    }

    newTransaction(fromName, amount, fromPubKey, fromSign, fromHash, toHash){

        let trans ={
            index: this.transaction.length,
            timestamp: Date(),
            name: fromName,
            amount: amount,
            receiptAddrs:this._hash(this.chain.length),
            fromPublicKey: fromPubKey,
            fromSignature: fromSign,
            fromHash: fromHash,
            toHash: toHash
        }
        console.log(trans);
        this.transaction.push(trans);
        this.current_data = [];
        return trans;
    }

    lastBlock(){
        return this.chain[this.chain.length-1];
    }

    _hash(block){
        return CryptoJs.SHA256(stringify(block)).toString(CryptoJs.enc.Hex);
    }

    generateNextBlock(Data){
        this.current_data.push(Data);
        return this.lastBlock()["index"] + 1;
    }

    isValidChain(chain){
        let index = 1;
        while (index<chain.length){
            // Check if it has a valid previous_hash

            if(chain[index].previous_hash!=this._hash(chain[index-1]))
                return false;

            // Check if it has a valid Prood of work
            if(!this.isValidProof(chain[index-1]["proof"], chain[index]["proof"]))
                return false;

            index+=1;

        }
        return true;


    }

    proofOfWork(last_proof){
        /**
         *
         * Simple Proof of Work Algorithm:
         * - Find a number p' such that hash(pp') contains leading 4 zeroes, where p is the previous p'
         * - p is the previous proof, and p' is the new proof
         * @param last_proof :  <int>
         * :return: <int>
         */
        let proof = 0;
        while (!this.isValidProof(last_proof,proof))
            proof+=1;

        return proof;
    }

    isValidProof(last_proof,proof){
        let hash = CryptoJs.SHA256(`${last_proof}${proof}`).toString(CryptoJs.enc.Hex);
        return hash.substr(0,4) == "0000";
    }

}
exports.BlockChain = BlockChain;
