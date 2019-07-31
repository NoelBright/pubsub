const path = require("path");
const nknWallet = require('nkn-wallet');
const nkn = require('nkn-client');
const rpcCall = require('nkn-client/lib/rpc');
const fs = require('fs');
const config = require('../config/config');
const Logger = require('./logger');

const logger = Logger.getLogger('nkn');
const BUCKET = 0;
const EXPIRATION = 65535;

var SEEDLIST
if (config.network === "testnet") {
    SEEDLIST= config.seedList.testnet;
} else {
    SEEDLIST= config.seedList.mainnet;
}

class NKNClient extends nkn {
    constructor({username, password})  {
        let wallet;
        let walletFilePath = path.join(__dirname, `../custom/${username}.json`);
        if (!fs.existsSync(walletFilePath)) {
            logger.info("new wallet: ", walletFilePath)
            wallet = nknWallet.newWallet(password);
            fs.writeFileSync(walletFilePath, wallet.toJSON())
        } else {
            logger.info("open wallet: ", walletFilePath)
            let text = fs.readFileSync(walletFilePath, 'utf8');
            wallet = nknWallet.loadJsonWallet(text, password);
        }

        const seed = SEEDLIST[ Math.floor( Math.random() * SEEDLIST.length ) ];
        logger.info('connecting to NKN node:', seed);

        super({
            identifier:  username.trim(),
            seed:  wallet.getSeed(),
            seedRpcServerAddr: seed,
        });

        nknWallet.configure({
            rpcAddr: seed 
        })

        this.wallet  =  wallet;
    }

    subscribe = topicid => {
        logger.info('Subscribing to', topicid);
        return this.wallet.subscribe(
            topicid,
            BUCKET,
            EXPIRATION,
            this.identifier
        );
    }

    getSubscribers = topic => (
        rpcCall( this.options.seedRpcServerAddr, 'getsubscribers', { topic: Util.genChatID(topic), bucket: BUCKET })
    );
}

module.exports = NKNClient;

