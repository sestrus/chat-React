import firebase from "firebase/compat/app";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import ChatRoom from "./ChatRoom";
import SignIn from "./SignIn";
import "./Modal.css";

firebase.initializeApp({
  apiKey: "AIzaSyDyydIuIX2t27HFhz2l8xVi7hHXDm-TvPQ",
  authDomain: "chat-burdzy-project.firebaseapp.com",
  projectId: "chat-burdzy-project",
  storageBucket: "chat-burdzy-project.appspot.com",
  messagingSenderId: "649674911832",
  appId: "1:649674911832:web:42c177262cca0d57649a2d",
  measurementId: "G-97BTJM7E4T",
});

const App = () => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header"></header>

      <section>
        {user ? (
          <ChatRoom auth={auth} firestore={firestore} />
        ) : (
          <SignIn auth={auth} firestore={firestore} />
        )}
      </section>
    </div>
  );
};

export default App;
