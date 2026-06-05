import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const ApplyLicense = () => {
  const [formData, setFormData] = useState({
    partner: "",
    address: "",
    tin_number: '',
    contact: "",
    email_address: "",
    sub_office_location_1: "",
    sub_office_location_2: "",
    sub_office_location_3: "",
    year_of_establishment: "",
    business_registration_type: "",
    amount_paid: "",
    category: "",

    owner_name: "",
    owner_address: "",
    owner_phone: "",
    owner_email: "",

    water_production_site: "",
    source_of_water: "",
    type_of_water_production: "",
    other_water_site: "",
    other_water_source: "",
    other_production_type: "",

    financial_capacity: "",
    banks: "",

    staff_name_1: "",
    staff_nationality_1: "",
    staff_position_1: "",
    staff_education_1: "",
    staff_experience_years_1: "",

    staff_name_2: "",
    staff_nationality_2: "",
    staff_position_2: "",
    staff_education_2: "",
    staff_experience_years_2: "",

    staff_name_3: "",
    staff_nationality_3: "",
    staff_position_3: "",
    staff_education_3: "",
    staff_experience_years_3: "",

    attestation: false,
  });

  const [files, setFiles] = useState({
    staff_cv_1: null,
    staff_work_permit_1: null,
    staff_cv_2: null,
    staff_work_permit_2: null,
    staff_cv_3: null,
    staff_work_permit_3: null,
    environmental_license: null,
    water_quality_report: null,
    business_registration: null,
    tax_clearance: null,
    article_of_incorporation: null,
    letter_of_application: null,
    lwsc_receipts: null,
    license_payment_receipt: null,
  });

  const [machineries, setMachineries] = useState({
    light_duty_vehicles: "",
    heavy_duty_vehicles: "",
    number_of_machines: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleClearFile = (name) => {
  setFiles((prev) => ({
    ...prev,
    [name]: null,
  }));

  // Reset the input field itself (for display and re-upload)
  const input = document.querySelector(`input[name="${name}"]`);
  if (input) input.value = "";
};


  const handleMachineryChange = (e) => {
    const { name, value } = e.target;
    setMachineries((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const completeData = new FormData();
  
    // Add regular form data
    for (const key in formData) {
      completeData.append(key, formData[key]);
    }
  
    // Add machinery data
    for (const key in machineries) {
      completeData.append(key, machineries[key]);
    }
  
    // Add file data
    for (const key in files) {
      if (files[key]) {
        completeData.append(key, files[key]);
      }
    }
  
    try {
      await axios.post(`${API_URL}/api/license-applications/`, completeData); 
      setSuccess(true);
      navigate("/application-success");
    } catch (err) {
      console.error(err.response || err);
      setError("Submission failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };
  

  const sectionStyle = {
    marginBottom: "2rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
  };

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
  color: '#D3D3D3',
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


  const requiredFiles = [
  "water_quality_report",
  "letter_of_application",
  "business_registration",
  "tax_clearance",
  "license_payment_receipt",
];


  const inputStyle = {
    marginBottom: "1rem",
    padding: "10px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginBottom: "0.5rem",
  };

  const sectionTitle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "1rem",
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
        Pre-Qualification Form |<span style={{ color: 'red', fontWeight: 'bold' }}> WASH COMPLIANCE LICENSE</span>
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
    This form is meant only for <strong>Water Companies</strong> that are seeking to obtain a WASH Complaince License. Please ensure that you meet all document requirements by providing the required documents in the <strong>Supporting Documents</strong> section. Make sure to upload a <strong>Letter of Application</strong> along with other required documents.
    <br /><br />
    For any other information regarding the application process, contact the <strong>NWASHC Compliance Department</strong> via phone, email, or in-person.
  </p>
  <p style={requiredNoteStyle}>
    <em style={{ color: 'black' }}>
      All fields with asterisks (*) are required fields. Your form won't submit if they're not properly answered.
    </em>
  </p>
</div>

      {success && (
        <div style={{ color: "green", marginBottom: "1rem" }}>
          Application submitted successfully!
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* General Info */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>General Information</div>
          <input
  type="text"
  name="partner"
  value={formData.partner}
  onChange={handleChange}
  placeholder="Entity Name*"
  required
  style={inputStyle}
/>
          <label style={labelStyle}>Address*</label>
          <input style={inputStyle} name="address" required onChange={handleChange} />

          <label style={labelStyle}>TIN Number*</label>
          <input style={inputStyle} name="tin_number" required onChange={handleChange} />

          <label style={labelStyle}>Contact*</label>
          <input style={inputStyle} name="contact" required onChange={handleChange} />

          <label style={labelStyle}>Email Address*</label>
          <input type="email" style={inputStyle} name="email_address" required onChange={handleChange} />

          <label style={labelStyle}>Sub-office Location 1</label>
          <input style={inputStyle} name="sub_office_location_1" onChange={handleChange} />

          <label style={labelStyle}>Sub-office Location 2</label>
          <input style={inputStyle} name="sub_office_location_2" onChange={handleChange} />

          <label style={labelStyle}>Sub-office Location 3</label>
          <input style={inputStyle} name="sub_office_location_3" onChange={handleChange} />

          <label style={labelStyle}>Year of Establishment*</label>
          <input type="date" style={inputStyle} name="year_of_establishment" required onChange={handleChange} />

          <label style={labelStyle}>Business Registration Type*</label>
          <input style={inputStyle} name="business_registration_type" required onChange={handleChange} />
        </div>

        {/* Business Owner */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Business Owner</div>
          <label style={labelStyle}>Owner Name*</label>
          <input style={inputStyle} name="owner_name" required onChange={handleChange} />

          <label style={labelStyle}>Owner Address*</label>
          <input style={inputStyle} name="owner_address" required onChange={handleChange} />

          <label style={labelStyle}>Owner Phone*</label>
          <input style={inputStyle} name="owner_phone" required onChange={handleChange} />

          <label style={labelStyle}>Owner Email*</label>
          <input type="email" style={inputStyle} name="owner_email" required onChange={handleChange} />
        </div>

        {/* WASH Facilities */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>WASH Facilities</div>
          <label style={labelStyle}>Water Production Site*</label>
          <select style={inputStyle} name="water_production_site" required onChange={handleChange}>
            <option value="">Select</option>
            <option>Residential</option>
            <option>Stand-alone</option>
            <option>Annex</option>
            <option>other</option>
          </select>
          {formData.water_production_site === "other" && (
            <input style={inputStyle} name="other_water_site" placeholder="Please specify" onChange={handleChange} />
          )}

          <label style={labelStyle}>Source of Water*</label>
          <select style={inputStyle} name="source_of_water" required onChange={handleChange}>
            <option value="">Select</option>
            <option>Hand-dug well</option>
            <option>borehole</option>
            <option>LWSC</option>
            <option>other</option>
          </select>
          {formData.source_of_water === "other" && (
            <input style={inputStyle} name="other_water_source" placeholder="Please specify" onChange={handleChange} />
          )}

          <label style={labelStyle}>Type of Water Production*</label>
          <select style={inputStyle} name="type_of_water_production" required onChange={handleChange}>
            <option value="">Select</option>
            <option>sachet</option>
            <option>bottling</option>
            <option>trucking</option>
            <option>jerry-can</option>
            <option>kiosks</option>
            <option>tap stand</option>
            <option>other</option>
          </select>
          {formData.type_of_water_production === "other" && (
            <input style={inputStyle} name="other_production_type" placeholder="Please specify" onChange={handleChange} />
          )}
        </div>

        {/* Financial Info */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Financial Info</div>
          <label style={labelStyle}>Financial Capacity*</label>
          <input style={inputStyle} name="financial_capacity" required onChange={handleChange} />

          <label style={labelStyle}>Bank(s)*</label>
          <input style={inputStyle} name="bank" required onChange={handleChange} />

          <label style={labelStyle}>Select The Category You Fall In*</label>
          <select style={inputStyle}
  name="amount_paid"
  value={formData.amount_paid}
  onChange={handleChange}
  required
>
  <option value="">-- Select Amount --</option>
  <option value="650">Category A ($650 and above)</option>
  <option value="450">Category B ($450 - $649)</option>
  <option value="350">Category C ($350 - $449)</option>
  <option value="150">Category D ($150 - $349)</option>
</select>

        </div>

        {/* Technical Staff */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Technical Staff</div>
          <label style={labelStyle}>Name of Staff 1*</label>
          <input style={inputStyle} name="staff_name_1" required onChange={handleChange} />

          <label style={labelStyle}>Nationality of Staff 1*</label>
          <input style={inputStyle} name="staff_nationality_1" required onChange={handleChange} />

          <label style={labelStyle}>Position of Staff 1*</label>
          <input style={inputStyle} name="staff_position_1" required onChange={handleChange} />

          <label style={labelStyle}>Education Level of Staff 1*</label>
          <input style={inputStyle} name="staff_education_1" required onChange={handleChange} />

          <label style={labelStyle}>Years of Experience of Staff 1*</label>
          <input type="number" style={inputStyle} name="staff_experience_years_1" required onChange={handleChange} />

          {/* Staff 1 CV */}
<div style={{ marginBottom: '15px' }}>
  <label style={labelStyle}>CV (PDF) of Staff 1*</label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <input
      type="file"
      name="staff_cv_1"
      onChange={handleFileChange}
      required
      style={inputStyle}
    />
    {files.staff_cv_1 && (
      <button
        type="button"
        onClick={() => handleClearFile("staff_cv_1")}
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

{/* Staff 1 Work Permit */}
<div style={{ marginBottom: '15px' }}>
  <label style={labelStyle}>Work Permit (PDF) of Staff 1*</label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <input
      type="file"
      name="staff_work_permit_1"
      onChange={handleFileChange}
      required
      style={inputStyle}
    />
    {files.staff_work_permit_1 && (
      <button
        type="button"
        onClick={() => handleClearFile("staff_work_permit_1")}
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
          <label style={labelStyle}>Name of Staff 2</label>
          <input style={inputStyle} name="staff_name_2" onChange={handleChange} />

          <label style={labelStyle}>Nationality of Staff 2</label>
          <input style={inputStyle} name="staff_nationality_2" onChange={handleChange} />

          <label style={labelStyle}>Position of Staff 2</label>
          <input style={inputStyle} name="staff_position_2"  onChange={handleChange} />

          <label style={labelStyle}>Education Level of Staff 2</label>
          <input style={inputStyle} name="staff_education_2" onChange={handleChange} />

          <label style={labelStyle}>Years of Experience of Staff 2</label>
          <input type="number" style={inputStyle} name="staff_experience_years_2" onChange={handleChange} />

          {/* Staff 2 CV */}
<div style={{ marginBottom: '15px' }}>
  <label style={labelStyle}>CV (PDF) of Staff 2</label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <input
      type="file"
      name="staff_cv_2"
      onChange={handleFileChange}
      style={inputStyle}
    />
    {files.staff_cv_2 && (
      <button
        type="button"
        onClick={() => handleClearFile("staff_cv_2")}
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

{/* Staff 2 Work Permit */}
<div style={{ marginBottom: '15px' }}>
  <label style={labelStyle}>Work Permit (PDF) of Staff 2</label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <input
      type="file"
      name="staff_work_permit_2"
      onChange={handleFileChange}
      style={inputStyle}
    />
    {files.staff_work_permit_2 && (
      <button
        type="button"
        onClick={() => handleClearFile("staff_work_permit_2")}
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
          <label style={labelStyle}>Name of Staff 3</label>
          <input style={inputStyle} name="staff_name_3" onChange={handleChange} />

          <label style={labelStyle}>Nationality of Staff 3</label>
          <input style={inputStyle} name="staff_nationality_3" onChange={handleChange} />

          <label style={labelStyle}>Position of Staff 3</label>
          <input style={inputStyle} name="staff_position_3"  onChange={handleChange} />

          <label style={labelStyle}>Education Level of Staff 3</label>
          <input style={inputStyle} name="staff_education_3" onChange={handleChange} />

          <label style={labelStyle}>Years of Experience of Staff 3</label>
          <input type="number" style={inputStyle} name="staff_experience_years_3" onChange={handleChange} />

          {/* Staff 3 CV */}
<div style={{ marginBottom: '15px' }}>
  <label style={labelStyle}>CV (PDF) of Staff 3</label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <input
      type="file"
      name="staff_cv_3"
      onChange={handleFileChange}
      style={inputStyle}
    />
    {files.staff_cv_3 && (
      <button
        type="button"
        onClick={() => handleClearFile("staff_cv_3")}
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

{/* Staff 3 Work Permit */}
<div style={{ marginBottom: '15px' }}>
  <label style={labelStyle}>Work Permit (PDF) of Staff 3</label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <input
      type="file"
      name="staff_work_permit_3"
      onChange={handleFileChange}
      style={inputStyle}
    />
    {files.staff_work_permit_3 && (
      <button
        type="button"
        onClick={() => handleClearFile("staff_work_permit_3")}
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
        </div>

        {/* Supporting Documents */}
<div style={sectionStyle}>
  <div style={sectionTitle}>Supporting Documents</div>
  {[
    { name: "environmental_license", label: "Environmental License" },
    { name: "water_quality_report", label: "Recent Water Quality Test From NPHIL*" },
    { name: "business_registration", label: "Business Registration*" },
    { name: "tax_clearance", label: "Tax Clearance*" },
    { name: "article_of_incorporation", label: "Article of Incorporation" },
    { name: "letter_of_application", label: "Letter of Application*" },
    { name: "lwsc_receipts", label: "LWSC Receipts" },
    { name: "license_payment_receipt", label: "License Payment Receipt*" },
  ].map(({ name, label }) => ( 
    <div key={name} style={{ marginBottom: '15px' }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          required={requiredFiles.includes(name)}
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
</div>


        {/* Machineries */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Machineries</div>
          <label style={labelStyle}>Light Duty Vehicles*</label>
          <input type="number" style={inputStyle} name="light_duty_vehicles" required onChange={handleMachineryChange} />

          <label style={labelStyle}>Heavy Duty Vehicles*</label>
          <input type="number" style={inputStyle} name="heavy_duty_vehicles" required onChange={handleMachineryChange} />

          <label style={labelStyle}>Number of Machines*</label>
          <input type="number" style={inputStyle} name="number_of_machines" required onChange={handleMachineryChange} />
        </div>

        {/* Attestation */}
        <div style={sectionStyle}>
          <label style={{ marginRight: "1rem" }}>
            <input type="checkbox" name="attestation" onChange={handleChange} required />
            &nbsp; I attest that the information provided is correct*
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            backgroundColor: "#2980b9",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
   </div>
  );
};

export default ApplyLicense;
