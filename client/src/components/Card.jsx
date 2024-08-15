import { useState } from "react"
import ReactCardFlip from "react-card-flip";
import back from "../assets/9.png"
import reveal from "../assets/10.png"

const Card = ({tema}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const cardStyle = {
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
    };
    
    return (
        <div className="flex items-center justify-center h-full p-4 my-[7.5vh]">
            <div className="w-[450px] h-[600px]">
                <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped} containerStyle={{ width: '100%', height: '100%' }}>
                    {/* front side */}
                    <div
                        onClick={handleFlip}
                        style={cardStyle}
                        className="rounded-3xl overflow-hidden cursor-pointer relative z-50 bg-[#32AD62] hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all"
                    >
                        <img
                            alt="product1"
                            className="h-full w-full object-contain"
                            src={reveal}
                        />
                    </div>

                    {/* back side */}
                    <div
                        onClick={handleFlip}
                        style={{
                            ...cardStyle,
                            backgroundImage: `url(${back})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        className="rounded-3xl overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all flex items-center justify-center"
                    >
                        <div className="text-center p-6" style={{ fontFamily: "League Spartan" }}>
                            <h2 className="font-bold text-white text-xl mb-4">
                                your word is :
                            </h2>
                            <h1 className="font-bold text-white text-5xl mb-20">
                                {tema}
                            </h1>
                        </div>
                    </div>
                </ReactCardFlip>
            </div>
        </div>
    );
};



export default Card