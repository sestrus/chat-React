import React from "react";
import "./SignIn.css";

const ErrorHandler = (props) => {
  let finalMessage = null;

  const errorMessage = (errorCode) => {
    if (errorCode === "auth/wrong-password") {
      return (finalMessage = "Wrong password!");
    }

    if (errorCode === "auth/user-not-found") {
      return (finalMessage = "User not found!");
    }
    if (errorCode === "auth/wrong-email") {
      return (finalMessage = "Wrong e-mail!");
    }

    if (errorCode === "auth/too-many-requests") {
      return (finalMessage = "Wait a moment before you send another request!");
    }
    if (errorCode === "auth/weak-password") {
      return (finalMessage = "Password is too weak!");
    }
    if (errorCode === "auth/email-already-in-use") {
      return (finalMessage = "E-mail is already registered!");
    }
    if (errorCode === "auth/invalid-email") {
      return (finalMessage = "Invalid e-mail format!");
    }
  };

  return <div className="error-message">{errorMessage(props.code)}</div>;
};

export default ErrorHandler;
