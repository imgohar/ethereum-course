import web3 from './web3';
import lottery from './lottery';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
    const [manager, setManager] = useState('');
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState('');
    const [value, setValue] = useState('');
    const [winner, setWinner] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getData = async () => {
            setManager(await lottery.methods.manager().call());
            setPlayers(await lottery.methods.getPlayers().call());
            setBalance(await web3.eth.getBalance(lottery.options.address));
        };
        getData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const accounts = await web3.eth.getAccounts();

        setMessage('Waiting on transaction success....');

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(value, 'ether'),
        });

        setMessage('You have been entered!');
    };

    const onClick = async (e) => {
        e.preventDefault();

        const accounts = await web3.eth.getAccounts();

        setMessage('Waiting on transaction success....');

        await lottery.methods.pickWinner().send({
            from: accounts[0],
        });

        const winnerAddress = await lottery.methods.winner().call();
        setWinner(winnerAddress);

        setMessage('Winner has been picked!');
    };

    return (
        <div>
            <h2>Lottery Contract</h2>
            <p>This contract is managed by {manager}</p>
            <p>There are currently {players.length} players in this lottery</p>
            <p>
                competing to win {web3.utils.fromWei(balance, 'ether')} ether{' '}
            </p>

            <hr />
            <form onSubmit={onSubmit}>
                <h4>Want to try your luck?</h4>
                <div>
                    <label>Amount of ether to enter</label>
                    <input
                        onChange={(event) => setValue(event.target.value)}
                        type="number"
                        step="0.001"
                        min="0.002"
                        value={value}
                        placeholder="Number of ether"
                    />
                </div>
                <button type="submit">Enter</button>
            </form>
            <hr />

            <h4>Ready to pick a winner</h4>
            <button onClick={onClick}>Pick a Winner!</button>

            <hr />

            <h1>{message}</h1>
            <p>{winner}</p>
        </div>
    );
}

export default App;
