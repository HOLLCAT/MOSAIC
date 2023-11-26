export const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required.';
  } else if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    return 'Invalid email format.';
  }
  return '';
};

export const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required.';
  } else if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
    return 'Password must be at least 8 characters long and include an uppercase letter and a number.';
  }
  return '';
};

export const validateConfirmPassword = (confirmPassword: string, password: string) => {
  if (!confirmPassword) {
    return 'Confirm password is required.';
  } else if (confirmPassword !== password) {
    return 'Confirm password must match password.';
  }
  return '';
};

export const validateFullName = (fullName: string) => {
  if (!fullName || fullName.length < 3) {
    return 'Full name must be at least 3 characters.';
  }
  return '';
};