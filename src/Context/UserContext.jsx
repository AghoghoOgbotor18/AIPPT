import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [showUserModal, setShowUserModal] = useState(false);

  const toggleUser = () => {
    setShowUserModal((prev) => !prev);
  };

  return (
    <UserContext.Provider value={{ showUserModal, toggleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
