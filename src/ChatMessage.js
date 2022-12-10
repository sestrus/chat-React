import React, { useState } from "react";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "./SignIn.css";

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === props.auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`chatroom-message ${messageClass}`}>
      <div className="chatroom-photo">
        <img
          alt="profile-photo"
          style={{ maxWidth: "30px" }}
          src={
            photoURL ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
        />
      </div>
      <p className="chatroom-message-content">{text}</p>
    </div>
  );
};

export default ChatMessage;
