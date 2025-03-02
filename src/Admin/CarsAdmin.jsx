import axios from "axios";
import React, { useEffect, useState } from "react";
import ModifyCar from "./ModifyCar";
import AddCar from "./AddCar";

const CarsAdmin = () => {
    const [marque, setMarque] = useState(0);
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null);
    const [addCar, setAddCar] = useState(false);

    useEffect(() => {
        if (!editingCar) {
            document.body.style.overflowY = "scroll";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }, [editingCar]);

    useEffect(() => {
        fetchData(0);
    }, []);

    const fetchData = (m) => {
        axios.get(`http://localhost/locoauto/admin/selectedMarque.php?marque=${m}`).then(
            (response) => {
                if (response.data.status === "success") {
                    setCars(response.data.result);
                } else {
                    alert(response.data.errormsg);
                }
            }
        ).catch((error) => {
            console.error("There was an error!", error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(marque);
    };

    const handleMarqueChange = (e) => {
        setMarque(e.target.value);
    };

    const handleDelete = (id_voiture) => {
        if (window.confirm("Voulez vous supprimer la voiture ? (Elle sera restauree)")) {
            axios.delete(`http://localhost/locoauto/admin/carDisponibility.php?id_voiture=${id_voiture}`).then(
                (response) => {
                    fetchData(marque);
                }
            ).catch((error) => {
                alert("There was an error!", error);
            });
        }
    };

    const handleModify = (car) => {
        setEditingCar(car);
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 mt-4 shadow-lg rounded-lg max-w-lg mx-auto flex items-center justify-between space-x-4">
                <label htmlFor="marque" className="text-gray-700 text-sm font-bold">
                    Marque :
                </label>
                <select
                    name="marque"
                    id="marque"
                    className="bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleMarqueChange}
                    value={marque}
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
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Rechercher
                </button>
            </form>


            {!addCar && (<h1 onClick={() => setAddCar(true)} className="mx-auto font-semibold text-green-500 text-xl mb-4 underline cursor-pointer w-fit">
                Ajouter une voiture
            </h1>)}
            {addCar && (
                <AddCar closeForm={() => setAddCar(false)} />
            )}

            {cars.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border-b">Image</th>
                                <th className="py-2 px-4 border-b">Libellé</th>
                                <th className="py-2 px-4 border-b">Date Achat</th>
                                <th className="py-2 px-4 border-b">Prix/Jour</th>
                                <th className="py-2 px-4 border-b">Marque</th>
                                <th className="py-2 px-4 border-b">Catégorie</th>
                                <th className="py-2 px-4 border-b">Passagers</th>
                                <th className="py-2 px-4 border-b">Valises</th>
                                <th className="py-2 px-4 border-b">Transmission</th>
                                <th className="py-2 px-4 border-b">Carburant</th>
                                <th className="py-2 px-4 border-b">Modifier</th>
                                <th className="py-2 px-4 border-b">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td
                                        onClick={() => window.open(`http://localhost/locoauto/carsimages/${car.chemin}?t=${new Date().getTime()}`, '_blank')}
                                        className="cursor-pointer border-b"
                                    >
                                        <img src={`http://localhost/locoauto/carsimages/${car.chemin}?t=${new Date().getTime()}`} alt={car.libelle_voiture} className="w-24 h-auto" />
                                    </td>
                                    <td className="py-2 px-4 border-b">{car.libelle_voiture}</td>
                                    <td className="py-2 px-4 border-b">{car.date_achat}</td>
                                    <td className="py-2 px-4 border-b">{car.prix_jour}</td>
                                    <td className="py-2 px-4 border-b">{car.libelle_marque}</td>
                                    <td className="py-2 px-4 border-b">{car.libelle_cat}</td>
                                    <td className="py-2 px-4 border-b">{car.nbr_passagers}</td>
                                    <td className="py-2 px-4 border-b">{car.nbr_valises}</td>
                                    <td className="py-2 px-4 border-b">{car.transmission}</td>
                                    <td className="py-2 px-4 border-b">{car.type_carburant}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() => handleModify(car)}
                                        >
                                            Modifier
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() => handleDelete(car.id_voiture)}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editingCar && (
                <ModifyCar editingCar={editingCar} setEditingCar={setEditingCar} marque={marque} fetchData={fetchData} />
            )}
        </div>
    );
};

export default CarsAdmin;
