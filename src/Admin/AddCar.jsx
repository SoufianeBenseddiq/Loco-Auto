import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddCar = ({ closeForm }) => {
    const [formData, setFormData] = useState({
        libelle_voiture: "",
        date_achat: "",
        prix_jour: 0,
        id_marque: 0,
        id_cat: 0,
        nbr_passagers: 0,
        nbr_valises: 0,
        transmission: "",
        type_carburant: "",
        chemin: null,
        description: ""
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        axios.post("http://localhost/locoauto/admin/addCar.php", formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            if (response.data.status === "success") {
                alert("Voiture ajoutée avec succès!");
                closeForm(false); // Close the form after successful submission
            } else {
                console.log(response.data);
                // alert(response.data.errormsg);
            }
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    };

    return (
        <div className="max-w-2xl container shadow-sm bg-gray-200 rounded-2xl mb-3 mx-auto p-4 relative">
            <button
                onClick={() => closeForm(false)}
                className="absolute top-0 right-0 mt-4 mr-4 text-red-500"
            >
                <FaTimes size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Ajouter une Voiture</h2>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 shadow-md rounded-lg" encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="libelle_voiture">Libellé</label>
                        <input
                            type="text"
                            id="libelle_voiture"
                            name="libelle_voiture"
                            value={formData.libelle_voiture}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_achat">Date Achat</label>
                        <input
                            type="date"
                            id="date_achat"
                            name="date_achat"
                            value={formData.date_achat}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prix_jour">Prix/Jour</label>
                        <input
                            type="number"
                            id="prix_jour"
                            name="prix_jour"
                            value={formData.prix_jour}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_marque">Marque</label>
                        <select
                            id="id_marque"
                            name="id_marque"
                            value={formData.id_marque}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value={0}>Audi</option>
                            <option value={1}>BMW</option>
                            <option value={2}>Mercedes</option>
                            <option value={3}>Subaru</option>
                            <option value={4}>Volvo</option>
                            <option value={5}>Mazda</option>
                            <option value={6}>Honda</option>
                            <option value={7}>Toyota</option>
                            <option value={8}>Volkswagen</option>
                            <option value={9}>Nissan</option>
                            <option value={10}>Ford</option>
                            <option value={11}>Renault</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_cat">Catégorie</label>
                        <select
                            id="id_cat"
                            name="id_cat"
                            value={formData.id_cat}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value={0}>SUV</option>
                            <option value={1}>Cabriolets</option>
                            <option value={2}>Breaks</option>
                            <option value={3}>Berlines</option>
                            <option value={4}>Compacts</option>
                            <option value={5}>Crossovers</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nbr_passagers">Nombre de Passagers</label>
                        <input
                            type="number"
                            id="nbr_passagers"
                            name="nbr_passagers"
                            value={formData.nbr_passagers}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nbr_valises">Nombre de Valises</label>
                        <input
                            type="number"
                            id="nbr_valises"
                            name="nbr_valises"
                            value={formData.nbr_valises}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transmission">Transmission</label>
                        <select
                            id="transmission"
                            name="transmission"
                            value={formData.transmission}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="Automatique">Automatique</option>
                            <option value="Manuelle">Manuelle</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type_carburant">Carburant</label>
                        <select
                            id="type_carburant"
                            name="type_carburant"
                            value={formData.type_carburant}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="Essence">Essence</option>
                            <option value="Gasoil">Gasoil</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chemin">Chemin de l'image</label>
                        <input
                            type="file"
                            id="chemin"
                            name="chemin"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Ajouter Voiture
                </button>
            </form>
        </div>
    );
};

export default AddCar;
