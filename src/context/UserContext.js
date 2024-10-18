import React, { createContext, useContext, useState } from "react";

// Create User Context
const UserContext = createContext();

// Create a custom hook to use the User Context
export const useUser = () => {
  return useContext(UserContext);
};

// Create a User Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user data

  // Function to set user data
  const loginUser = (userData) => {
    console.log(userData);
    setUser({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      roles: userData.role, // Store roles as an array
    });
  };

  // Function to clear user data (e.g., on logout)
  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
