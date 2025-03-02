import axios from "axios";
import React, { useState } from "react";

const ModifyCar = ({ editingCar, setEditingCar, marque, fetchData }) => {
    const [file, setFile] = useState(null);

    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id_voiture', editingCar.id_voiture);
        formData.append('libelle_voiture', editingCar.libelle_voiture);
        formData.append('date_achat', editingCar.date_achat);
        formData.append('prix_jour', editingCar.prix_jour);
        formData.append('id_marque', editingCar.id_marque);
        formData.append('id_cat', editingCar.id_cat);
        formData.append('description', editingCar.description);
        formData.append('nbr_passagers', editingCar.nbr_passagers);
        formData.append('nbr_valises', editingCar.nbr_valises);
        formData.append('transmission', editingCar.transmission);
        formData.append('type_carburant', editingCar.type_carburant);
        formData.append('oldImg', editingCar.chemin);

        if (file) {
            formData.append('chemin', file);
        }

        axios.post(`http://localhost/locoauto/admin/updateCar.php`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.data.status === "success") {
                alert(response.data.result);
                fetchData(marque);
                setEditingCar(null);
                // window.location.reload();
            } else {
                alert(response.data.errormsg);
            }
        }).catch(error => {
            console.error("There was an error!", error);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingCar({
            ...editingCar,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl">
                <h2 className="text-xl font-bold mb-0 text-center">Modifier la voiture</h2>
                <div className="grid grid-cols-2 gap-1">
                    <div className="col-span-2 mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="libelle_voiture">Libellé :</label>
                        <input
                            type="text"
                            name="libelle_voiture"
                            id="libelle_voiture"
                            value={editingCar.libelle_voiture}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        />
                    </div>
                    <div className="col-span-2 mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="date_achat">Date d'achat :</label>
                        <input
                            type="date"
                            name="date_achat"
                            id="date_achat"
                            value={editingCar.date_achat}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="prix_jour">Prix par jour :</label>
                        <input
                            type="number"
                            name="prix_jour"
                            id="prix_jour"
                            value={editingCar.prix_jour}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="id_marque">Marque :</label>
                        <select
                            name="id_marque"
                            id="id_marque"
                            value={editingCar.id_marque}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
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
                    <div className="mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="id_cat">Catégorie :</label>
                        <select
                            name="id_cat"
                            id="id_cat"
                            value={editingCar.id_cat}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        >
                            <option value={0}>SUV</option>
                            <option value={1}>Cabriolets</option>
                            <option value={2}>Breaks</option>
                            <option value={3}>Berlines</option>
                            <option value={4}>Compacts</option>
                            <option value={5}>Crossovers</option>
                        </select>
                    </div>
                    <div className="mb-0 col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="chemin">Image :</label>
                        <input
                            type="file"
                            name="chemin"
                            id="chemin"
                            onChange={handleFileChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        />
                    </div>
                    <div className="col-span-2 mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="description">Description :</label>
                        <textarea
                            name="description"
                            id="description"
                            value={editingCar.description}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="nbr_passagers">Nombre de passagers :</label>
                        <input
                            type="number"
                            name="nbr_passagers"
                            id="nbr_passagers"
                            value={editingCar.nbr_passagers}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="nbr_valises">Nombre de valises :</label>
                        <input
                            type="number"
                            name="nbr_valises"
                            id="nbr_valises"
                            value={editingCar.nbr_valises}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="transmission">Transmission :</label>
                        <select
                            name="transmission"
                            id="transmission"
                            value={editingCar.transmission}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        >
                            <option value="Automatique">Automatique</option>
                            <option value="Manuelle">Manuelle</option>
                        </select>
                    </div>
                    <div className="mb-0 col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-0" htmlFor="type_carburant">Type de carburant :</label>
                        <select
                            name="type_carburant"
                            id="type_carburant"
                            value={editingCar.type_carburant}
                            onChange={handleInputChange}
                            className="bg-gray-200 border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                        >
                            <option value="Essence">Essence</option>
                            <option value="Gazoil">Gazoil</option>
                        </select>
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Enregistrer
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setEditingCar(null)}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ModifyCar;
