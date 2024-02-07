import React from 'react';
import Backdrop from './Backdrop';

// Modal component
const Modal = ({ openModal, closeModal, content }) => {

  return (
    <>
     <Backdrop closeModal={closeModal} />  {/*this code block looks disgusting lmao */}
      <div className="modal">
        <div className="closeBtn">
          <span id="closeBtnSpan">&times;</span>
        </div>
        <div className="modalHeader"><h2>Profile</h2></div>
        <div className="modalBody">
          {content}
        </div>

      </div>
    </>
  );
};

export default Modal;