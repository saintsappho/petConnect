import React from 'react';
import Backdrop from './Backdrop';

// Modal component
function Modal({closeModal, content}) {
  
  return (
    <>
      <Backdrop closeModal={closeModal} />    
      <div className="modal">
        <div className="closeModalButton">
          <span>&times;</span>
        </div>

        <div className="modalHeader">
          <h2>Profile</h2>
          </div>

        <div className="modalBody">
          {content}
        </div>

      </div>
    </>
  );
}

export default Modal;

