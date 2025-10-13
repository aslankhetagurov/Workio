import { TApplicationAndInvitationTabs } from '@/shared/UI/ApplicationsAndInvitationsTabs/ApplicationsAndInvitationsTabs';
import { useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import { useGetApplicantInvitationsQuery } from '@/store/api/invitationsApi';
import Spinner from '@/shared/UI/Spinner/Spinner';
import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import ApplicantApplicationItem from '../ApplicantApplicationItem/ApplicantApplicationItem';
import ApplicantInvitationItem from '../ApplicantInvitationItem/ApplicantInvitationItem';
import { useGetApplicationsQuery } from '@/store/api/applicationsApi';
import styles from './ApplicantApplicationsAndInvitationsItemsList.module.scss';

interface IApplicantApplicationsAndInvitationsItemsListProps {
    currentTab: TApplicationAndInvitationTabs;
}

const ApplicantApplicationsAndInvitationsItemsList = ({
    currentTab,
}: IApplicantApplicationsAndInvitationsItemsListProps) => {
    const user = useAppSelector(selectUserData);

    const {
        data: applications,
        isSuccess: isApplicationsSuccess,
        error: applicationsError,
        isFetching: isApplicationsFetching,
    } = useGetApplicationsQuery(user?.id ?? '', {
        skip: currentTab === 'invitations' || !user,
    });

    const {
        data: invitations,
        isSuccess: isInvitationsSuccess,
        error: invitationsError,
        isFetching: isInvitationsFetching,
    } = useGetApplicantInvitationsQuery(user?.id ?? '', {
        skip: currentTab === 'applications' || !user,
    });

    const items = currentTab === 'applications' ? applications : invitations;
    const isFetching =
        currentTab === 'applications'
            ? isApplicationsFetching
            : isInvitationsFetching;
    const isSuccess =
        currentTab === 'applications'
            ? isApplicationsSuccess
            : isInvitationsSuccess;
    const error =
        currentTab === 'applications' ? applicationsError : invitationsError;

    if (isFetching) return <Spinner />;

    if (isSuccess && !items?.length) {
        return <p>No {currentTab} found...</p>;
    }

    if (error)
        return (
            <ErrorComponent
                errorMessage={`Failed to fetch ${currentTab}. Please try again later.`}
            />
        );

    return (
        <ul className={styles.items}>
            {currentTab === 'applications'
                ? items?.map((application) => (
                      <ApplicantApplicationItem
                          applicationData={application}
                          key={application.id}
                      />
                  ))
                : items?.map((invitation) => (
                      <ApplicantInvitationItem
                          invitation={invitation}
                          key={invitation.id}
                      />
                  ))}
        </ul>
    );
};

export default ApplicantApplicationsAndInvitationsItemsList;
