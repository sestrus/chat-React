import firebase from "firebase/compat/app";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

const ChatRoom = (props) => {
  const messagesRef = props.firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const SignOut = () => {
    return (
      props.auth.currentUser && (
        <button onClick={() => props.auth.signOut()}>Sign Out</button>
      )
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = props.auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
  };

  return (
    <div>
      <div>
        Welcome
        <SignOut />
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} auth={props.auth} />
          ))}
      </div>
      <form>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );
};
export default ChatRoom;
