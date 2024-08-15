import { useEffect, useRef, useState } from "react"
import waiting from "../assets/bg.png"
import pacman from "../assets/pacman.gif"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { io } from "socket.io-client"
import hm from "../assets/hm.gif"
import lose from "../assets/wek.gif"
import win from "../assets/yey.gif"
import Card from "../components/Card"

const socket = io("https://gp.halobangjago.site");

const GamePage = () => {
    const [messages, setMessages] = useState([]);
    const [listPlayer, setListPlayer] = useState([]);
    const [tema, setTema] = useState("");
    const [text, setText] = useState("");
    const [voted, setVoted] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [isSelect, setIsSelect] = useState(false)
    const [kartu, setKartu] = useState();
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const handleFlap = (i) => {
        // setIsFlipped(!isFlipped);
        setIsSelect(true);
        socket.emit("setawik", { i });
        
    };


    useEffect(() => {
        const sender = localStorage.getItem("name");
        

        socket.on("awikwokwok", (i) => {
            console.log(i);

            setKartu(i);
            console.log(kartu);
        });

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
                        title: "YOU LOSE, YOU ARE THE UNDERCOVER",
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
                            cancelButton:
                                "bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mt-4",
                        },
                    });
                }
                if (result === "lose") {
                    Swal.fire({
                        title: "NAISSSSS YOUR UNDERCOVER IS A SUCCESS",
                        html: `
                            <div style={{fontFamily: "League Spartan"}} class="flex flex-col space-y-4">
                                <img src="${win}"/>
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
                    });
                }
            } else {
                if (result === "lose") {
                    Swal.fire({
                        title: `YOU LOSE, UNDERCOVER : ${undercover}`,
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
                            cancelButton:
                                "bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mt-4",
                        },
                    });
                }
                if (result === "win") {
                    Swal.fire({
                        title: `AWESOME, YOU GUYS GUESSED IT RIGHT! UNDERCOVER: ${undercover} `,
                        html: `
                            <div style={{fontFamily: "League Spartan"}} class="flex flex-col space-y-4">
                                <img src="${win}"/>
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
          <img src="${hm}"/>
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
                popup: "rounded-3xl p-6 bg-white max-w-md mx-auto",
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
        setVoted(true)
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

        <div style={{ fontFamily: "League Spartan" }} className="h-screen overflow-hidden">
            {gameStarted ? (
                <div className="flex flex-col lg:flex-row h-full bg-[#FFF2E6] p-10 gap-4">
                    {/* card container */}
                    <div className="flex flex-col lg:w-[40%] h-[40%] lg:h-full pr-2 lg:pr-4 items-center">
                        <div className="flex-grow overflow-auto items-center justify-center ">
                            <h1 className="text-3xl font-extrabold text-center mt-2">Hi {localStorage.getItem("name")}! Enjoy the game! </h1>
                            <div className="my-auto items-center justify-center">
                                <Card
                                    tema={tema}
                                    isSelect={isSelect}
                                    setIsSelect={setIsSelect}
                                    handleFlap={handleFlap}
                                    kartu={kartu}
                                />
                            </div>
                        </div>
                    </div>

                    {/* chat room */}
                    <div className="flex flex-col lg:w-[60%] h-full rounded-3xl bg-[#FBD502] overflow-hidden p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-[#004AAD] text-xl lg:text-2xl font-bold">DESCRIBE YOUR WORD</h1>
                            {!voted && (
                                <button
                                    onClick={handleVote}
                                    className="bg-[#E24795] text-white text-sm lg:text-base font-semibold py-2 px-4 rounded-full hover:bg-[#32AD62] transition"
                                >
                                    <h1 className="pt-1 text-xl">
                                        VOTE NOW
                                    </h1>
                                </button>
                            )}
                        </div>

                        {/* chat bubble */}
                        <div className="flex-grow bg-white rounded-2xl flex flex-col overflow-hidden">
                            <div className="flex-grow overflow-y-auto p-4">
                                {messages.map((message, i) => (
                                    <div
                                        key={i}
                                        className={`mb-2 flex ${message.sender === localStorage.getItem("name")
                                            ? "justify-end text-end"
                                            : "justify-start"
                                            }`}
                                    >
                                        <div>
                                            <span className="font-semibold text-sm">{message.sender}: </span>
                                            <p className={`break-all ${message.sender === localStorage.getItem("name")
                                                ? "bg-[#FFF42C]"
                                                : "bg-gray-200"
                                                } rounded-2xl mt-1 px-3 py-1 text-sm`}>
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
                        <form onSubmit={handleSendMessage} className="flex mt-4">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-grow p-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-[#004AAD] text-white font-semibold py-2 px-4 rounded-r-full hover:bg-blue-600 transition"
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