import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Navbar";
import ReservedCar from "./ReservedCar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomModal from "../../layout/CustomModal";

const UserReservations = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(true);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [ids, setIds] = useState([]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  useEffect(() => {
    const token = getCookie("token");
    if (token === null) {
      setIsModalOpen(true); // Open the modal if no token
    } else {
      setToken(token);
      setSession(true);
      const searchByToken = token;
      axios.get(`http://localhost/locoauto/userReservations.php?token=${searchByToken}`).then(
        (response) => {
          setIds(response.data.ids);
          setUserId(response.data.userId);
        }
      );
    }
  }, [navigate]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="mt-4 max-w-[1100px] mx-auto px-4 pb-10">
        {session ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">Vos Réservations</h1>
            <div className="grid grid-cols-1 gap-5">
              {ids.map((idRes) => (<ReservedCar key={idRes} idRes={idRes} userId={userId} />))}
            </div>
          </div>
        ) : (
          <h1 className="text-3xl font-extrabold text-red-500">Vous devez vous identifier</h1>
        )}
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title="Confirmation"
        message="Veuillez vous connecter!"
      />
    </div>
  );
};

export default UserReservations;
