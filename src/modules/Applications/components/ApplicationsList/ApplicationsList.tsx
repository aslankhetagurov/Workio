import { useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import { useGetApplicationsQuery } from '@/modules/Applications/api/applicationsApi';
import ApplicationsItem from '../ApplicationsItem/ApplicationsItem';
import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import Spinner from '@/shared/UI/Spinner/Spinner';
import styles from './ApplicationsList.module.scss';

const ApplicationsList = () => {
    const user = useAppSelector(selectUserData);

    const {
        data: applications,
        isSuccess,
        error,
        isFetching,
    } = useGetApplicationsQuery(user?.id ?? '', {
        skip: !user,
    });

    if (isFetching) return <Spinner />;

    if (isSuccess && !applications?.length) {
        return <p>No applications found...</p>;
    }

    if (error)
        return (
            <ErrorComponent errorMessage="Failed to fetch applications. Please try again later." />
        );

    return (
        <ul className={styles.applications}>
            {applications?.map((application) => {
                return (
                    <ApplicationsItem
                        applicationData={application}
                        key={application.id}
                    />
                );
            })}
        </ul>
    );
};

export default ApplicationsList;
