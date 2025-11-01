import { Link } from 'react-router-dom';

import MainHeader from '@/shared/UI/MainHeader/MainHeader';
import AboutGallery from '../AboutGallery/AboutGallery';
import { useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import styles from './About.module.scss';

export const About = () => {
    const user = useAppSelector(selectUserData);
    const isApplicant = user?.role === 'applicant';

    return (
        <section className={styles.about}>
            <MainHeader title="About Us" />
            <AboutGallery />
            <div className={styles.about__text}>
                <h2 className={styles.about__title}>About Workio</h2>

                <p>
                    Workio is a digital platform designed to simplify and
                    modernize the process of job searching and recruitment. It
                    serves as a bridge between employers and job seekers,
                    providing both sides with an efficient way to connect,
                    communicate, and collaborate.
                    <br />
                    For job seekers, Workio offers the ability to create and
                    manage professional resumes, apply to vacancies, and chat
                    directly with potential employers in real time. For
                    companies, it provides tools to publish job listings, review
                    candidate profiles, and manage communication with applicants
                    — all in one convenient workspace.
                    <br />
                    By combining vacancy management, resume creation, and
                    instant messaging, Workio transforms hiring into a seamless
                    and transparent experience. The platform is built for
                    clarity, speed, and accessibility — helping people find the
                    right opportunities and helping businesses find the right
                    talent faster.
                </p>
            </div>

            <div className={styles.about__dream}>
                <p className={styles['about__dream-title']}>
                    {isApplicant
                        ? 'Your Dream Jobs Are Waiting'
                        : 'Top Talents Are Waiting for Your Offer'}
                </p>

                <p className={styles['about__dream-subtitle']}>
                    {isApplicant
                        ? 'Over 1 million interections, 50k succes stories.'
                        : 'Over 100,000 active candidates, 50,000 successful hires. Find the perfect fit for your team.'}
                </p>

                <Link
                    className={styles['about__dream-link']}
                    to={isApplicant ? '/vacancies' : '/resumes'}
                >
                    {isApplicant
                        ? 'Serch and Apply job Now'
                        : 'Find Candidates'}
                </Link>
            </div>
        </section>
    );
};
