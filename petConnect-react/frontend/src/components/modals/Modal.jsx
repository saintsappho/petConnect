import React from 'react';

// Modal component
const Modal = ({ openModal, closeModal, content }) => {

  return (
    <div className="profile-modal">
      <button className="profile-modal__close-button" placeholder="X" onClick={closeModal}></button>
      <div className="content-container">
        {content}
      </div>
    </div>
  );
};

export default Modal;