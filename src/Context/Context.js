import { useContext, createContext, useState } from "react";

const UserInfo = createContext();

const Context = ({ children }) => {
  const [uuid, setUuid] = useState("");
  return (
    <div>
      <UserInfo.Provider value={{ uuid, setUuid }}>
        {children}
      </UserInfo.Provider>
    </div>
  );
};
export const UserUniqueId = () => {
  return useContext(UserInfo);
};
export default Context;
