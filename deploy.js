require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const accountMneomic = process.env.ACCOUNT_MNEMONIC;
const infuraLink = process.env.INFURA_LINK;
const compile = require('./compile');

const interface = compile.abi;
const bytecode = compile.evm.bytecode.object;

const provider = new HDWalletProvider(accountMneomic, infuraLink);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log(accounts[0]);

    const result = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode })
        .send({ gas: 1000000, from: accounts[0] });

    console.log(result);
};

deploy();
