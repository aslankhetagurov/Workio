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
import SingleVacancyPage from './pages/SingleVacancyPage/SingleVacancyPage';
import SingleResumePage from './pages/SingleResumePage/SingleResumePage';
import SingleCompanyPage from './pages/SingleCompanyPage/SingleCompanyPage';
import ApplicantResumesPage from './pages/ApplicantResumesPage/ApplicantResumesPage';
import ResumeCreationPage from './pages/ResumeCreationPage/ResumeCreationPage';
import CompanyCreatePage from './pages/CompanyCreatePage/CompanyCreatePage';
import VacancyCreationPage from './pages/VacancyCreationPage/VacancyCreationPage';
import EmployerVacanciesPage from './pages/EmployerVacanciesPage/EmployerVacanciesPage';
import VacancyEditingPage from './pages/VacancyEditingPage/VacancyEditingPage';
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
                            element={<SingleVacancyPage />}
                        />
                        <Route path="/companies" element={<CompaniesPage />} />
                        <Route
                            path="/companies/:companyId"
                            element={<SingleCompanyPage />}
                        />
                        <Route path="/resumes" element={<ResumesPage />} />
                        <Route
                            path="/resumes/:resumeId"
                            element={<SingleResumePage />}
                        />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route
                            path="/applicant/resumes"
                            element={<ApplicantResumesPage />}
                        />
                        <Route
                            path="/applicant/resume-creation"
                            element={<ResumeCreationPage />}
                        />
                        <Route
                            path="/employer/company-creation"
                            element={<CompanyCreatePage />}
                        />
                        <Route
                            path="/employer/vacancy-creation"
                            element={<VacancyCreationPage />}
                        />
                        <Route
                            path="/employer/vacancy-editing"
                            element={<VacancyEditingPage />}
                        />
                        <Route
                            path="/employer/vacancies"
                            element={<EmployerVacanciesPage />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
