import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Toaster position="top-left" closeButton richColors />
                <Header />
                <main className="main"></main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
