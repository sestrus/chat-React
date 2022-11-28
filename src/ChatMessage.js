import firebase from "firebase/compat/app";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ChatMessage = (props) => {
  const { text, uid } = props.message;

  const messageClass = uid === props.auth.currentUser.uid ? "sent" : "received";

  console.log(text);
  return <p>{text}</p>;
};

export default ChatMessage;
