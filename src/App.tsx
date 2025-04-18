import { BrowserRouter } from 'react-router-dom';

import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <main className="main"></main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
