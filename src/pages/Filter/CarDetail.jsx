import React, { useState, useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { BsFillSuitcase2Fill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { SiPicardsurgeles } from "react-icons/si";
import { GiGasPump } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { PiArrowRightThin } from "react-icons/pi";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import axios from "axios";
import Comment from "./Comment";
import Reservation from "./Reservation";
import "aos/dist/aos.css";

const CarDetails = ({ currentId, changeCurrentId }) => {
    const [showComments, setShowComments] = useState(false);
    const [img, setImg] = useState([]);
    const [indexImg, setIndexImg] = useState(0);
    const [reserver, setReserver] = useState(false);
    const [id, setId] = useState(null);
    const [commentInput, setCommentInput] = useState(""); // State for comment input
    

    const [carData, setCarData] = useState({
        libelle: "",
        categorie: "",
        dateAchat: "",
        description: "",
        marque: "",
        nbr_passagers: "",
        nbr_valises: "",
        prix: "",
        transmission: "",
        chemin1: "",
        chemin2: "",
        chemin3: "",
        comments: [],
    });

    useEffect(() => {
        // alert("Current ID:", currentId);
        if (currentId.length > 0 && currentId != "none") {
            axios
                .post("http://localhost/locoauto/carDetails.php", currentId)
                .then((response) => {
                    setCarData(response.data);
                    console.log(response.data)
                    setId(currentId);
                    changeCurrentId("none");
                    setIndexImg(0);
                    setShowComments(false);
                    setImg([response.data.chemin1, response.data.chemin2, response.data.chemin3]);
                })
                .catch((error) => {
                    console.error("Error fetching car data:", error);
                });
        }
    }, [currentId, changeCurrentId]);

    const handleImageRight = (ind) => {
        if (ind === 2) {
            setIndexImg(0);
        } else {
            setIndexImg(ind + 1);
        }
    };

    const handleImageLeft = (ind) => {
        if (ind === 0) {
            setIndexImg(2);
        } else {
            setIndexImg(ind - 1);
        }
    };

    const handleCommentChange = (e) => {
        setCommentInput(e.target.value);
    };

    const handleCommentSubmit = () => {
        // Assuming you have a user ID or name to identify the commenter
        const newComment = {
            fname: "John", // Replace with actual user data or remove if not needed
            lname: "Doe", // Replace with actual user data or remove if not needed
            comment: commentInput,
        };

        // Post new comment to server or update local state
        // For demonstration, updating local state
        setCarData({
            ...carData,
            comments: [...carData.comments, newComment],
        });
        setCommentInput(""); // Clear comment input after submission
    };

    return (
        <>
            <div className={currentId.length === 0 ? "hidden" : "fixed w-full h-full opacity-60 top-0 left-0 bg-black"}></div>
            {reserver && <Reservation currentId={id} reserver={reserver} setReserver={setReserver} img={carData.chemin1} libelle={carData.libelle} prix={carData.prix} />}
            <div className={currentId.length === 0 ? "hidden" : "fixed top-0 left-0 right-0 bottom-0 bg-transparent min-screen:ml-2 w-full h-full mt-14 shadow-2xl overflow-y-auto z-40"}>
                <div className="min-screen:w-[86%] w-full mx-auto h-fit bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 flex min-screen:flex-row flex-col justify-between">
                    <div className="min-screen:w-[50%] w-full h-full flex flex-col justify-center relative">
                        <img src={img[indexImg]} alt={carData.libelle} />
                        <FaCircleArrowLeft color="white" size={25} onClick={() => handleImageLeft(indexImg)} className="absolute z-20 top-[50%] transform -translate-y-1/2 left-0 opacity-40 hover:opacity-100 cursor-pointer" />
                        <FaCircleArrowRight size={25} color="white" onClick={() => handleImageRight(indexImg)} className="absolute z-20 top-[50%] transform -translate-y-1/2 right-0 opacity-40 hover:opacity-100 cursor-pointer" />
                        <IoCloseOutline size={30} onClick={() => changeCurrentId("")} className="absolute z-20 top-0 right-0 cursor-pointer min-screen:hidden" />
                    </div>
                    <div className="min-screen:w-[50%] h-full py-8 px-4 min-screen:px-8 flex flex-row justify-between">
                        <div className="w-[90%] h-full">
                            <p className="font-light border-b mt-4 border-b-black w-fit">{carData.categorie}</p>
                            <h1 className="text-3xl mt-3">{carData.libelle}</h1>
                            <div className="flex flex-col justify-between text-gray-500 w-full mt-2">
                                <div className="flex justify-between min-screen:w-[60%] w-full">
                                    <div className="flex justify-between items-center">
                                        <IoPerson />
                                        <span>{carData.nbr_passagers}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <BsFillSuitcase2Fill />
                                        <span>{carData.nbr_valises}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <GiGasPump />
                                        <span>Essence</span>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="flex justify-between items-center">
                                        <IoSettingsSharp />
                                        <span>{carData.transmission}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <SiPicardsurgeles />
                                        <span>A/C</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-fit flex items-center mt-3">
                                <h2 className="font-bold text-[22px] text-green-700">{carData.prix} DH</h2>
                                <h3 className="ml-1 text-xs font-medium line-through text-red-700">900 DH</h3>
                                <h3 className="text-green-600 font-medium ml-2">-10%</h3>
                            </div>
                            <p className="text-sm mb-5">{carData.description}</p>
                            <button onClick={() => setReserver(true)} className="text-white mb-5 bg-black w-[70%] flex items-center pl-[24%] hover:pl-[27%] border h-[40px] font-semibold hover:bg-blue-500 ease-in-out duration-[450ms]">
                                <span className="font-thin">Reserver</span><PiArrowRightThin color="white" className="mt-1 ml-3" />
                            </button>
                            <p className="cursor-pointer" onClick={() => setShowComments(!showComments)}>{!showComments ? "Afficher les commentaires" : "Cacher les commentaires"}</p>
                        </div>
                        <div className="w-[10%] flex flex-col justify-start items-end">
                            <IoCloseOutline size={30} onClick={() => changeCurrentId("")} className="cursor-pointer min-screen:block hidden" />
                            <CiHeart size={30} className="cursor-pointer mt-3 hover:text-red-500 ease-in-out duration-200" />
                        </div>
                    </div>
                </div>
                {showComments && (
                    <div className="min-screen:w-[86%] mx-auto bg-white px-4 pb-4 md:mb-24 pt-6 ease-in-out duration-500">
                        <h1 className="border-t border-gray-300 text-4xl">Commentaires:</h1>
                        {/* Comment input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                value={commentInput}
                                onChange={handleCommentChange}
                                placeholder="Ajouter un commentaire..."
                                className="w-full px-3 py-2 border rounded"
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            >
                                Ajouter Commentaire
                            </button>
                        </div>
                        {carData.comments.map((comment, index) => (
                            <Comment key={index} text={comment.comment} fName={comment.fname} lName={comment.lname} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default CarDetails;
