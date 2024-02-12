import React from "react";

// Modal component
function Modal({ closeModal, content }) {

  return (
    <>
      <div className="modal">
        <div className="closeModalButton" onClick={closeModal}>
          <span>&times;</span>
        </div>
        <div className="modalHeader"><h2>Profile</h2></div>
        <div className="modalBody">
          {content}
        </div>

      </div>
    </>
  );
}

export default Modal;
