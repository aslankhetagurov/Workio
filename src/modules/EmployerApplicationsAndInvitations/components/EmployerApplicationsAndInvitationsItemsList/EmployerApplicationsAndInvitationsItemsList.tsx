import { selectCompanyData, selectUserData } from '@/modules/Auth';
import { useAppSelector } from '@/store/hooks';
import { useGetEmployerApplicationsQuery } from '@/store/api/applicationsApi';
import Spinner from '@/shared/UI/Spinner/Spinner';
import { useGetInvitationsQuery } from '@/store/api/invitationsApi';
import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import { TApplicationAndInvitationTabs } from '@/shared/UI/ApplicationsAndInvitationsTabs/ApplicationsAndInvitationsTabs';
import EmployerApplicationItem from '../EmployerApplicationItem/EmployerApplicationItem';
import EmployerInvitationItem from '../EmployerInvitationItem/EmployerInvitationItem';
import styles from './EmployerApplicationsAndInvitationsItemsList.module.scss';

interface IEmployerApplicationsAndInvitationsItemsListProps {
    currentTab: TApplicationAndInvitationTabs;
}

const EmployerApplicationsAndInvitationsItemsList = ({
    currentTab,
}: IEmployerApplicationsAndInvitationsItemsListProps) => {
    const user = useAppSelector(selectUserData);
    const companyData = useAppSelector(selectCompanyData);

    const {
        data: applications,
        isSuccess: isApplicationsSuccess,
        error: applicationsError,
        isFetching: isApplicationsFetching,
    } = useGetEmployerApplicationsQuery(companyData?.id ?? '', {
        skip: currentTab === 'invitations' || !companyData,
    });

    const {
        data: invitations,
        isSuccess: isInvitationsSuccess,
        error: invitationsError,
        isFetching: isInvitationsFetching,
    } = useGetInvitationsQuery(user?.id ?? '', {
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
                ? items?.map((application) => {
                      return (
                          <EmployerApplicationItem
                              application={application}
                              key={application.id}
                          />
                      );
                  })
                : items?.map((invitation) => {
                      return (
                          <EmployerInvitationItem
                              invitation={invitation}
                              key={invitation.id}
                          />
                      );
                  })}
        </ul>
    );
};

export default EmployerApplicationsAndInvitationsItemsList;
