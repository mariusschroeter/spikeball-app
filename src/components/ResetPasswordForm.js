import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { auth } from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPasswordForm = () => {
  const [loginEmail, setLoginEmail] = useState("");

  const passwordResetEmail = async () => {
    sendPasswordResetEmail(auth, loginEmail)
      .then(() => {
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Container>
      <p>Type in your email to reset your password. </p>
      <input
        className="mt-1 mb-1"
        placeholder="Email..."
        onChange={(event) => {
          setLoginEmail(event.target.value);
        }}
      />
      <button
        className="btn btn-primary mt-1 mb-1"
        onClick={passwordResetEmail}
      >
        Reset Password Mail
      </button>
    </Container>
  );
};

export default ResetPasswordForm;
