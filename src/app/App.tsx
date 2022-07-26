import {useState} from 'react';
import {SomeConvenientWidget} from 'components';
import {widgetLoadingDelayValues} from 'config';

import './App.css';

function App() {
    const [rendersCount, setRendersCount] = useState(0);
    return (
        <div className='App'>
            <div className='App__content'>
                <div className='App__page-block App__page-block_management'>
                    <button
                        className='RenderButton'
                        onClick={(event) => {
                            event.preventDefault();
                            setRendersCount(rendersCount + 1);
                        }}
                    >
                        Restart Widget mounting
                    </button>
                </div>
                <div className='App__page-block App__page-block_title'>
                    <h1>
                        Playground for testing Widget loading
                    </h1>
                    <p>Available delay values:</p>
                    <ul>
                        {widgetLoadingDelayValues.map((value, index) => (
                            <li key={index}>
                                {value / 1000}
                                {' '}
                                seconds
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='App__page-block App__page-block_playground'>
                    <SomeConvenientWidget key={rendersCount} />
                </div>
            </div>
        </div>
    );
}

export default App;
