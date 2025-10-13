import ApplicationsAndInvitationsTabs, {
    TApplicationAndInvitationTabs,
} from '@/shared/UI/ApplicationsAndInvitationsTabs/ApplicationsAndInvitationsTabs';
import MainHeader from '@/shared/UI/MainHeader/MainHeader';
import { useState } from 'react';
import ApplicantApplicationsAndInvitationsItemsList from '../ApplicantApplicationsAndInvitationsItemsList/ApplicantApplicationsAndInvitationsItemsList';

export const ApplicantApplicationsAndInvitations = () => {
    const [currentTab, setCurrentTab] =
        useState<TApplicationAndInvitationTabs>('applications');

    return (
        <section>
            <MainHeader title="Applications and Invitations" />

            <div>
                <ApplicationsAndInvitationsTabs
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />

                <ApplicantApplicationsAndInvitationsItemsList
                    currentTab={currentTab}
                />
            </div>
        </section>
    );
};
