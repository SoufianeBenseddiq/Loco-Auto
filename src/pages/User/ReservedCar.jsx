import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const ReservedCar = ({ idRes, userId }) => {
    const [msg, setMsg] = useState("");
    const [carData, setCarData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/locoauto/reservedCar.php?idRes=${idRes}&userId=${userId}`);
                setCarData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
    }, [idRes, userId]);

    const annulerReservation = () => {
        if (window.confirm("Valider l'annulation de la réservation ?")) {
            axios.get(`http://localhost/locoauto/annulerReservation.php?idRes=${idRes}`).then(
                (response) => {
                    setMsg(response.data);
                    window.location.reload();
                }
            );
        }
    };

    const generatePDF = () => {
        if (!carData) return;

        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(18);
        doc.setFont("Helvetica", "bold");
        doc.text("Contrat de Location", 105, 20, null, null, "center");

        // Agency Details
        doc.setFontSize(12);
        doc.setFont("Helvetica", "normal");
        doc.text("LocoAuto", 105, 30, null, null, "center");
        doc.text("Mhammid 9 Marrakech", 105, 35, null, null, "center");
        doc.text("Telephone : 06 99 01 65 17 / 06 84 71 16 37", 105, 40, null, null, "center");

        // Line Separator
        doc.setLineWidth(0.5);
        doc.line(15, 45, 195, 45);

        // Car Details
        doc.setFontSize(14);
        doc.setFont("Helvetica", "normal");
        let y = 55;
        Object.entries(carData).forEach(([key, value]) => {
            if (key === "NoPermis" || key === "NoCNIE" || key === "expired" || key === "chemin") return; // Skip NoPermis and NoCNIE and chemin
            doc.text(`${capitalizeFirstLetter(key)}: ${value}`, 20, y);
            y += 10;
        });

        // Montant Total
        doc.setFont("Helvetica", "bold");
        doc.text(`Montant Total: ${carData.montantTotal} MAD`, 20, y + 10);
    
        // Signature fields
        doc.setFont("Helvetica", "normal");
        doc.text("Signature du locataire:", 20, y + 30);
        doc.text("_______________________________", 70, y + 30);
    
        doc.text("Signature de l'agence:", 20, y + 40);
        doc.text("_______________________________", 70, y + 40);

        // Save the PDF
        doc.save("contrat-de-location.pdf");
    };

    const getFileName = (path) => {
        return path.substring(path.lastIndexOf("/") + 1);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    if (!carData) return null;

    return (
        <>
            <p>{msg}</p>
            <div className="bg-white w-full flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
                <img
                    src={`http://localhost/locoauto/carsimages/${carData.chemin}`}
                    alt={carData.libelle}
                    className="w-full md:w-1/3 object-cover"
                />
                <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-2">{carData.libelle}</h2>
                        <p className="text-gray-600 mb-2"><span className="text-green-500 font-medium">Categorie :</span> {carData.categorie}</p>
                        <p className="text-gray-600 mb-2"><span className="text-green-500 font-medium">Prix par jour :</span> {carData.prixJour} MAD</p>
                        <p className="text-gray-600 mb-2"><span className="text-green-500 font-medium">Départ :</span> {carData.depart}, Le {carData.dateDebut}</p>
                        <p className="text-gray-600 mb-2"><span className="text-green-500 font-medium">Arrivée :</span> {carData.arrive}, Le {carData.dateFin}</p>
                        <p className="text-gray-600 font-normal"><span className="text-green-500 font-medium">Montant Total :</span> {carData.montantTotal} MAD</p>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={generatePDF} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex-1">
                            Obtenir un reçu
                        </button>
                        <button onClick={annulerReservation} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex-1">
                            Annuler la réservation
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReservedCar;
