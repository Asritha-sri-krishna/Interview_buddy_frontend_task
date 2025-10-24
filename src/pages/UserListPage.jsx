import React, { memo, useMemo, useState } from 'react';
import { FaEye, FaTrash, FaPlus } from 'react-icons/fa6';
import Navbar from '../components/Common/Header';
import AddUserModal from '../components/Admin/AddUserModal';
import SuccessMessage from '../components/Common/SuccessMessage';
import ErrorMessage from '../components/Common/ErrorMessage';
import { useUsers } from '../hooks/useUsers';

const UserListPage = memo(({ onViewChange }) => {
  const { state, deleteUser, dispatch } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userRows = useMemo(() => state.users, [state.users]);

  const handleEditClick = (userId) => {
    // Navigate to profile page with the user ID
    onViewChange('profile', userId);
    window.scrollTo(0, 0);
  };

  const handleDeleteClick = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onProfileClick={() => onViewChange('profile')} />

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
      <main className="max-w-full px-6 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <FaPlus size={16} />
            Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sr. No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">E-mail</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {userRows.length > 0 ? (
                userRows.map((user, index) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.firstName} {user.lastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-4 justify-center items-center">
                        {/* Eye Icon - View User */}
                        <button
                          onClick={() => handleEditClick(user.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100"
                          title="View user"
                          aria-label="View user"
                        >
                          <FaEye size={20} />
                        </button>

                        {/* Trash Icon - Delete User */}
                        <button
                          onClick={() => handleDeleteClick(user.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100"
                          title="Delete user"
                          aria-label="Delete user"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No users found. Click "Add User" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add User Modal */}
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
});

UserListPage.displayName = 'UserListPage';

export default UserListPage;
