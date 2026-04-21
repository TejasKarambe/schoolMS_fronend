const USER_KEY = "teacher_user";

export const login = (email, password) => {
  const user = JSON.parse(localStorage.getItem(USER_KEY));

  if (user && user.email === email && user.password === password) {
    return { success: true, user };
  }

  return { success: false, message: "Invalid credentials" };
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};