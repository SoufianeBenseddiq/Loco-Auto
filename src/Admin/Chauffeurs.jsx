import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete, MdCancel } from "react-icons/md";

const Chauffeurs = () => {
    const [chauffeurs, setChauffeurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingChauffeur, setEditingChauffeur] = useState(null);
    const [addingChauffeur, setAddingChauffeur] = useState(false);
    const [newChauffeur, setNewChauffeur] = useState({ nom: "", prenom: "", cnie: "", telephone: "" });

    useEffect(() => {
        fetchChauffeurs();
    }, []);

    const fetchChauffeurs = async () => {
        try {
            const response = await axios.get("http://localhost/locoauto/admin/listChauffeurs.php");
            if (response.data.status === "success") {
                setChauffeurs(response.data.result);
            } else {
                setError(response.data.msg);
            }
            setLoading(false);
        } catch (error) {
            setError("Error fetching chauffeurs");
            setLoading(false);
        }
    };

    const handleDelete = async (idChauff) => {
        try {
            if (window.confirm("Are you sure you want to delete this chauffeur?")) {
                await axios.post("http://localhost/locoauto/admin/deleteChauffeur.php", { idChauff });
                fetchChauffeurs(); // Reload the list after deletion
            }
        } catch (error) {
            setError("Error deleting chauffeur");
        }
    };

    const handleEdit = (chauffeur) => {
        setEditingChauffeur(chauffeur);
    };

    const handleCancelEdit = () => {
        setEditingChauffeur(null);
    };

    const handleUpdate = async () => {
        try {
            await axios.post("http://localhost/locoauto/admin/updateChauffeur.php", editingChauffeur);
            setEditingChauffeur(null);
            fetchChauffeurs(); // Reload the list after updating
        } catch (error) {
            setError("Error updating chauffeur");
        }
    };

    const handleAddChauffeur = async () => {
        try {
            await axios.post("http://localhost/locoauto/admin/addChauffeur.php", newChauffeur);
            setAddingChauffeur(false);
            setNewChauffeur({ nom: "", prenom: "", cnie: "", telephone: "" });
            fetchChauffeurs(); // Reload the list after adding
        } catch (error) {
            setError("Error adding chauffeur");
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 bg-gray-100">
            <h1 className="text-2xl font-semibold mb-4">Chauffeurs</h1>
            {!addingChauffeur && (
                <button
                    onClick={() => setAddingChauffeur(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
                >
                    Ajouter un chauffeur
                </button>
            )}
            {addingChauffeur && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out p-4 mb-4">
                    <input
                        type="text"
                        placeholder="Nom"
                        value={newChauffeur.nom}
                        onChange={(e) => setNewChauffeur({ ...newChauffeur, nom: e.target.value })}
                        className="border rounded p-2 mr-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Prenom"
                        value={newChauffeur.prenom}
                        onChange={(e) => setNewChauffeur({ ...newChauffeur, prenom: e.target.value })}
                        className="border rounded p-2 mr-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="CNIE"
                        value={newChauffeur.cnie}
                        onChange={(e) => setNewChauffeur({ ...newChauffeur, cnie: e.target.value })}
                        className="border rounded p-2 mr-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Téléphone"
                        value={newChauffeur.telephone}
                        onChange={(e) => setNewChauffeur({ ...newChauffeur, telephone: e.target.value })}
                        className="border rounded p-2 mr-2 mb-2 w-full"
                    />
                    <button
                        onClick={handleAddChauffeur}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 my-4 rounded-md mr-2"
                    >
                        Ajouter
                    </button>
                    <button
                        onClick={() => setAddingChauffeur(false)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
                    >
                        <MdCancel className="mr-2" /> Annuler
                    </button>
                </div>
            )}
            <div className="grid grid-cols-1 gap-4">
                {chauffeurs.map((chauffeur) => (
                    <div key={chauffeur.idChauff} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out p-4 flex justify-between items-center">
                        {editingChauffeur && editingChauffeur.idChauff === chauffeur.idChauff ? (
                            <>
                                <input
                                    type="text"
                                    value={editingChauffeur.nom}
                                    onChange={(e) => setEditingChauffeur({ ...editingChauffeur, nom: e.target.value })}
                                    className="border rounded p-2 mr-2"
                                />
                                <input
                                    type="text"
                                    value={editingChauffeur.prenom}
                                    onChange={(e) => setEditingChauffeur({ ...editingChauffeur, prenom: e.target.value })}
                                    className="border rounded p-2 mr-2"
                                />
                                <input
                                    type="text"
                                    value={editingChauffeur.cnie}
                                    onChange={(e) => setEditingChauffeur({ ...editingChauffeur, cnie: e.target.value })}
                                    className="border rounded p-2 mr-2"
                                />
                                <input
                                    type="text"
                                    value={editingChauffeur.telephone}
                                    onChange={(e) => setEditingChauffeur({ ...editingChauffeur, telephone: e.target.value })}
                                    className="border rounded p-2 mr-2"
                                />
                                <div className="flex space-x-2">
                                    <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                                        Enregistrer
                                    </button>
                                    <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center">
                                        <MdCancel className="mr-2" /> Annuler
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <p className="text-lg font-semibold">{chauffeur.nom} {chauffeur.prenom}</p>
                                    <p className="text-sm text-gray-600">CNIE: {chauffeur.cnie}</p>
                                    <p className="text-sm text-gray-600">Téléphone: {chauffeur.telephone}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit(chauffeur)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2  rounded-md flex items-center">
                                        <MdEdit className="mr-2" /> Modifier
                                    </button>
                                    <button onClick={() => handleDelete(chauffeur.idChauff)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center">
                                        <MdDelete className="mr-2" /> Supprimer
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chauffeurs;
