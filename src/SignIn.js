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
import Modal from "./Modal";
import "./Modal.css";
import logo from "./chatlogo2.png";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  };

  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(props.auth, email, password)
      .then((userCredential) => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        const user = userCredential.user;
        console.log(user);
        alert("Successfully created an account");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ...
      });
  };

  const signInWithEmail = () => {
    signInWithEmailAndPassword(props.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const resetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset e-mail sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="sign-in">
      <img alt="logo" src={logo} />
      <input
        type="text"
        onChange={(event) => setEmail(event.target.value)}
      ></input>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      ></input>
      <button onClick={signInWithEmail}>Sign in with e-mail</button>
      <button onClick={signUpWithEmail}>Sign Up with e-mail</button>
      <button onClick={signInWithGoogle}> Sign in with Google</button>

      <Modal reset={resetPassword} email={setEmail} />
    </div>
  );
};

export default SignIn;
