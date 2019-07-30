const nknClient = require("nkn-client");

const client = nknClient({
    identifier:  "testname",
    seed:  "2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0",
    seedRpcServerAddr: "http://35.227.54.110:30003",
});

client.on('connect', () => {
    console.log('Connection opened.');
    client.publish(
        'pubsuba9e1d960cf5a5324b4e8f1d2c9e2a45c2008903c',
        0,
        JSON.stringify({"topic": "NoelBright2", "data": "helloworld"}),
    );
});
