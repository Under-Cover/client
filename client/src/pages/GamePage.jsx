import { useEffect, useRef, useState } from "react"
import waiting from "../assets/bg.png"
import card1 from "../assets/5.png"
import card2 from "../assets/6.png"
import card3 from "../assets/7.png"
import card4 from "../assets/8.png"
import Card from "../components/Card"
import pacman from "../assets/pacman.gif"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { io } from "socket.io-client"
import hm from "../assets/hm.gif"

let images = [card1, card2, card3, card4]

const socket = io("https://gp.halobangjago.site");

const GamePage = () => {
    const [messages, setMessages] = useState([]);
    const [listPlayer, setListPlayer] = useState([]);
    const [tema, setTema] = useState("");
    const [text, setText] = useState("");
    const [voted, setVoted] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [isSelect, setIsSelect] = useState(false)
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const sender = localStorage.getItem("name");
        socket.emit("new-player", { sender });

        socket.emit('/messages/get')

        socket.on("player:broadcast", (serverPlayer) => {
            setListPlayer(serverPlayer);
            if (serverPlayer.length === 4) {
                setGameStarted(true);
            }
        });

        socket.on(
            "choosedPlayer",
            (undercover, temaUndercover, temaNonUndercover) => {
                undercover === localStorage.getItem("name")
                    ? setTema(temaUndercover)
                    : setTema(temaNonUndercover);
            }
        );

        socket.on("messages:broadcast", (serverMessages) => {
            setMessages(serverMessages);
        });

        socket.on("endGame", ({ result, undercover }) => {
            console.log(result, undercover, "endgamememememe");

            if (undercover === localStorage.getItem("name")) {
                if (result === "win") {
                    Swal.fire({
                        icon: "error",
                        title: "YOU LOSE, YOU ARE THE UNDERCOVER AWOKAWOK",
                        showConfirmButton: true,
                    });
                }
                if (result === "lose") {
                    Swal.fire({
                        icon: "success",
                        title: "MANTEP GA KETAUAN AWOKAWOK",
                        showConfirmButton: true,
                    });
                }
            } else {
                if (result === "lose") {
                    Swal.fire({
                        icon: "error",
                        title: `YOU LOSE, UNDERCOVER : ${undercover}`,
                        showConfirmButton: true,
                    });
                }
                if (result === "win") {
                    Swal.fire({
                        icon: "success",
                        title: `MANTEP BISA NEBAK UNDERCOVERNYA KALIAN! UNDERCOVER: ${undercover} `,
                        showConfirmButton: true,
                    });
                }
            }
            localStorage.clear();
            socket.emit("ended", { ended: "ended" });
            navigate("/login");
        });

        return () => {
            socket.off();
        };
    }, [navigate]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleVote = async () => {
        const dataSwal = await Swal.fire({
            title: "Who's the undercover?",
            html: `
          <div style={{fontFamily: "League Spartan"}} class="flex flex-col space-y-4">
          <img src=${hm}/>
          <div>
          <select id="swal-input1" class="swal2-input border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm p-2">
          <option value="" disabled selected>Vote Player</option>
          ${listPlayer.map((item) => {
                if (item !== localStorage.getItem("name")) {
                    return `
                  <option value=${item}>${item}</option>`;
                }
            })}
              </select>
            </div>
          </div>
        `,
            focusConfirm: false,
            customClass: {
                popup: "rounded-3xl p-6 bg-white  max-w-md mx-auto",
                title: "text-xl font-bold text-gray-800 mb-4",
                confirmButton:
                    "bg-[#004AAD] hover:bg-black text-white font-semibold py-2 px-4 rounded-full mt-4",
                cancelButton:
                    "bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mt-4",
            },
            preConfirm: () => {
                const votePlayer = document.getElementById("swal-input1").value;

                if (!votePlayer) {
                    Swal.showValidationMessage("you have to vote for a player!");
                    return false;
                }

                return { votePlayer };
            },
        });
        const { votePlayer } = dataSwal.value;
        console.log(votePlayer);

        socket.emit("vote-count", { votePlayer })

    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (text.trim()) {
            const sender = localStorage.getItem("name");
            socket.emit("/messages/create", { text, sender });
            setText("");
        }
    };



    return (

        <div style={{ fontFamily: "League Spartan" }} >
            {gameStarted ? (
                <div className="flex flex-col lg:flex-row gap-10 overflow-hidden h-screen bg-[#FFF2E6] p-10">
                    {/* card container */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-center my-4 py-2">CHOOSE YOUR CARD</h1>
                        <div className="py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-sm:max-w-md">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:gap-6 gap-12">
                                {images.map((image, i) => {
                                    return <Card key={i} image={image} tema={tema} isSelect={isSelect} setIsSelect={setIsSelect} />
                                })}

                            </div>
                        </div>
                    </div>

                    {/* chat room */}
                    <div className="flex-1 lg:w-1/2 rounded-3xl bg-[#FBD502] flex flex-col overflow-hidden">
                        <div className="p-4 flex justify-between items-center ">
                            <h1 className="text-[#004AAD] text-xl md:text-3xl font-bold">DESCRIBE YOUR WORD</h1>
                            {!voted && (
                                <button
                                    onClick={handleVote}
                                    className="bg-[#E24795] text-2xl text-white font-semibold py-2 px-4 rounded-full hover:bg-[#32AD62] transition items-center"
                                >
                                    VOTE
                                </button>
                            )}
                        </div>

                        {/* chat bubble */}
                        <div className="h-[550px] bg-white m-4 rounded-2xl flex flex-col overflow-hidden p-2">
                            <div className="flex flex-col overflow-y-auto p-4">
                                {messages.map((message, i) => (
                                    <div
                                        key={i}
                                        className={`mb-2 flex ${message.sender === localStorage.getItem("name")
                                            ? "justify-end text-end"
                                            : "justify-start"
                                            }`}
                                    >
                                        <div>
                                            <span className="font-semibold">{message.sender}: </span>
                                            <p className={`break-all ${message.sender === localStorage.getItem("name")
                                                ? "bg-[#FFF42C]"
                                                : "bg-gray-200 "
                                                } rounded-2xl mt-1 px-3 py-1 text-sm text-wrap`}>
                                                    {message.text}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {new Date(message.createdAt).toLocaleTimeString()}
                                            </div>

                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* input message */}
                        <form onSubmit={handleSendMessage} className="flex m-4">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-grow p-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-r-full hover:bg-blue-600 transition"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div style={{ backgroundImage: `url(${waiting})`, backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: "League Spartan" }} className="h-[100vh] flex items-center align-middle justify-center" >
                    <div className="p-[10vw] mx-auto w-3/4 flex-col items-center justify-center">
                        <img className="max-w-xs mb-4 mx-auto" src={pacman} />
                        <h1 className="text-white font-bold text-6xl ml-2 text-center mb-4">Waiting for players...</h1>
                        <p className="text-center font-semibold text-4xl text-[#FFF42C]">
                            {listPlayer.length}/4 players have joined
                        </p>
                        {/* <img className="max-w-sreen mb-4" src={logo} /> */}

                    </div>
                </div>
            )}
        </div>
    )
}

export default GamePage