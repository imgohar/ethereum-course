import web3 from './web3';
import lottery from './lottery';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
    const [manager, setManager] = useState('');
    useEffect(() => {
        const getManager = async () => {
            let data = await lottery.methods.manager().call();
            setManager(data);
        };
        getManager();
    }, []);

    return (
        <div>
            <h2>Lottery Contract</h2>
            <p>This contract is managed by {manager}</p>
        </div>
    );
}

export default App;
