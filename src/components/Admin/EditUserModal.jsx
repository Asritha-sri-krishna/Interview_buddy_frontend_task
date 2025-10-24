import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../Modal/Modal';
import { useUsers } from '../../hooks/useUsers';
import { validateEmail } from '../../utils/validation';

const EditUserModal = ({ user, isOpen, onClose }) => {
  const { dispatch } = useUsers();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      dispatch({
        type: 'UPDATE_USER',
        payload: { ...data, id: user.id },
      });
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} title="Edit User" onClose={onClose} size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* First Name */}
        <div>
          <label className="label-text">First Name *</label>
          <input
            type="text"
            {...register('firstName', { required: 'First name is required' })}
            className="input-field"
          />
          {errors.firstName && (
            <span className="error-text">{errors.firstName.message}</span>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="label-text">Last Name *</label>
          <input
            type="text"
            {...register('lastName', { required: 'Last name is required' })}
            className="input-field"
          />
          {errors.lastName && (
            <span className="error-text">{errors.lastName.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label-text">Email Address *</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              validate: (value) =>
                validateEmail(value) || 'Invalid email format',
            })}
            className="input-field"
          />
          {errors.email && (
            <span className="error-text">{errors.email.message}</span>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="label-text">Contact Number</label>
          <input
            type="tel"
            {...register('phoneNumber')}
            className="input-field"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;