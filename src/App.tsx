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
import ResumeEditingPage from './pages/ResumeEditingPage/ResumeEditingPage';
import VacancyEditingPage from './pages/VacancyEditingPage/VacancyEditingPage';
import FavoriteVacanciesPage from './pages/FavoriteVacanciesPage/FavoriteVacanciesPage';
import CompanyEditingPage from './pages/CompanyEditingPage/CompanyEditingPage';
import FavoritesResumesPage from './pages/FavoritesResumesPage/FavoritesResumesPage';
import ApplicantApplicationsAndInvitationsPage from './pages/ApplicantApplicationsAndInvitationsPage/ApplicantApplicationsAndInvitationsPage';
import { EmployerApplicationsAndInvitations } from './modules/EmployerApplicationsAndInvitations';
import ChatsPage from './pages/ChatsPage/ChatsPage';
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
                            path="/applicant/resume-editing"
                            element={<ResumeEditingPage />}
                        />
                        <Route
                            path="/applicant/applications-and-invitations"
                            element={
                                <ApplicantApplicationsAndInvitationsPage />
                            }
                        />
                        <Route
                            path="/employer/applications-and-invitations"
                            element={<EmployerApplicationsAndInvitations />}
                        />
                        <Route
                            path="/applicant/favorite-vacancies"
                            element={<FavoriteVacanciesPage />}
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
                        <Route
                            path="/employer/company-editing"
                            element={<CompanyEditingPage />}
                        />
                        <Route
                            path="/employer/favorite-resumes"
                            element={<FavoritesResumesPage />}
                        />
                        <Route path="/chats" element={<ChatsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
