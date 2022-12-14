import web3 from './web3';

const address = '0x25725174C68879A43f6902f61e77BF61B01E8e67';

const abi = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
        signature: 'constructor',
    },
    {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
        payable: true,
        signature: '0xe97dcb62',
    },
    {
        inputs: [],
        name: 'getPlayers',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        signature: '0x8b5b9ccc',
    },
    {
        inputs: [],
        name: 'manager',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        signature: '0x481c6a75',
    },
    {
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x5d495aea',
    },
    {
        inputs: [],
        name: 'winner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        signature: '0xdfbf53ae',
    },
];

export default new web3.eth.Contract(abi, address);
