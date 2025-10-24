import React, { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa6';
import { useUsers } from '../../hooks/useUsers';
import EditUserModal from './EditUserModal';

const UsersTable = ({ users }) => {
  const { dispatch } = useUsers();
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch({ type: 'DELETE_USER', payload: userId });
    }
  };

  if (users.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-600 text-lg">No users found. Click "+ Add User" to create one.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <div className="card">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sr. No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div className="font-medium">{user.firstName} {user.lastName}</div>
                    <div className="text-gray-500 text-xs">{user.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="text-blue-600 hover:text-blue-800 text-lg transition-colors p-2 hover:bg-blue-50 rounded-lg"
                      title="View User"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 text-lg transition-colors p-2 hover:bg-red-50 rounded-lg"
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </>
  );
};

export default UsersTable;