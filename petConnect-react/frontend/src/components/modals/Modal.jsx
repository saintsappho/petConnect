import React from 'react';


const Modal = ({ openModal, closeModal, content }) => {

  return (
    <div className="profile-modal">
      <button className="profile-modal__close-button" placeholder="X" onClick={closeModal}></button>
      {content}
    </div>
  );
};

export default Modal;