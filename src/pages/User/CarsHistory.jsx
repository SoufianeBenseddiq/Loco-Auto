import React, { useState, useEffect } from "react";
import axios from "axios";

const CarsHistory = ({ idRes }) => {
    const [carData, setCarData] = useState({
        chemin: "",
        libelle: "",
        categorie: "",
        prixJour: "",
        dateDebut: "",
        dateFin: "",
        montantTotal: null,
        expired: false,
        depart: '',
        arrive: ''
    });

    useEffect(() => {
        axios.get(`http://localhost/locoauto/carsHistory.php?idRes=${idRes}`).then(
            (response) => {
                setCarData(response.data);
            }
        );
    }, [idRes]);

    return (
        <div className="bg-white min-screen:w-[100%] w-full flex min-screen:flex-row flex-col shadow-2xl items-center p-2 ">
            <img
                src={`http://localhost/locoauto/carsimages/${carData.chemin}`}
                alt={carData.libelle}
                className="min-screen:h-52 object-cover mr-2"
            />
            <div className="flex min-screen:flex-row flex-col w-full justify-between h-full">
                <div className="flex flex-col justify-between h-full">
                    <h2 className="text-xl font-bold mb-2">{carData.libelle}</h2>
                    <p className="text-gray-600 mb-[-2px] font-normal"> <span className="text-green-500 font-medium">Categorie : </span>{carData.categorie} </p>
                    <p className="text-gray-600 mb-[-2px] font-normal"> <span className="text-green-500 font-medium">Prix par jour : </span> {carData.prixJour} MAD </p>
                    <p className="text-gray-600 mb-[-2px] font-normal"> <span className="text-green-500 font-medium">Départ : </span> {carData.depart}, Le {carData.dateDebut}</p>
                    <p className="text-gray-600 mb-[-2px] font-normal"> <span className="text-green-500 font-medium">Arrivée : </span> {carData.arrive}, Le {carData.dateFin} </p>
                    <p className="text-gray-600 font-normal"> <span className="text-green-500 font-medium">Montant Total : </span> {carData.montantTotal} MAD </p>
                </div>
                <div className={` ${carData.expired ? 'bg-red-600' : 'bg-green-600'} text-white h-fit px-2 rounded-lg`}>
                    {carData.expired ? "Expirée" : "Réservée"}
                </div>
            </div>
        </div>
    );
};

export default CarsHistory;
