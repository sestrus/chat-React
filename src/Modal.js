import React, { useState } from "react";

const Modal = (props) => {
  if (!props.open) {
    return null;
  }

  return (
    // <div>
    //   <div className="modal">
    //     <div classnmae="modal-content">
    //       <div className="modal-header">
    //         Enter Your E-mail
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <div className="modal-body">
    //         <input type="email" onChange={(e) => props.email(e.target.value)} />
    //         <button type="submit" onClick={props.reset}>
    //           Submit!
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="modal-window">
        <div className="modal-content">
          <div classnmae="modal-content"></div>
          <div className="modal-header">
            Enter Your E-mail
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={props.onClose}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="email"
              className="reset-email"
              placeholder="E-mail"
              onChange={(e) => props.email(e.target.value)}
            />
            <button type="submit" onClick={props.reset}>
              Submit!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
