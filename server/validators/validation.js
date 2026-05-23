const validateJob = (data) => {
  const errors = {};
  
  if (!data.title) errors.title = 'Title is required';
  if (!data.company) errors.company = 'Company is required';
  if (!data.location) errors.location = 'Location is required';
  if (!data.salary) errors.salary = 'Salary is required';
  if (!data.description) errors.description = 'Description is required';
  if (!data.category) errors.category = 'Category is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateApplication = (data) => {
  const errors = {};
  
  if (!data.fullName) errors.fullName = 'Full name is required';
  if (!data.email) errors.email = 'Email is required';
  if (!data.phone) errors.phone = 'Phone number is required';
  
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = { validateJob, validateApplication };