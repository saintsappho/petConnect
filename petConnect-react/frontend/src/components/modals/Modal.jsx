import React from 'react';
import Backdrop from './Backdrop';

// Modal component
const Modal = ({ openModal, closeModal, content }) => {

  return (
    <>
      <Backdrop closeModal={closeModal} />
      <div className="modal">
        <div className="modalHeader"><h2>Profile</h2></div>
        <div className="modalBody">
        {content}
        </div>
        <div className="closeBtn">
          <span>&times;</span>
        </div>
      </div>
    </>
  );
};

export default Modal;