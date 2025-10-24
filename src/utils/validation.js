export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
  if (!phone) return true; // Optional field
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 10;
};

export const validatePincode = (pincode) => {
  if (!pincode) return true; // Optional field
  const pincodeRegex = /^[0-9]{5,10}$/;
  return pincodeRegex.test(pincode);
};

export const validateYear = (year) => {
  if (!year) return true; // Optional field
  const yearNum = parseInt(year);
  return yearNum >= 1900 && yearNum <= new Date().getFullYear();
};

export const validateForm = (formData, requiredFields = []) => {
  const errors = {};

  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
    }
  });

  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number';
  }

  if (formData.alternatePhone && !validatePhoneNumber(formData.alternatePhone)) {
    errors.alternatePhone = 'Invalid phone number';
  }

  if (formData.pincode && !validatePincode(formData.pincode)) {
    errors.pincode = 'Invalid pincode';
  }

  if (formData.yearOfBirth && !validateYear(formData.yearOfBirth)) {
    errors.yearOfBirth = 'Invalid year of birth';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};