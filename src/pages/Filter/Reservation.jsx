import React, { useEffect, useState } from "react";
import { FaLocationDot, FaRegAddressCard } from "react-icons/fa6";
import Datepicker from "react-tailwindcss-datepicker";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCar } from "react-icons/fa";

const Reservation = ({ currentId, reserver, setReserver, img, libelle, prix }) => {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [cnieFileName, setCnieFileName] = useState("Choisir un fichier");
    const [noPermisFileName, setNoPermisFileName] = useState("Choisir un fichier");

    const handleValueChange = (newValue) => {
        setValue(newValue);
        const startDate = new Date(newValue.startDate);
        const endDate = new Date(newValue.endDate);
        const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        setNbJours(daysDifference + 1);
    };

    const [reservedDates, setReservedDates] = useState([]);
    const [reservationData, setReservationData] = useState({
        carId: currentId,
        lieuRamassage: "",
        lieuDepot: "",
        dateDebut: new Date(),
        dateFinReservation: null,
        cnie: null,
        NoPermis: null
    });

    useEffect(() => {
        // alert("heey",currentId)
        setCurrentDate(new Date());
        setToken(getCookie("token"));
        // Fetch reserved dates
        axios.get(`http://localhost/locoauto/reservedDates.php?carId=${currentId}`)
            .then(response => {
                setReservedDates(response.data.map(dateRange => ({
                    startDate: new Date(dateRange.start),
                    endDate: new Date(dateRange.end)
                })));
            })
            .catch(error => console.error(error));
    }, [currentId]);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        setReservationData({ ...reservationData, [name]: file });

        if (name === "cnie") {
            setCnieFileName(file ? file.name : "Choisir un fichier");
        } else if (name === "NoPermis") {
            setNoPermisFileName(file ? file.name : "Choisir un fichier");
        }
    };

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const [nbJours, setNbJours] = useState(0);
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    const handleReservation = (e) => {
        e.preventDefault();
        const dateDebut = new Date(value.startDate);
        const dateFin = new Date(value.endDate);

        const formData = new FormData();
        formData.append('carId', currentId);
        formData.append('lieuRamassage', reservationData.lieuRamassage);
        formData.append('lieuDepot', reservationData.lieuDepot);
        formData.append('dateDebut', dateDebut.toISOString().split('T')[0]);
        formData.append('dateFin', dateFin.toISOString().split('T')[0]);
        formData.append('cnie', reservationData.cnie);
        formData.append('NoPermis', reservationData.NoPermis);
        formData.append('montantTotal', nbJours * prix);
        formData.append('token', token);

        if (token === null) {
            if (window.confirm('Vous devez vous connecter avant de réserver')) {
                navigate("/login");
            }
        } else {
            if (!formData.get('lieuRamassage') ||
                !formData.get('lieuDepot') ||
                !formData.get('dateDebut') ||
                !formData.get('dateFin') ||
                !formData.get('cnie') ||
                !formData.get('NoPermis')) {
                alert("Vous devez remplir tous les champs nécessaires !");
            } else {
                if (window.confirm("Valider la réservation ?")) {
                    axios.post("http://localhost/locoauto/reservation.php", formData)
                        .then((response) => {
                            // alert(response.data);
                            navigate("/reservations")
                        })
                        .catch(error => console.error(error));
                } else {
                    alert("Réservation annulée !");
                }
            }
        }
    };

    return (
        <div className={!reserver ? 'hidden' : `fixed w-[100%] mt-[-15px] z-50 mx-auto min-screen:h-screen h-[100%] bg-gray-800`}>
            <img src={img} className="absolute h-full w-full z-10 mx-auto object-cover opacity-30" alt="car" />
            <div className="relative z-20 flex flex-col justify-center items-center h-full min-screen:mx-0 mx-4">
                <div className="max-w-[900px]">
                    <h2 className="text-white opacity-80 text-[16px] text-center min-screen:block hidden">Plateforme de location de voitures de 100% confiance au Maroc</h2>
                    <h1 className="text-white min-screen:text-[42px] text-xl text-center leading-tight">Votre voiture est prête à vous accueillir où vous le souhaitez !</h1>
                    <h2 className={`min-screen:block hidden text-gray-200 text-[20px] text-center`}>Choisissez votre emplacement, sans avoir à vous rendre au centre de location, notre service spécial consiste à amener la voiture à l'emplacement choisi. et payment après livraison.</h2>
                    <div className="mb-4 mt-2 flex flex-col min-screen:flex-row justify-between items-center">
                        <div className="text-white font-semibold min-screen:text-2xl text-xl underline min-screen:text-left text-center">Voiture choisie : {libelle} <span>- {prix} DH/J</span></div>
                        {/* <Link to={"/filter"}> */}
                            <p onClick={() => { setReserver(false) }} className="text-white w-fit bg-transparent px-6 py-2 min-screen:block hidden rounded-lg hover:bg-blue-600 cursor-pointer ease-in-out duration-300 border-white border">Annuler la réservation</p>
                        {/* </Link> */}
                    </div>
                </div>
                <form onSubmit={handleReservation} className="min-screen:w-[90%] min-screen:h-[100px] h-fit flex min-screen:flex-row flex-col justify-between bg-black bg-opacity-80 pb-8 pt-2 gap-2 px-3 rounded-2xl">
                    <div className="h-fit min-screen:text-left text-center w-fit">
                        <p className="text-white mb-1 text-lg font-semibold">Localisation (départ et arrivée)</p>
                        <div className="flex gap-2">
                            <div className="cursor-pointer bg-gray-800 flex justify-between items-center rounded-lg px-2 h-10">
                                <FaLocationDot className="mr-2 text-gray-400" />
                                <input type="text" required onChange={e => setReservationData({...reservationData, lieuRamassage: e.target.value})} name="lieuRamassage" placeholder="ville, adresse" className="text-white w-[100px] bg-transparent focus:outline-none cursor-text" />
                            </div>
                            <div className="cursor-pointer flex justify-between items-center px-2 rounded-lg bg-gray-800 h-10">
                                <FaLocationDot className="mr-2 text-gray-400" />
                                <input type="text" required onChange={e => setReservationData({...reservationData, lieuDepot: e.target.value})} name="lieuDepot" placeholder="ville, adresse" className="text-white w-[100px] bg-transparent focus:outline-none cursor-text" />
                            </div>
                        </div>
                    </div>
                    <div className="min-screen:w-[22%] min-screen:text-left text-center">
                        <p className="text-white mb-1 text-lg font-semibold">Période</p>
                        <Datepicker
                            startFrom={new Date().toISOString().split('T')[0]}
                            value={value}
                            onChange={handleValueChange}
                            placeholder="Période"
                            minDate={new Date().toISOString().split('T')[0]}
                            disabledDates={reservedDates}
                            separator="À"
                        />
                    </div>
                    <div className="h-fit min-screen:text-left text-center">
                        <p className="text-white mb-1 text-lg font-semibold">CNIE</p>
                        <div className="relative cursor-pointer bg-gray-800 text-white rounded-lg h-10 min-screen:w-fit w-full pl-2 flex flex-row justify-start items-center">
                            <FaRegAddressCard className="mr-2" />
                            <input 
                                required
                                type="file" 
                                name="cnie" 
                                onChange={handleFileChange} 
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" 
                                accept="image/png, image/jpeg, image/jpg, application/pdf" 
                            />
                            <span className="z-10 cursor-pointer">{cnieFileName}</span>
                        </div>
                    </div>
                    <div className="h-fit min-screen:text-left text-center">
                        <p className="text-white mb-1 text-lg font-semibold">N° Permis</p>
                        <div className="relative cursor-pointer bg-gray-800 text-white rounded-lg h-10 min-screen:w-fit w-full pl-2 flex flex-row justify-start items-center">
                            <FaCar className="mr-2" />
                            <input 
                                required
                                type="file" 
                                name="NoPermis" 
                                onChange={handleFileChange} 
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" 
                                accept="image/png, image/jpeg, image/jpg, application/pdf" 
                            />
                            <span className="z-10 cursor-pointer">{noPermisFileName}</span>
                        </div>
                    </div>
                    <div className="h-fit">
                        <p className="text-white mb-1 text-lg font-semibold min-screen:text-left text-center">Total</p>
                        <div className="bg-gray-800 text-white rounded-lg h-10 min-screen:w-fit w-full  items-center">
                            <p className="bg-gray-800 text-center pt-2 rounded-lg text-white h-10 min-screen:w-[100px] w-full">{`${nbJours * prix} MAD `}</p>
                        </div>
                    </div>
                    <div className="min-screen:mx-0 text-right mx-auto w-fit h-fit">
                        <p onClick={() => { setReserver(false) }} className="text-white mb-1 text-lg font-semibold h-7 cursor-pointer  text-center w-full"> <span className="border border-white min-screen:hidden block rounded-lg" >Annuler</span> </p>
                        <input type="submit" className="text-white h-10 bg-blue-600 text-center rounded-lg px-4 hover:bg-blue-500 cursor-pointer ease-in-out duration-300 border-white border" value="Réserver" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reservation;
