import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import lose from "../assets/wek.gif"

const LoginContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = () => {
  return useContext(LoginContext);
};
export const LoginProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const socket = io("http://localhost:3000");

  const handleSubmit = (e) => {
    socket.on("kelebihan", (pesan) => {
      console.log(pesan, "DI CLIENT DIKIRIM APA SIH");
      if(pesan.sender === localStorage.getItem("name")){
          localStorage.clear()
          navigate('/login')
          Swal.fire({
              title: "GABISA MASUUUK UDAH PENUH BROOOOO, coba lagi ntaran yaaa",
              html: `
                  <div style={{fontFamily: "League Spartan"}} class="flex flex-col space-y-4">
                      <img src="${lose}"/>
                  </div>
                  `,
              focusConfirm: false,
              customClass: {
                  popup: "rounded-3xl p-6 bg-white  max-w-md mx-auto",
                  title: "text-xl font-bold text-gray-800 mb-4",
                  confirmButton:
                      "bg-[#004AAD] hover:bg-black text-white font-semibold py-2 px-4 rounded-full mt-4",
              },
              confirmButtonText: "SYAAAPP"
          });
      }
  })

    e.preventDefault();
    localStorage.setItem("name", username);
    Swal.fire({
      title: "WELCOME!",
      html: `
          <div style={{fontFamily: "League Spartan"}} class="flex flex-col space-y-4">
              <p>
              How to Play <br>
1. Word Description: <br>
<br>
    * Each player takes turns describing their word in the chat room. <br>
<br>
2. Discussion: <br>
<br>
    * Discuss to identify who the Undercover is. <br>
<br>
3. Voting (Call to Vote): <br>
<br>
    * Propose a vote if you suspect someone. <br>
<br>
    * If the majority agrees, proceed with the vote. <br>
<br>
Winning Conditions <br>
<br>
* Citizens Win: If the majority correctly identifies the Undercover. <br>
<br>
* Undercover Wins: If the majority fails to identify the Undercover. <br>
<br>
Enjoy the game!
              </p>
          </div>
          `,
      focusConfirm: false,
      customClass: {
        popup: "rounded-3xl p-6 bg-white  max-w-md mx-auto",
        title: "text-xl font-bold text-gray-800 mb-4",
        confirmButton:
          "bg-[#004AAD] hover:bg-black text-white font-semibold py-2 px-4 rounded-full mt-4",
      },
    });


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

