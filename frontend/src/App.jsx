import web3 from './web3';
import lottery from './lottery';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
    const [manager, setManager] = useState('');
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState('');
    const [value, setValue] = useState('');

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

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(value, 'ether'),
        });
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
                        value={value}
                        placeholder="Number of ether"
                    />
                </div>
                <button type="submit">Enter</button>
            </form>
        </div>
    );
}

export default App;
