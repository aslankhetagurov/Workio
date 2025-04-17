import { BrowserRouter } from 'react-router-dom';

import { Header } from './modules/Header';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
            </div>
        </BrowserRouter>
    );
}

export default App;
