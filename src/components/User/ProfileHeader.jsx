import React, { memo } from 'react';
import { FaCircleUser } from 'react-icons/fa6';

const ProfileHeader = memo(({ user }) => {
  if (!user) return null;

  return (
    <div className="card mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <FaCircleUser size={60} className="text-white sm:w-20 sm:h-20" />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            {user.firstName} {user.lastName}
          </h1>
          <div className="flex flex-col sm:flex-row sm:gap-4 gap-1 text-gray-600 text-sm sm:text-base">
            <p className="flex items-center gap-1 sm:gap-2">
              📧 {user.email}
            </p>
            <p className="flex items-center gap-1 sm:gap-2">
              📱 {user.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;