import React, { memo } from 'react';
import { FaBell, FaHeadset, FaUser } from 'react-icons/fa6';

const Navbar = memo(({ onProfileClick = () => {}, onLogoClick = () => {} }) => {
  const handleProfileClick = () => {
    if (typeof onProfileClick === 'function') {
      onProfileClick();
    }
  };

  const handleLogoClick = () => {
    if (typeof onLogoClick === 'function') {
      onLogoClick();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="w-full px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section - Clickable */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center hover:opacity-70 transition-opacity"
            title="Go to Users list"
            aria-label="Go to Users list"
          >
            <div className="w-9 h-9 border-2 border-gray-900 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">LOGO</span>
            </div>
          </button>

          {/* Icon Group - Right Side */}
          <div className="flex items-center gap-8">
            {/* Help/Support Icon */}
            <button 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              title="Help & Support"
              aria-label="Help and Support"
            >
              <FaHeadset size={18} />
            </button>

            {/* Notifications Icon */}
            <button 
              className="text-gray-700 hover:text-gray-900 transition-colors relative"
              title="Notifications"
              aria-label="Notifications"
            >
              <FaBell size={18} />
            </button>

            {/* User Profile Avatar */}
            <button 
              onClick={handleProfileClick}
              className="w-9 h-9 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center hover:shadow-md transition-shadow"
              title="My Profile"
              aria-label="My Profile"
            >
              <FaUser size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;