import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import { useInitAuth } from './modules/Auth/hooks/useInitAuth';
import { AuthModal } from './modules/Auth';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import VacanciesPage from './pages/VacanciesPage/VacanciesPage';
import CompaniesPage from './pages/CompaniesPage/CompaniesPage';
import ResumesPage from './pages/ResumesPage/ResumesPage';
import ContactPage from './pages/ContactPage/ContactPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import VacancyPage from './pages/SingleVacancyPage/SingleVacancyPage';
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
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/vacancies" element={<VacanciesPage />} />
                        <Route
                            path="/vacancies/:vacancyId"
                            element={<VacancyPage />}
                        />
                        <Route path="/companies" element={<CompaniesPage />} />
                        <Route path="/resumes" element={<ResumesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
