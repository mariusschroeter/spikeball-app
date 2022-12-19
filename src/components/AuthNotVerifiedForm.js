import React from "react";
import { Container } from "react-bootstrap";
import { sendEmailVerification } from "firebase/auth";

const AuthNotVerifiedForm = ({ authUser }) => {
  const reSendVerificationEmail = async () => {
    await sendEmailVerification(authUser)
      .then(() => {
        console.log("The verification email was successfully sent.");
      })
      .catch((error) => {
        console.log("Error-Code:", error.code, "Error-Message:", error.message);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      You are not verified :( <br />
      <button
        className="btn btn-primary mt-1 mb-1"
        onClick={reSendVerificationEmail}
      >
        {" "}
        Resend Verification Email
      </button>
    </Container>
  );
};

export default AuthNotVerifiedForm;
