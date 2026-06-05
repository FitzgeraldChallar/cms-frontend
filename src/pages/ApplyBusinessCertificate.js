import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
import API_URL from "../config";


const ApplyBusinessCertificate = () => { 
  const [formData, setFormData] = useState({
    partner: '', 
    address: '',
    tin_number: '',
    contact_number: '',
    email: '',
    type_of_business: '',
    other_business_type: '',
    name_of_business_owner: '',
    address_of_business_owner: '',
    contact_no_of_business_owner: '',
    email_of_business_owner: '',
    name_of_staff_1: '',
    nationality_of_staff_1: '',
    position_of_staff_1: '',
    education_experience_of_staff_1: '',
    name_of_staff_2: '',
    nationality_of_staff_2: '',
    position_of_staff_2: '',
    education_experience_of_staff_2: '',
    name_of_staff_3: '',
    nationality_of_staff_3: '',
    position_of_staff_3: '',
    education_experience_of_staff_3: '',
    attestation: false,
  });

  const [files, setFiles] = useState({
    cv_of_staff_1: null,
    cv_of_staff_2: null,
    cv_of_staff_3: null,
    business_registration_document: null,
    article_of_incorporation: null,
    tax_clearance: null,
    sanitation_waste_plan: null,
    letter_of_application: null,
  });

  const [loading, setLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentReference, setPaymentReference] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: fileList[0],
    }));
  };

  const handleClearFile = (name) => {
    setFiles((prev) => ({
      ...prev,
      [name]: null,
    }));

    const input = document.querySelector(`input[name="${name}"]`);
    if (input) input.value = "";
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
  const paymentStatus = searchParams.get('payment');
  const paymentRef = searchParams.get('ref');

  if (paymentStatus === 'success' && paymentRef) {
    setPaymentCompleted(true);
    setPaymentReference(paymentRef);
    }
  }, [searchParams]);

  const handleInitPayment = async () => {
  try {
    const response = await axios.post(
       `${API_URL}/api/payments/initialize/`,
      {
        service_type_code: "BUS_001",
        application_model: "BusinessCertificateApplication",
        application_id: 0, // explained below
      }
    );

    const { reference, amount } = response.data;

    setPaymentReference(reference);

    // redirect to payment page with details
    navigate(
      `/certificate-payment?ref=${reference}&amount=${amount}`
    );

  } catch (error) {
    console.error("Payment initialization failed", error);
    alert("Unable to initialize payment. Please try again.");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    Object.entries(files).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    if (paymentReference) {
       data.append("payment_reference", paymentReference);
    }

    try {
      await axios.post(`${API_URL}/api/business-certificate-applications/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate("/business-certificate-success");
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Submission failed. Please check the form and try again.');
    } finally {
      setLoading(false);
    }
  };

  const businessTypes = [
    'Water Processing Company', 'Eatery/Restaurant', 'Food Processing Plants', 'Chemical Store',
    'Vector Control Institution', 'Health Care Waste Handling Company', 'Occupational Health and Safety Institution',
    'Banks and other financial Institutions', 'Health Care Institutions', 'Cinema/Video Club', 'Factory/Concession Area',
    'Shop', 'Store', 'Supermarket', 'Hotel', 'Motel', 'Guest House', 'University/College', 'Cold Storage', 'Other',
  ];

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '30px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, Tahoma, sans-serif',
  };

  const noticeContainerStyle = {
    backgroundColor: '#2980b9',
    border: '1px solid #f0c36d',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '30px',
  };

  const noticeTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#d3d3d3',
    marginBottom: '10px',
  };

  const noticeTextStyle = {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#ffffff',
  };

  const requiredNoteStyle = {
    fontSize: '14px',
    marginTop: '15px',
  };

  const sectionStyle = {
    marginBottom: '25px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
  };

  const legendStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '18px',
    color: '#34495e',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    boxSizing: 'border-box',
  };

  const formGroupStyle = {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column'
  };


  const labelStyle = {
    marginTop: '16px',
    fontWeight: '500',
    color: '#2c3e50',
  };

  const submitButtonStyle = {
    padding: '14px',
    backgroundColor: '#2980b9',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
  };
  

  return (
    <div style={{ backgroundColor: "#2980b9", minHeight: "100vh", padding: "20px" }}>

      <div style={containerStyle}>
        {/* Logo Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <img
            src="wash_liberia_200px.png"
            alt="Left Logo"
            style={{ height: '80px' }}
          />

          {/* Titles in the middle */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', color: '#2c3e50', margin: 0 }}>
              National Water, Sanitation & Hygiene Commission
            </h2>

          </div>

          <img
            src="nwashc_logo.png"
            alt="Right Logo"
            style={{ height: '80px' }}
          />
        </div>
        <h3 style={{ textAlign: 'center' }}>
          Pre-Qualification Form |<span style={{ color: 'red', fontWeight: 'bold' }}> WASH BUSINESS CERTIFICATE</span>
        </h3>
        {loading && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            fontSize: '22px',
            color: '#2980b9',
            fontWeight: 'bold'
          }}>
            Submitting your application...
          </div>
        )}
        {/* Instruction Notice */}
        <div style={noticeContainerStyle}>
          <p style={noticeTitleStyle}>Important Notice</p>
          <p style={noticeTextStyle}>
            This form is meant only for <strong>Businesses involved in WASH activities</strong> and want to obtain a WASH certificate. Please ensure that you meet all document requirements by providing the required documents in the <strong>Supporting Documents</strong> section. You are only advised to upload a <strong>Letter of Application</strong> if it is your first time applying for a WASH certificate.
            <br /><br />
            For any other information regarding the application process, contact the <strong>NWASHC Compliance Department</strong> via phone, email, or in-person.
          </p>
          <p style={requiredNoteStyle}>
            <em style={{ color: 'black' }}>
              All fields with asterisks (*) are required fields. Your form won't submit if they're not properly answered.
            </em>
          </p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <fieldset style={sectionStyle}>
            <legend style={legendStyle}>General Information</legend>
            <div style={formGroupStyle}>
              <input
                name="partner"
                id="partner"
                value={formData.partner}
                onChange={handleChange}
                placeholder="Entity Name*"
                required
                style={inputStyle}
              />
            </div>
            <textarea name="address" placeholder="Address*" value={formData.address} onChange={handleChange} style={inputStyle} required />
            <input name="tin_number" placeholder="TIN Number*" value={formData.tin_number} onChange={handleChange} style={inputStyle} required />
            <input name="contact_number" placeholder="Contact Number*" value={formData.contact_number} onChange={handleChange} style={inputStyle} required />
            <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} style={inputStyle} required />
            <select name="type_of_business" value={formData.type_of_business} onChange={handleChange} style={inputStyle} required>
              <option value="">Select Business Type*</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {formData.type_of_business === 'Other' && (
              <input name="other_business_type" placeholder="Please specify" value={formData.other_business_type} onChange={handleChange} style={inputStyle} />
            )}
            <input name="name_of_business_owner" placeholder="Name of Business Owner*" value={formData.name_of_business_owner} onChange={handleChange} style={inputStyle} required />
            <textarea name="address_of_business_owner" placeholder="Address of Business Owner*" value={formData.address_of_business_owner} onChange={handleChange} style={inputStyle} required />
            <input name="contact_no_of_business_owner" placeholder="Contact No. of Business Owner*" value={formData.contact_no_of_business_owner} onChange={handleChange} style={inputStyle} required />
            <input type="email" name="email_of_business_owner" placeholder="Email of Business Owner*" value={formData.email_of_business_owner} onChange={handleChange} style={inputStyle} required />
          </fieldset>

          <fieldset style={sectionStyle}>
            <legend style={legendStyle}>Technical Staff</legend>
            <input name="name_of_staff_1" placeholder="Name of Staff 1*" value={formData.name_of_staff_1} onChange={handleChange} style={inputStyle} required />
            <input name="nationality_of_staff_1" placeholder="Nationality of Staff 1*" value={formData.nationality_of_staff_1} onChange={handleChange} style={inputStyle} required />
            <input name="position_of_staff_1" placeholder="Position of Staff 1*" value={formData.position_of_staff_1} onChange={handleChange} style={inputStyle} required />
            <textarea name="education_experience_of_staff_1" placeholder="Education/Experience of Staff 1*" value={formData.education_experience_of_staff_1} onChange={handleChange} style={inputStyle} required />
            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Upload CV for Staff 1*</label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="file"
                  name="cv_of_staff_1"
                  onChange={handleFileChange}
                  style={inputStyle}
                  required
                />
                {files.cv_of_staff_1 && (
                  <button
                    type="button"
                    onClick={() => handleClearFile("cv_of_staff_1")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#d9534f",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <input name="name_of_staff_2" placeholder="Name of Staff 2" value={formData.name_of_staff_2} onChange={handleChange} style={inputStyle} />
            <input name="nationality_of_staff_2" placeholder="Nationality of Staff 2" value={formData.nationality_of_staff_2} onChange={handleChange} style={inputStyle} />
            <input name="position_of_staff_2" placeholder="Position of Staff 2" value={formData.position_of_staff_2} onChange={handleChange} style={inputStyle} />
            <textarea name="education_experience_of_staff_2" placeholder="Education/Experience of Staff 2" value={formData.education_experience_of_staff_2} onChange={handleChange} style={inputStyle} />
            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Upload CV for Staff 2</label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="file"
                  name="cv_of_staff_2"
                  onChange={handleFileChange}
                  style={inputStyle}
                />
                {files.cv_of_staff_2 && (
                  <button
                    type="button"
                    onClick={() => handleClearFile("cv_of_staff_2")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#d9534f",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <input name="name_of_staff_3" placeholder="Name of Staff 3" value={formData.name_of_staff_3} onChange={handleChange} style={inputStyle} />
            <input name="nationality_of_staff_3" placeholder="Nationality of Staff 3" value={formData.nationality_of_staff_3} onChange={handleChange} style={inputStyle} />
            <input name="position_of_staff_3" placeholder="Position of Staff 3" value={formData.position_of_staff_3} onChange={handleChange} style={inputStyle} />
            <textarea name="education_experience_of_staff_3" placeholder="Education/Experience of Staff 3" value={formData.education_experience_of_staff_3} onChange={handleChange} style={inputStyle} />
            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Upload CV for Staff 3</label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="file"
                  name="cv_of_staff_3"
                  onChange={handleFileChange}
                  style={inputStyle}
                />
                {files.cv_of_staff_3 && (
                  <button
                    type="button"
                    onClick={() => handleClearFile("cv_of_staff_3")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#d9534f",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset style={sectionStyle}>
            <legend style={legendStyle}>Supporting Documents</legend>

            {[
              { label: "Letter of Application (If New)", name: "letter_of_application", required: false },
              { label: "Business Registration Document*", name: "business_registration_document", required: true },
              { label: "Article of Incorporation", name: "article_of_incorporation", required: false },
              { label: "Tax Clearance*", name: "tax_clearance", required: true },
              { label: "Sanitation and Waste Management Plan/Policy", name: "sanitation_waste_plan", required: false },
            ].map(({ label, name, required }) => (
              <div key={name} style={{ marginBottom: "15px" }}>
                <label style={labelStyle}>{label}</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="file"
                    name={name}
                    onChange={handleFileChange}
                    required={required}
                    style={inputStyle}
                  />
                  {files[name] && (
                    <button
                      type="button"
                      onClick={() => handleClearFile(name)}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#d9534f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            ))}
          </fieldset>

          <fieldset style={sectionStyle}>
  <legend style={legendStyle}>Certificate Acquisition Payment Information</legend>

  <div
    style={{
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
    }}
  >
    <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#2c3e50' }}>
      <strong>Important:</strong> Payment of the WASH Certificate acquisition fee is <strong>mandatory</strong> before submitting this
      application.
      <br /><br />
      Clicking the <strong>Pay Now</strong> button below will redirect you to a
      secure payment page. After successful payment, you will be returned to
      this form to complete your submission.
    </p>

    {!paymentCompleted ? (
      <button
        type="button"
        onClick={handleInitPayment}
        style={{
          padding: '12px 14px',
          backgroundColor: '#0000FF',
          color: '#fff',
          fontSize: '14px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '15px',
        }}
      >
        Pay Now
      </button>
    ) : (
      <div
        style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '6px',
          fontWeight: '500',
        }}
      >
        ✔ Payment completed successfully. You may now submit your application.
      </div>
    )}
  </div>
</fieldset>

          <div style={{ marginTop: '10px' }}> 
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" name="attestation" checked={formData.attestation} onChange={handleChange} required />
              I attest that the information provided is true and complete.* 
            </label>
          </div>

          <button
            type="submit"
            style={{
             ...submitButtonStyle,
             backgroundColor: paymentCompleted ? '#2980b9' : '#bdc3c7',
             cursor: paymentCompleted ? 'pointer' : 'not-allowed',
            }}
            disabled={loading || !paymentCompleted}
          >
           {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ApplyBusinessCertificate;
