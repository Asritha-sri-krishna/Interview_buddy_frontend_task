import React, { memo, useMemo, useState, useEffect } from 'react';
import { FaCopy, FaUser, FaPencil } from 'react-icons/fa6';
import Navbar from '../components/Common/Header';
import SuccessMessage from '../components/Common/SuccessMessage';
import ErrorMessage from '../components/Common/ErrorMessage';
import TabNavigation from '../components/Tabs/TabNavigation';
import BasicInfoTab from '../components/User/BasicInfoTab';
import EducationTab from '../components/User/EducationTab';
import ExperienceTab from '../components/User/ExperienceTab';
import { useUsers } from '../hooks/useUsers';

const MyProfilePage = memo(({ userId, onViewChange }) => {
  const { users, updateUser, state, dispatch } = useUsers();
  const [activeTab, setActiveTab] = useState('basicInfo');
  const [user, setUser] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  // Get current user data
  useEffect(() => {
    if (userId) {
      const foundUser = users.find(u => u.id === userId);
      setUser(foundUser);
    } else {
      // Default to first user or dummy user
      setUser(users[0] || {
        id: '1',
        firstName: 'Dave',
        lastName: 'Richards',
        email: 'dave@mail.com',
        phone: '+91 8332883854',
      });
    }
  }, [userId, users]);

  const tabs = useMemo(() => [
    { id: 'basicInfo', label: 'Basic Info' },
    { id: 'education', label: 'Education & skills' },
    { id: 'experience', label: 'Experience' },
  ], []);

  const handleCopyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onload = () => {
        updateUser(user.id, { avatarImage: reader.result });
        setIsEditingAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar 
        onProfileClick={() => onViewChange('users')}
        onLogoClick={() => onViewChange('users')}
      />

      {/* Success/Error Messages */}
      {state.successMessage && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50 px-4">
          <SuccessMessage
            message={state.successMessage}
            onClose={() => dispatch({ type: 'CLEAR_MESSAGES' })}
          />
        </div>
      )}

      {state.error && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50 px-4">
          <ErrorMessage
            message={state.error}
            onClose={() => dispatch({ type: 'CLEAR_MESSAGES' })}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="w-full px-8 py-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6 shadow-sm">
          <div className="flex items-start gap-8">
            {/* Avatar with Edit - Medium Size */}
            <div className="relative flex-shrink-0 group">
              {user.avatarImage ? (
                <img
                  src={user.avatarImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-32 h-32 rounded-full object-cover border-3 border-violet-100"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-violet-50 flex items-center justify-center border-3 border-violet-100">
                  <FaUser size={56} className="text-violet-600" />
                </div>
              )}
              
              {/* Gray Overlay - Always visible */}
              <div className="absolute inset-0 rounded-full bg-gray-500 opacity-0 group-hover:opacity-60 transition-opacity cursor-pointer flex items-center justify-center">
                {/* Upload Icon Container */}
                <label className="flex flex-col items-center justify-center w-full h-full rounded-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  {/* Pencil Icon */}
                  <div className="bg-violet-400 text-white p-3 rounded-full shadow-lg mb-2">
                    <FaPencil size={20} />
                  </div>
                  <span className="text-white text-xs font-semibold">Upload</span>
                </label>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 pt-4">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center gap-3 mb-3">
                <p className="text-gray-700 text-base">{user.email}</p>
                <button
                  onClick={handleCopyEmail}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  <FaCopy size={16} />
                </button>
              </div>
              <p className="text-gray-700 text-base">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'basicInfo' && <BasicInfoTab userId={user.id} />}
          {activeTab === 'education' && <EducationTab userId={user.id} />}
          {activeTab === 'experience' && <ExperienceTab userId={user.id} />}
        </div>
      </main>
    </div>
  );
});

MyProfilePage.displayName = 'MyProfilePage';

export default MyProfilePage;
