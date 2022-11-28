import React, { useState } from "react";
import "./Modal.css";

const Modal = (props) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className="modal-switch">
        <p className="forgot-password" onClick={toggleModal}>
          Forgot Password?
        </p>
      </div>

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div classnmae="modal-content">
              <button className="close" onClick={() => setModal(false)}>
                X
              </button>
              <h2>Reset your password</h2>
              <p>Enter your E-mail:</p>
              <input
                type="email"
                onChange={(e) => props.email(e.target.value)}
              />
              <button type="submit" onClick={props.reset}>
                Submit!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
