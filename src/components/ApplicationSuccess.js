// src/components/ApplicationSuccess.js

import React from "react";

const ApplicationSuccess = () => {

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", padding: "2rem" }}>
      <h2 style={{ color: "green", marginBottom: "1rem" }}>Application Submitted Successfully!</h2>
      <p>Your license application has been submitted and is currently under review. We will get back to you shortly.</p>
    </div>
  );
};

export default ApplicationSuccess;
