const nknWallet = require('nkn-wallet');
const nkn = require('nkn-client');
const rpcCall = require('nkn-client/lib/rpc');
const fs = require('fs');
const Util =  require('./util');
const config = require('../config/config');

const BUCKET = 0;
const EXPIRATION = 65535;
const SEEDLIST= config.seedList.testnet;

class NKNClient extends nkn {
    constructor({username, password})  {
        let wallet;
        if (!fs.existsSync(`../custom/${username}.json`)) {
            console.log("new wallet", `./custom/${username}.json`)
            wallet = nknWallet.newWallet(password);
            fs.writeFileSync(`./${username}.json`, wallet.toJSON())
        } else {
            console.log("open wallet", `./custom/${username}.json`)
            let text = fs.readFileSync(`./custom/${username}.json`, 'utf8');
            wallet = nknWallet.loadJsonWallet(text, password);
        }

        const seed = SEEDLIST[ Math.floor( Math.random() * SEEDLIST.length ) ];
        console.log('Rpc seed address:', seed);

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
        console.log('Subscribing to', topicid);
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

