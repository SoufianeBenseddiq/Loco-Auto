import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarAdmin = ({ operation, setOperation }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    function deleteCookie(name) {
        document.cookie = `${name}=; Max-Age=-99999999;`;
    }

    const handleLogOut = () => {
        deleteCookie('token');
        navigate("/");
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="w-full bg-gray-800 text-white">
            <div className="container mx-auto flex justify-between items-center py-4 px-2">
                <a href="/HomeAdmin" className="text-3xl font-semibold hover:underline">
                    LocoAuto
                </a>
                <div className="hidden md:flex space-x-6 items-center">
                    <p className="hover:underline cursor-pointer" onClick={() => setOperation(1)}>
                        Voitures
                    </p>
                    <p className="hover:underline cursor-pointer" onClick={() => setOperation(2)}>
                        Reservations
                    </p>
                    <p className="hover:underline cursor-pointer" onClick={() => setOperation(3)}>
                        Chauffeurs
                    </p>
                    <button 
                        onClick={handleLogOut}
                        className="bg-yellow-500 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                    >
                        Se deconnecter
                    </button>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-2xl focus:outline-none">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <a href="/HomeAdmin" className="block py-2 px-4 hover:underline">
                        Dashboard
                    </a>
                    <a href="/ManageCars" className="block py-2 px-4 hover:underline">
                        Manage Cars
                    </a>
                    <a href="/Reservations" className="block py-2 px-4 hover:underline">
                        Reservations
                    </a>
                    <button 
                        onClick={handleLogOut}
                        className="block w-full text-left py-2 px-4 bg-yellow-500 text-gray-800 font-semibold hover:bg-yellow-600 transition duration-300"
                    >
                        Se deconnecter
                    </button>
                </div>
            )}
        </div>
    );
}

export default NavbarAdmin;
