import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const login = (data) => {
    console.log({data});
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // Example logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check for user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };