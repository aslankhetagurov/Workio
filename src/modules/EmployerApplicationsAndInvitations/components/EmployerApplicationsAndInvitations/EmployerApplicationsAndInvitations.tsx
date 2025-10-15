import { useState } from 'react';

import MainHeader from '@/shared/UI/MainHeader/MainHeader';
import ApplicationsAndInvitationsTabs, {
    TApplicationAndInvitationTabs,
} from '../../../../shared/UI/ApplicationsAndInvitationsTabs/ApplicationsAndInvitationsTabs';
import EmployerApplicationsAndInvitationsItemsList from '../EmployerApplicationsAndInvitationsItemsList/EmployerApplicationsAndInvitationsItemsList';

export const EmployerApplicationsAndInvitations = () => {
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

                <EmployerApplicationsAndInvitationsItemsList
                    currentTab={currentTab}
                />
            </div>
        </section>
    );
};
