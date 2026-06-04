// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplyCertificate from './pages/ApplyCertificate';
import ApplicationConfirmation from './pages/ApplicationConfirmation';
import PartnersRegistration from './pages/PartnersRegistration'; 
import ApplyLicense from './pages/ApplyLicense';
import ApplicationSuccess from "./components/ApplicationSuccess";
import ApplyClearance from './pages/ApplyClearance';
import ApplyClearanceSuccess from './components/ApplyClearanceSuccess';
import ApplyBusinessCertificate from './pages/ApplyBusinessCertificate';
import BusinessCertificateSuccess from './components/BusinessCertificateSuccess';
import CertificatePayment from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/apply-certificate" element={<ApplyCertificate />} />
        <Route path="/application-confirmation" element={<ApplicationConfirmation />} />
        <Route path="/partners-registration" element={<PartnersRegistration />} /> {/* <-- new route */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* <-- new route */}
        <Route path="/apply-license" element={<ApplyLicense />} />
        <Route path="/application-success" element={<ApplicationSuccess />} />
        <Route path="/apply-clearance" element={<ApplyClearance />} />
        <Route path="/apply-clearance-success" element={<ApplyClearanceSuccess />} />
        <Route path="/apply-business-certificate" element={<ApplyBusinessCertificate />} />
        <Route path="/business-certificate-success" element={<BusinessCertificateSuccess />} />
        <Route path="/certificate-payment" element={<CertificatePayment />} />
      </Routes>
    </Router>
  );
}

export default App;
