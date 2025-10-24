import React, { memo, useMemo, useState, useEffect } from 'react';
import { FaPencil, FaX } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { useUsers } from '../../hooks/useUsers';
import { GENDERS } from '../../utils/constants';
import { POPULAR_COUNTRIES, getStatesByCountry } from '../../utils/countriesData';

const BasicInfoTab = memo(({ userId }) => {
  const { users, updateUser } = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [countryStates, setCountryStates] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  // Get user data and sync whenever user changes
  useEffect(() => {
    const foundUser = users.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      const countryCode = foundUser.countryCodeDomicile || 'IN';
      setCountryStates(getStatesByCountry(countryCode));
      reset({
        firstName: foundUser.firstName || '',
        lastName: foundUser.lastName || '',
        email: foundUser.email || '',
        yearOfBirth: foundUser.yearOfBirth || '',
        gender: foundUser.gender || '',
        countryCode: foundUser.countryCode || 'IN',
        phone: foundUser.phone || '',
        alternatePhone: foundUser.alternatePhone || '',
        address: foundUser.address || '',
        pincode: foundUser.pincode || '',
        state: foundUser.state || '',
        countryCodeDomicile: foundUser.countryCodeDomicile || 'IN',
      });
      setIsEditing(false);
    }
  }, [userId, users, reset]);

  const handleCountryChange = (countryCode) => {
    const states = getStatesByCountry(countryCode);
    setCountryStates(states);
    reset((prevValues) => ({
      ...prevValues,
      state: '',
      countryCodeDomicile: countryCode,
    }));
  };

  const onSubmit = (data) => {
    updateUser(userId, data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Generate years from 1960 to current year
  const generateBirthYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1960; year--) {
      years.push(year);
    }
    return years;
  };

  const inputClassEditing = 'w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-600';
  const inputClassView = 'text-gray-900 text-sm font-normal';
  const labelClass = 'block text-xs font-medium text-gray-700 mb-2';
  
  const currentCountry = POPULAR_COUNTRIES.find(c => c.code === watch('countryCode'));

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Card Header */}
      <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Basic Details</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 rounded-md bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
          title={isEditing ? 'Cancel edit' : 'Edit'}
          aria-label={isEditing ? 'Cancel edit' : 'Edit'}
        >
          <FaPencil size={16} />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
        <div className="space-y-6">
          {/* Row 1: First Name, Last Name, Email (3 columns) */}
          <div className="grid grid-cols-12 gap-6">
            {/* First Name */}
            <div className="col-span-4">
              <label className={labelClass}>First name</label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="e.g. John"
                  {...register('firstName', { required: false })}
                  className={inputClassEditing}
                />
              ) : (
                <p className={inputClassView}>{user.firstName || '-'}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="col-span-4">
              <label className={labelClass}>Last name</label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="e.g. Doe"
                  {...register('lastName', { required: false })}
                  className={inputClassEditing}
                />
              ) : (
                <p className={inputClassView}>{user.lastName || '-'}</p>
              )}
            </div>

            {/* Email ID */}
            <div className="col-span-4">
              <label className={labelClass}>Email ID</label>
              {isEditing ? (
                <input
                  type="email"
                  placeholder="e.g. mrnobody@mail.com"
                  {...register('email', { required: false })}
                  className={inputClassEditing}
                />
              ) : (
                <p className={inputClassView}>{user.email || '-'}</p>
              )}
            </div>
          </div>

          {/* Row 2: Year of Birth, Gender, Phone Number */}
          <div className="grid grid-cols-12 gap-6">
            {/* Year of Birth */}
            <div className="col-span-4">
              <label className={labelClass}>Year of birth</label>
              {isEditing ? (
                <select
                  {...register('yearOfBirth')}
                  className={inputClassEditing}
                >
                  <option value="">Select year</option>
                  {generateBirthYears().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              ) : (
                <p className={inputClassView}>{user.yearOfBirth || '-'}</p>
              )}
            </div>

            {/* Gender */}
            <div className="col-span-4">
              <label className={labelClass}>Gender</label>
              {isEditing ? (
                <select
                  {...register('gender')}
                  className={inputClassEditing}
                >
                  <option value="">Select an option</option>
                  {GENDERS.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              ) : (
                <p className={inputClassView}>{user.gender || '-'}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="col-span-4">
              <label className={labelClass}>Phone number</label>
              {isEditing ? (
                <div className="flex gap-2">
                  {/* Custom Country Code Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="px-3 py-2 bg-slate-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 cursor-pointer flex items-center gap-1 min-w-[80px]"
                    >
                      <span className="text-base">{currentCountry?.flag || '🇮🇳'}</span>
                      <span>{currentCountry?.phoneCode || '+91'}</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                        {POPULAR_COUNTRIES.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              reset((prev) => ({ ...prev, countryCode: country.code }));
                              setShowCountryDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-slate-100 flex items-center gap-2 text-sm"
                          >
                            <span className="text-base">{country.flag}</span>
                            <span>{country.phoneCode}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Hidden input for form registration */}
                    <input
                      type="hidden"
                      {...register('countryCode')}
                    />
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="9876543210"
                    {...register('phone')}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                  />
                </div>
              ) : (
                <p className={inputClassView}>
                  {POPULAR_COUNTRIES.find(c => c.code === user.countryCode)?.flag} {user.phone || '-'}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Alternate Phone, Address, Pincode */}
          <div className="grid grid-cols-12 gap-6">
            {/* Alternate Phone */}
            <div className="col-span-4">
              <label className={labelClass}>Alternate Phone no</label>
              {isEditing ? (
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  {...register('alternatePhone')}
                  className={inputClassEditing}
                />
              ) : (
                <p className={inputClassView}>{user.alternatePhone || '-'}</p>
              )}
            </div>

            {/* Address */}
            <div className="col-span-4">
              <label className={labelClass}>Address</label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="Enter here"
                  {...register('address')}
                  className={inputClassEditing}
                />
              ) : (
                <p className={inputClassView}>{user.address || '-'}</p>
              )}
            </div>

            {/* Pincode */}
            <div className="col-span-4">
              <label className={labelClass}>Pincode</label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="Enter here"
                  {...register('pincode')}
                  className={inputClassEditing}
                />
              ) : (
                <p className={inputClassView}>{user.pincode || '-'}</p>
              )}
            </div>
          </div>

          {/* Row 4: State and Country */}
          <div className="grid grid-cols-12 gap-6">
            {/* Domicile State */}
            <div className="col-span-4">
              <label className={labelClass}>Domicile state</label>
              {isEditing ? (
                <select
                  {...register('state')}
                  className={inputClassEditing}
                >
                  <option value="">Select an option</option>
                  {countryStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <p className={inputClassView}>{user.state || '-'}</p>
              )}
            </div>

            {/* Domicile Country - Offset to col-start-5 */}
            <div className="col-span-4 col-start-5">
              <label className={labelClass}>Domicile country</label>
              {isEditing ? (
                <select
                  {...register('countryCodeDomicile')}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className={inputClassEditing}
                >
                  <option value="">Select an option</option>
                  {POPULAR_COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className={inputClassView}>
                  {POPULAR_COUNTRIES.find(c => c.code === user.countryCodeDomicile)?.flag} {POPULAR_COUNTRIES.find(c => c.code === user.countryCodeDomicile)?.name || '-'}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2 px-4 border border-violet-600 text-violet-600 font-medium text-sm rounded hover:bg-violet-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-violet-600 text-white font-medium text-sm rounded hover:bg-violet-700 transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
});

BasicInfoTab.displayName = 'BasicInfoTab';

export default BasicInfoTab;