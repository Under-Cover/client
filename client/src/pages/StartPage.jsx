import bgimage from "../assets/selected.png"
import logo from "../assets/logo.gif"
import { useLoginContext } from "../context/MyContext"


const StartPage = () => {
    // const [username, setUsername] = useState("");
    // const navigate = useNavigate()

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     localStorage.setItem("name", username);
    //     navigate('/')
    // };

    const { username, setUsername, handleSubmit} = useLoginContext()
    return (

        <div style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: "League Spartan" }} className="h-[100vh] flex items-center align-middle justify-center" >
            <div className="p-[10vw] mx-auto w-3/4">
                <h1 className="text-white font-semibold text-2xl mb-1 ml-2">Nasi Goreng Gila presents</h1>
                <img className="max-w-sreen mb-4" src={logo} />
                <form onSubmit={handleSubmit}>
                    <input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type='text'
                        placeholder='Input your name here'
                        className="px-6 py-3 text-lg bg-white max-w-md outline-blue-500 rounded-full ml-2" />
                    <button type="submit"
                        className="mx-2 px-5 py-3 rounded-full text-white text-lg tracking-wider font-medium outline-none bg-[#E24795] hover:bg-[#FBD502] hover:text-black active:bg-[#FFF42C] active:text-black">START</button>
                </form>

            </div>
        </div>
    )
}

export default StartPage