import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    width: '400px',
    textAlign: 'center',
    backgroundColor: '#2d2d2d',
    border: 'none',
    borderRadius: '10px',
    color: '#f1f1f1',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, onConfirm, title, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-center">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700 transition duration-300"
          onClick={onRequestClose}
        >
          Annuler
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          onClick={onConfirm}
        >
          Confirmer
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
