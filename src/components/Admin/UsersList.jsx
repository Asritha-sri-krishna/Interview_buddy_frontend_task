import React, { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import Header from '../Common/Header';
import LoadingSpinner from '../Common/LoadingSpinner';
import SuccessMessage from '../Common/SuccessMessage';
import ErrorMessage from '../Common/ErrorMessage';
import AddUserModal from './AddUserModal';
import UsersTable from './UsersTable';

const UsersList = ({ onViewChange }) => {
  const { state, dispatch } = useUsers();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // Auto-clear messages after 3 seconds
    if (state.successMessage || state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGES' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.successMessage, state.error, dispatch]);

  return (
    <>
      <Header title="User Profiles - Admin" />
      <div className="min-h-screen bg-light">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          {/* Messages */}
          {state.successMessage && (
            <div className="mb-6">
              <SuccessMessage
                message={state.successMessage}
                onClose={() => dispatch({ type: 'CLEAR_MESSAGES' })}
              />
            </div>
          )}

          {state.error && (
            <div className="mb-6">
              <ErrorMessage
                message={state.error}
                onClose={() => dispatch({ type: 'CLEAR_MESSAGES' })}
              />
            </div>
          )}

          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Users Management</h1>
            <p className="text-gray-600 text-lg">Manage all users in the system</p>
          </div>

          {/* View Toggle */}
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => onViewChange('admin')}
              className="btn-primary"
            >
              👥 Admin View (Users List)
            </button>
            <button
              onClick={() => onViewChange('user')}
              className="btn-secondary"
            >
              👤 User View (My Profile)
            </button>
          </div>

          {/* Add Button */}
          <div className="mb-8">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors text-lg"
            >
              + Add User
            </button>
          </div>

          {/* Content */}
          {state.loading ? (
            <LoadingSpinner text="Loading users..." />
          ) : (
            <UsersTable users={state.users} />
          )}
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  );
};

export default UsersList;