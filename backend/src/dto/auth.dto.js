const validateRegister = (data) => {
  const { name, email, password } = data;

  if (!name || name.trim() === "") {
    return "Name is required";
  }

  if (!email || email.trim() === "") {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

const validateLogin = (data) => {
  const { email, password } = data;

  if (!email || email.trim() === "") {
    return "Email is required";
  }

  if (!password) {
    return "Password is required";
  }

  return null;
};

module.exports = {
  validateRegister,
  validateLogin,
};