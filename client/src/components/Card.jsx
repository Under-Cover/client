import { useState } from "react"
import ReactCardFlip from "react-card-flip";
import bgblue from "../assets/selected.png"

const Card = ({ image, tema, isSelect, setIsSelect }) => {

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        setIsSelect(true)
    };


    return (

        <div>
            <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
                {/* front side */}
                {!isSelect? (
                <div onClick={handleFlip}>
                    <div className="rounded-3xl group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
                        <div className="w-[250px] h-[300px] overflow-hidden mx-auto">
                            <img
                                alt="product1"
                                className="h-full w-full object-cover"
                                src={image}
                            />
                        </div>
                    </div>


                </div>
                ) : ( <div>
                    <div className="rounded-3xl group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
                        <div className="w-[250px] h-[300px] overflow-hidden mx-auto">
                            <img
                                alt="product1"
                                className="h-full w-full object-cover"
                                src={image}
                            />
                        </div>
                    </div>


                </div>)}

                {/* back side */}
                <div style={{ backgroundImage: `url(${bgblue})`, backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: "League Spartan" }}
                className="rounded-3xl">
                <div className="group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
                        <div className="w-[250px] h-[300px] overflow-hidden mx-auto object-cover">
                         <h1 className="p-10 mx-auto font-bold text-white">
                            {tema}
                            </h1>
                        </div>
                    </div>

                </div>




            </ReactCardFlip>
        </div>


    )
}

export default Card