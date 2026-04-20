import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'sonner';

import { Header } from './modules/Header';
import { Footer } from './modules/Footer';
import { useInitAuth } from './modules/Auth/hooks/useInitAuth';
import { AuthModal } from './modules/Auth';
import Spinner from './shared/UI/Spinner/Spinner';
import './App.scss';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const VacanciesPage = lazy(() => import('./pages/VacanciesPage/VacanciesPage'));
const CompaniesPage = lazy(() => import('./pages/CompaniesPage/CompaniesPage'));
const ResumesPage = lazy(() => import('./pages/ResumesPage/ResumesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const SingleVacancyPage = lazy(
    () => import('./pages/SingleVacancyPage/SingleVacancyPage'),
);
const SingleResumePage = lazy(
    () => import('./pages/SingleResumePage/SingleResumePage'),
);
const SingleCompanyPage = lazy(
    () => import('./pages/SingleCompanyPage/SingleCompanyPage'),
);

const ApplicantResumesPage = lazy(
    () => import('./pages/ApplicantResumesPage/ApplicantResumesPage'),
);
const ResumeCreationPage = lazy(
    () => import('./pages/ResumeCreationPage/ResumeCreationPage'),
);
const ResumeEditingPage = lazy(
    () => import('./pages/ResumeEditingPage/ResumeEditingPage'),
);

const ApplicantApplicationsAndInvitationsPage = lazy(
    () =>
        import('./pages/ApplicantApplicationsAndInvitationsPage/ApplicantApplicationsAndInvitationsPage'),
);
const EmployerApplicationsAndInvitations = lazy(
    () =>
        import('./pages/EmployerApplicationsAndInvitationsPage/EmployerApplicationsAndInvitationsPage'),
);

const FavoriteVacanciesPage = lazy(
    () => import('./pages/FavoriteVacanciesPage/FavoriteVacanciesPage'),
);

const CompanyCreatePage = lazy(
    () => import('./pages/CompanyCreatePage/CompanyCreatePage'),
);
const CompanyEditingPage = lazy(
    () => import('./pages/CompanyEditingPage/CompanyEditingPage'),
);

const VacancyCreationPage = lazy(
    () => import('./pages/VacancyCreationPage/VacancyCreationPage'),
);
const VacancyEditingPage = lazy(
    () => import('./pages/VacancyEditingPage/VacancyEditingPage'),
);
const EmployerVacanciesPage = lazy(
    () => import('./pages/EmployerVacanciesPage/EmployerVacanciesPage'),
);

const FavoritesResumesPage = lazy(
    () => import('./pages/FavoritesResumesPage/FavoritesResumesPage'),
);

const ChatsPage = lazy(() => import('./pages/ChatsPage/ChatsPage'));

function App() {
    useInitAuth();

    return (
        <BrowserRouter>
            <div className="app">
                <Toaster position="top-left" closeButton richColors />
                <AuthModal />
                <Header />

                <main className="main">
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route index element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />

                            <Route
                                path="/vacancies"
                                element={<VacanciesPage />}
                            />
                            <Route
                                path="/vacancies/:vacancyId"
                                element={<SingleVacancyPage />}
                            />

                            <Route
                                path="/companies"
                                element={<CompaniesPage />}
                            />
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
                                path="/employer/company-editing"
                                element={<CompanyEditingPage />}
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
                                path="/employer/favorite-resumes"
                                element={<FavoritesResumesPage />}
                            />

                            <Route path="/chats" element={<ChatsPage />} />

                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
