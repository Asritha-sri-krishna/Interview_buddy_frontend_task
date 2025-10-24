import React, { useState, useEffect, memo, useMemo } from 'react';
import { useUsers } from '../../hooks/useUsers';
import Header from '../Common/Header';
import ProfileHeader from './ProfileHeader';
import TabNavigation from '../Tabs/TabNavigation';
import BasicInfoTab from './BasicInfoTab';
import EducationTab from './EducationTab';
import ExperienceTab from './ExperienceTab';
import SuccessMessage from '../Common/SuccessMessage';

const UserProfile = memo(({ onViewChange }) => {
  const { state, dispatch } = useUsers();
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = useMemo(() => [
    { id: 'basic', label: '📋 Basic Info' },
    { id: 'education', label: '🎓 Education & Skills' },
    { id: 'experience', label: '💼 Experience' },
  ], []);

  // Set first user as current user if not already set
  useEffect(() => {
    if (!state.currentUser && state.users.length > 0) {
      dispatch({ type: 'SET_CURRENT_USER', payload: state.users[0] });
    }
  }, [state.users, state.currentUser, dispatch]);

  const user = state.currentUser || state.users[0];

  if (!user) {
    return (
      <>
        <Header title="My Profile" />
        <div className="min-h-screen bg-light flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading your profile...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="My Profile" />
      <div className="min-h-screen bg-light">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Success Message */}
          {state.successMessage && (
            <div className="mb-6">
              <SuccessMessage
                message={state.successMessage}
                onClose={() => dispatch({ type: 'CLEAR_MESSAGES' })}
              />
            </div>
          )}

          {/* Profile Header */}
          <ProfileHeader user={user} />

          {/* Tab Navigation */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content */}
          <div className="animate-fadeIn">
            {activeTab === 'basic' && <BasicInfoTab />}
            {activeTab === 'education' && <EducationTab />}
            {activeTab === 'experience' && <ExperienceTab />}
          </div>
        </div>
      </div>
    </>
  );
});

UserProfile.displayName = 'UserProfile';

export default UserProfile;