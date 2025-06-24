import { useParams } from 'react-router-dom';

import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import Spinner from '@/shared/UI/Spinner/Spinner';
import { useGetResumeQuery } from '../../api/singleResumeApi';
import SingleResumeMain from '../SingleResumeMain/SingleResumeMain';
import SingleResumeExperience from '../SingleResumeExperience/SingleResumeExperience';
import SingleResumeEducation from '../SingleResumeEducation/SingleResumeEducation';
import SingleResumeAbout from '../SingleResumeAbout/SingleResumeAbout';
import styles from './SingleResume.module.scss';

export const SingleResume = () => {
    const { resumeId } = useParams();
    if (!resumeId)
        return (
            <ErrorComponent errorMessage="Faild to fetch resume! Please try again later." />
        );

    const { data: resumeData, error, isFetching } = useGetResumeQuery(resumeId);

    if (isFetching)
        return (
            <div role="status" aria-busy="true" aria-live="polite">
                <Spinner />
            </div>
        );

    if (error)
        return (
            <ErrorComponent errorMessage="Faild to fetch resume. Please try again later." />
        );

    if (!resumeData)
        return (
            <ErrorComponent errorMessage="Resume not found or data is incomplete. Please try again later." />
        );

    const { about_me, educations } = resumeData;

    return (
        <section className={styles.resume} aria-labelledby="resume-heading">
            <SingleResumeMain resumeData={resumeData} />

            <main className={styles.resume__content}>
                <SingleResumeAbout aboutText={about_me} />
                <SingleResumeEducation education={educations} />
                <SingleResumeExperience resumeData={resumeData} />
            </main>
        </section>
    );
};
