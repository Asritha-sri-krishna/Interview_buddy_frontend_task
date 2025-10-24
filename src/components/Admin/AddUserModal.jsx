import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUsers } from '../../hooks/useUsers';
import { validateEmail } from '../../utils/validation';
import { v4 as uuidv4 } from 'uuid';
import { IoClose } from 'react-icons/io5';

const AddUserModal = ({ isOpen, onClose }) => {
  const { addUser } = useUsers();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      contact: '',
    },
  });

  const onSubmit = (data) => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const newUser = {
        id: uuidv4(),
        firstName: data.name.split(' ')[0] || '',
        lastName: data.name.split(' ').slice(1).join(' ') || '',
        email: data.email,
        phone: data.contact,
        yearOfBirth: '',
        gender: '',
        countryCode: 'IN',
        alternatePhone: '',
        address: '',
        pincode: '',
        state: '',
        countryCodeDomicile: 'IN',
        school: '',
        degree: '',
        course: '',
        yearOfCompletion: '',
        grade: '',
        skills: '',
        projects: '',
        workExperience: [],
        linkedinUrl: '',
        resume: '',
      };

      // Add user through context
      addUser(newUser);

      reset();
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-label="Close drawer"
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full lg:w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Add User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
            aria-label="Close"
          >
            <IoClose />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            {/* Row 1: Name of the user (Full Width) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of the user
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="Type here"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Row 2: Email and Contact (2-Column Grid) */}
            <div className="grid grid-cols-2 gap-4">
              {/* Email Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    validate: (value) =>
                      validateEmail(value) || 'Invalid email format',
                  })}
                  className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="Type here"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Contact Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact
                </label>
                <input
                  type="tel"
                  {...register('contact', { required: 'Contact is required' })}
                  className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="Type here"
                />
                {errors.contact && (
                  <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Drawer Footer (Buttons) - Sticky at Bottom */}
        <div className="border-t border-gray-200 p-6 flex gap-3 justify-end">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-violet-100 text-violet-700 font-medium text-sm rounded-md hover:bg-violet-200 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>

          {/* Add Button */}
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-2 bg-violet-600 text-white font-medium text-sm rounded-md hover:bg-violet-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Adding...
              </>
            ) : (
              'Add'
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUserModal;