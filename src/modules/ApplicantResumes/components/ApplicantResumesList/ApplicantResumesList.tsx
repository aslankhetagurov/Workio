import ApplicantResumeItem from '../ApplicantResumeItem/ApplicantResumeItem';
import { useAppSelector } from '@/store/hooks';
import { selectUserData, selectUserDataIsLoading } from '@/modules/Auth';
import { useGetApplicantResumesQuery } from '@/modules/Resumes';
import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import Spinner from '@/shared/UI/Spinner/Spinner';
import styles from './ApplicantResumesList.module.scss';

const ApplicantResumesList = () => {
    const user = useAppSelector(selectUserData);
    const userDataIsLoading = useAppSelector(selectUserDataIsLoading);

    const {
        data: resumes,
        isFetching,
        error,
        refetch,
    } = useGetApplicantResumesQuery(user?.id ?? '', { skip: !user });

    if (userDataIsLoading || !user || isFetching)
        return (
            <div role="status" aria-busy="true" aria-live="polite">
                <Spinner />
            </div>
        );

    if (error)
        return (
            <ErrorComponent errorMessage="Failed to fetch resumes. Please try again later." />
        );

    if (!resumes?.length)
        return (
            <div role="status" aria-live="polite">
                <p>No resumes yet.</p>
            </div>
        );

    return (
        <ul className={styles.resumes}>
            {resumes.map((item) => (
                <ApplicantResumeItem
                    resumeData={item}
                    key={item.id}
                    refetch={refetch}
                />
            ))}
        </ul>
    );
};

export default ApplicantResumesList;
