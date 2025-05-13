import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import { useInitAuth } from './modules/Auth/hooks/useInitAuth';
import { AuthModal } from './modules/Auth';
import HomePage from './pages/HomePage/HomePage';
import './App.scss';

function App() {
    useInitAuth();

    return (
        <BrowserRouter>
            <div className="app">
                <Toaster position="top-left" closeButton richColors />
                <AuthModal />
                <Header />
                <main className="main">
                    <HomePage />
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
