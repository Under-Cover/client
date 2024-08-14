import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = () => {
 return useContext(LoginContext);
};
export const LoginProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", username);

    navigate("/");
  };

  return (
    <LoginContext.Provider value={{ username, setUsername, handleSubmit }}>
      {children}
    </LoginContext.Provider>
  );
};

// const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (text.trim()) {
//         const sender = localStorage.getItem("name");
//         socket.emit("/messages/create", { text, sender });
//         setText("");
//     }
// };

