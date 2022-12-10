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
import "./SignIn.css";
import ErrorHandler from "./ErrorHandler";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [resetFun, setResetFun] = useState(false);
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
        setErrorInfo(errorCode);
        console.log(errorCode);
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
        setErrorInfo(errorCode);
        console.log(errorCode);
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
        alert(errorMessage);
        setErrorInfo(errorCode);
        setResetFun(true);
        console.log(resetFun);
        console.log(errorCode);
      });
  };

  return (
    <div>
      <div className="login-container">
        <label>Welcome to Burdzy-Chat!</label>
        <input
          placeholder="E-mail"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          placeholder="Password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <ErrorHandler code={errorInfo} />
        <div className="d-grid gap-2">
          <button type="submit" onClick={signInWithEmail}>
            Sign in with e-mail
          </button>
          <button type="submit" onClick={signUpWithEmail}>
            Sign Up with e-mail
          </button>
          <button type="submit" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          <div className="forgot-password-div">
            <p
              className="forgot-password-paragraph"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Forgot password?
            </p>
          </div>

          <Modal
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            email={setEmail}
            code={errorInfo}
            reset={resetPassword}
          ></Modal>
        </div>
        {/* {show ? (
          <Modal reset={resetPassword} email={setEmail} />
        ) : (
          <p
            onClick={() => {
              setShow(!show);
            }}
          >
            show modal
          </p>
        )} */}
      </div>
    </div>
  );
};

export default SignIn;
