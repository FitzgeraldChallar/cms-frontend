
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplyCertificate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    partner: '',
    address: '',
    tin_number: '',
    last_certificate_expiry_date: '',
    principal_name: '',
    contact_number: '',
    email_address: '',
    faith_based_school: '',
    non_faith_based_school: '',
    type_of_business_registration: '',
    ownership: '',
    financial_strength: '',
    name_of_banks: '',
    admin_staff_1_name: '',
    admin_staff_1_nationality: '',
    admin_staff_1_position: '',
    admin_staff_1_education: '',
    admin_staff_1_years_of_experience: '',
    admin_staff_1_cv: null,
    admin_staff_1_work_permit: null,
    admin_staff_2_name: '',
    admin_staff_2_nationality: '',
    admin_staff_2_position: '',
    admin_staff_2_education: '',
    admin_staff_2_years_of_experience: '',
    admin_staff_2_cv: null,
    admin_staff_2_work_permit: null,
    admin_staff_3_name: '',
    admin_staff_3_nationality: '',
    admin_staff_3_position: '',
    admin_staff_3_education: '',
    admin_staff_3_years_of_experience: '',
    admin_staff_3_cv: null,
    admin_staff_3_work_permit: null,
    permit_from_moe: null,
    business_registration: null,
    article_of_incorporation: null,
    tax_clearance: null,
    sanitation_policy: null,
    letter_of_application: null,
    information_sheet: null,
    certificate_payment_receipt: null,
    number_of_handwashing_facilities: '',
    number_of_gender_sensitive_latrines: '',
    source_of_water: '',
    specify_other_source: '',
    number_of_drinking_water_facilities: '',
    method_of_payment: '',
    attestation: false,
  });

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '30px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, Tahoma, sans-serif',
  };

  const sectionStyle = {
    marginBottom: '25px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
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

  const labelStyle = {
    marginTop: '12px',
    marginBottom: '5px',
    fontWeight: '500',
    color: '#2c3e50',
  };

  const clearButtonStyle = {
    padding: "6px 10px",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const clearButtonHoverStyle = {
    backgroundColor: "#c9302c",
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

  const [selectedFiles, setSelectedFiles] = useState({});
  const fileInputRefs = useRef({});
  const [hoveredClear, setHoveredClear] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (files && files.length > 0) {
      setSelectedFiles((prev) => ({ ...prev, [name]: files[0] }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : type === 'checkbox' ? checked : value,
    }));

    if (name === 'email_address') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email_address: emailRegex.test(value) ? '' : 'Please enter a valid email address.',
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== '') data.append(key, val);
    });

    try {
      await axios.post('http://localhost:8000/api/applications/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/application-confirmation');
    } catch (error) {
      alert('Submission failed. Please check the form and try again.');
    } finally {
      setLoading(false);
    }
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
          Pre-Qualification Form |<span style={{ color: 'red', fontWeight: 'bold' }}> WASH-IN-SCHOOL CERTIFICATE</span>
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
            This form is meant only for <strong>Schools involved in WASH activities</strong> and want to obtain a WASH certificate. Please ensure that you meet all document requirements by providing the required documents in the <strong>Supporting Documents</strong> section. You are only advised to upload a <strong>Letter of Application</strong> if it is your first time applying for a WASH certificate.
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
            <legend style={legendStyle}>General Info</legend>
            <input
              type="text"
              name="partner"
              value={formData.partner}
              onChange={handleChange}
              placeholder="Enter School Name*"
              required
              style={inputStyle}
            />
            <textarea name="address" placeholder="Address*" value={formData.address} onChange={handleChange} style={inputStyle} required />
            <input name="tin_number" placeholder="TIN Number*" value={formData.tin_number} onChange={handleChange} style={inputStyle} required />
            <label>
              Last Certificate Expiry Date*
              <input type="date" name="last_certificate_expiry_date" value={formData.last_certificate_expiry_date} onChange={handleChange} style={inputStyle} required />
            </label>
          </fieldset>

          <fieldset style={sectionStyle}>
            <legend style={legendStyle}>Contact & Principal Info</legend>
            <input name="principal_name" placeholder="Principal's Name*" value={formData.principal_name} onChange={handleChange} style={inputStyle} />
            <input name="contact_number" placeholder="Phone Number*" value={formData.contact_number} onChange={handleChange} style={inputStyle} />
            <div style={{ marginBottom: '1rem' }}>

              <input
                type="email"
                name="email_address"
                placeholder="Email Address*"
                value={formData.email_address}
                onChange={handleChange}
                style={inputStyle}
                required
              />
              {errors.email_address && (
                <div style={{ color: 'red', marginTop: '0.5rem', fontSize: '14px' }}>
                  {errors.email_address}
                </div>
              )}
            </div>

          </fieldset>

          <fieldset style={sectionStyle}>
            <legend style={legendStyle}>School Type</legend>
            <select name="faith_based_school" value={formData.faith_based_school} onChange={handleChange} style={inputStyle}>
              <option value="">Faith-Based School Type</option>
              <option>University</option><option>College</option><option>Technical/Vocational</option><option>Secondary</option><option>Primary</option><option>Early Childhood</option>
            </select>
            <select name="non_faith_based_school" value={formData.non_faith_based_school} onChange={handleChange} style={inputStyle}>
              <option value="">Non-Faith-Based School Type</option>
              <option>University</option><option>College</option><option>Technical/Vocational</option><option>Secondary</option><option>Primary</option><option>Early Childhood</option>
            </select>
          </fieldset>

          <fieldset style={sectionStyle}>
            <legend style={legendStyle}>Business Info</legend>
            <select name="type_of_business_registration" value={formData.type_of_business_registration} onChange={handleChange} style={inputStyle}>
              <option value="">Business Registration Type*</option>
              <option>Sole Proprietorship</option><option>Partnership</option><option>Corporation</option>
            </select>
            <select name="ownership" value={formData.ownership} onChange={handleChange} style={inputStyle}>
              <option value="">Ownership*</option><option>government</option><option>private</option><option>non governmental</option>
            </select>
            <select name="financial_strength" value={formData.financial_strength} onChange={handleChange} style={inputStyle}>
              <option value="">Financial Strength*</option><option>strong</option><option>medium</option><option>little</option>
            </select>
            <select name="name_of_banks" value={formData.name_of_banks} onChange={handleChange} style={inputStyle}>
              <option value="">Name of Bank*</option><option>IB</option><option>EcoBank</option><option>GT Bank</option><option>Afriland First Bank</option><option>LBDI Bank</option><option>SIB Bank</option><option>Bloom Bank</option><option>UBA Bank</option>
            </select>
          </fieldset>

          <fieldset style={sectionStyle}>
            <legend style={legendStyle}>Administrative Staff</legend>
            <input name="admin_staff_1_name" placeholder="Name of Staff 1*" value={formData.admin_staff_1_name} onChange={handleChange} style={inputStyle} required />
            <input name="admin_staff_1_nationality" placeholder="Nationality of Staff 1*" value={formData.admin_staff_1_nationality} onChange={handleChange} style={inputStyle} required />
            <input name="admin_staff_1_position" placeholder="Position of Staff 1*" value={formData.admin_staff_1_position} onChange={handleChange} style={inputStyle} required />
            <select name="admin_staff_1_education" value={formData.admin_staff_1_education} onChange={handleChange} style={inputStyle} required>
              <option value="">Education Level of Staff 1*</option>
              <option>High School Graduate</option>
              <option>Undergraduate</option>
              <option>Postgraduate</option>
              <option>PhD</option>
            </select>
            <input type="number" name="admin_staff_1_years_of_experience" placeholder="Years of Experience of Staff 1*" value={formData.admin_staff_1_years_of_experience} onChange={handleChange} style={inputStyle} required />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Upload CV for Staff 1*</label>
                <input
                  type="file"
                  name="admin_staff_1_cv"
                  onChange={handleChange}
                  style={inputStyle}
                  ref={(el) => (fileInputRefs.current['admin_staff_1_cv'] = el)}
                  required
                />
              </div>
              {selectedFiles['admin_staff_1_cv'] && (
                <button
                  type="button"
                  onClick={() => {
                    fileInputRefs.current['admin_staff_1_cv'].value = null;
                    setFormData((prev) => ({ ...prev, admin_staff_1_cv: null }));
                    setSelectedFiles((prev) => ({ ...prev, admin_staff_1_cv: null }));
                  }}
                  onMouseEnter={() => setHoveredClear('admin_staff_1_cv')}
                  onMouseLeave={() => setHoveredClear(null)}
                  style={{
                    ...clearButtonStyle,
                    ...(hoveredClear === 'admin_staff_1_cv' ? clearButtonHoverStyle : {})
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Upload Work Permit for Staff 1*</label>
                <input
                  type="file"
                  name="admin_staff_1_work_permit"
                  onChange={handleChange}
                  style={inputStyle}
                  ref={(el) => (fileInputRefs.current['admin_staff_1_work_permit'] = el)}
                  required
                />
              </div>
              {selectedFiles['admin_staff_1_work_permit'] && (
                <button
                  type="button"
                  onClick={() => {
                    fileInputRefs.current['admin_staff_1_work_permit'].value = null;
                    setFormData((prev) => ({ ...prev, admin_staff_1_work_permit: null }));
                    setSelectedFiles((prev) => ({ ...prev, admin_staff_1_work_permit: null }));
                  }}
                  onMouseEnter={() => setHoveredClear('admin_staff_1_work_permit')}
                  onMouseLeave={() => setHoveredClear(null)}
                  style={{
                    ...clearButtonStyle,
                    ...(hoveredClear === 'admin_staff_1_work_permit' ? clearButtonHoverStyle : {})
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <input name="admin_staff_2_name" placeholder="Name of Staff 2" value={formData.admin_staff_2_name} onChange={handleChange} style={inputStyle} />
            <input name="admin_staff_2_nationality" placeholder="Nationality of Staff 2" value={formData.admin_staff_2_nationality} onChange={handleChange} style={inputStyle} />
            <input name="admin_staff_2_position" placeholder="Position of Staff 2" value={formData.admin_staff_2_position} onChange={handleChange} style={inputStyle} />
            <select name="admin_staff_2_education" value={formData.admin_staff_2_education} onChange={handleChange} style={inputStyle}>
              <option value="">Education Level of Staff 2</option>
              <option>High School Graduate</option>
              <option>Undergraduate</option>
              <option>Postgraduate</option>
              <option>PhD</option>
            </select>
            <input type="number" name="admin_staff_2_years_of_experience" placeholder="Years of Experience of Staff 2" value={formData.admin_staff_2_years_of_experience} onChange={handleChange} style={inputStyle} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Upload CV for Staff 2</label>
                <input
                  type="file"
                  name="admin_staff_2_cv"
                  onChange={handleChange}
                  style={inputStyle}
                  ref={(el) => (fileInputRefs.current['admin_staff_2_cv'] = el)}
                />
              </div>
              {selectedFiles['admin_staff_2_cv'] && (
                <button
                  type="button"
                  onClick={() => {
                    fileInputRefs.current['admin_staff_2_cv'].value = null;
                    setFormData((prev) => ({ ...prev, admin_staff_2_cv: null }));
                    setSelectedFiles((prev) => ({ ...prev, admin_staff_2_cv: null }));
                  }}
                  onMouseEnter={() => setHoveredClear('admin_staff_2_cv')}
                  onMouseLeave={() => setHoveredClear(null)}
                  style={{
                    ...clearButtonStyle,
                    ...(hoveredClear === 'admin_staff_2_cv' ? clearButtonHoverStyle : {})
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Upload Work Permit for Staff 2</label>
                <input
                  type="file"
                  name="admin_staff_2_work_permit"
                  onChange={handleChange}
                  style={inputStyle}
                  ref={(el) => (fileInputRefs.current['admin_staff_2_work_permit'] = el)}
                />
              </div>
              {selectedFiles['admin_staff_2_work_permit'] && (
                <button
                  type="button"
                  onClick={() => {
                    fileInputRefs.current['admin_staff_2_work_permit'].value = null;
                    setFormData((prev) => ({ ...prev, admin_staff_2_work_permit: null }));
                    setSelectedFiles((prev) => ({ ...prev, admin_staff_2_work_permit: null }));
                  }}
                  onMouseEnter={() => setHoveredClear('admin_staff_2_work_permit')}
                  onMouseLeave={() => setHoveredClear(null)}
                  style={{
                    ...clearButtonStyle,
                    ...(hoveredClear === 'admin_staff_2_work_permit' ? clearButtonHoverStyle : {})
                  }}
                >
                  Clear
                </button>
              )}
            </div>
            <input name="admin_staff_3_name" placeholder="Name of Staff 3" value={formData.admin_staff_3_name} onChange={handleChange} style={inputStyle} />
            <input name="admin_staff_3_nationality" placeholder="Nationality of Staff 3" value={formData.admin_staff_3_nationality} onChange={handleChange} style={inputStyle} />
            <input name="admin_staff_3_position" placeholder="Position of Staff 3" value={formData.admin_staff_3_position} onChange={handleChange} style={inputStyle} />
            <select name="admin_staff_3_education" value={formData.admin_staff_3_education} onChange={handleChange} style={inputStyle}>
              <option value="">Education Level of Staff 3</option>
              <option>High School Graduate</option>
              <option>Undergraduate</option>
              <option>Postgraduate</option>
              <option>PhD</option>
            </select>
            <input type="number" name="admin_staff_3_years_of_experience" placeholder="Years of Experience of Staff 3" value={formData.admin_staff_3_years_of_experience} onChange={handleChange} style={inputStyle} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Upload CV for Staff 3</label>
                <input
                  type="file"
                  name="admin_staff_3_cv"
                  onChange={handleChange}
                  style={inputStyle}
                  ref={(el) => (fileInputRefs.current['admin_staff_3_cv'] = el)}
                />
              </div>
              {selectedFiles['admin_staff_3_cv'] && (
                <button
                  type="button"
                  onClick={() => {
                    fileInputRefs.current['admin_staff_3_cv'].value = null;
                    setFormData((prev) => ({ ...prev, admin_staff_3_cv: null }));
                    setSelectedFiles((prev) => ({ ...prev, admin_staff_3_cv: null }));
                  }}
                  onMouseEnter={() => setHoveredClear('admin_staff_3_cv')}
                  onMouseLeave={() => setHoveredClear(null)}
                  style={{
                    ...clearButtonStyle,
                    ...(hoveredClear === 'admin_staff_3_cv' ? clearButtonHoverStyle : {})
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Upload Work Permit for Staff 2</label>
                <input
                  type="file"
                  name="admin_staff_3_work_permit"
                  onChange={handleChange}
                  style={inputStyle}
                  ref={(el) => (fileInputRefs.current['admin_staff_3_work_permit'] = el)}
                />
              </div>
              {selectedFiles['admin_staff_3_work_permit'] && (
                <button
                  type="button"
                  onClick={() => {
                    fileInputRefs.current['admin_staff_3_work_permit'].value = null;
                    setFormData((prev) => ({ ...prev, admin_staff_3_work_permit: null }));
                    setSelectedFiles((prev) => ({ ...prev, admin_staff_3_work_permit: null }));
                  }}
                  onMouseEnter={() => setHoveredClear('admin_staff_3_work_permit')}
                  onMouseLeave={() => setHoveredClear(null)}
                  style={{
                    ...clearButtonStyle,
                    ...(hoveredClear === 'admin_staff_3_work_permit' ? clearButtonHoverStyle : {})
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </fieldset>

          <fieldset style={sectionStyle}>
            <legend style={legendStyle}>Supporting Documents</legend>

            {[
              { label: 'Permit from MoE*', name: 'permit_from_moe', required: true },
              { label: 'Business Registration*', name: 'business_registration', required: true },
              { label: 'Article of Incorporation', name: 'article_of_incorporation', required: false },
              { label: 'Tax Clearance*', name: 'tax_clearance', required: true },
              { label: 'Sanitation Policy', name: 'sanitation_policy', required: false },
              { label: 'Letter of Application (If New)', name: 'letter_of_application', required: false },
              { label: 'Information Sheet*', name: 'information_sheet', required: true },
              { label: 'Certificate Payment Receipt*', name: 'certificate_payment_receipt', required: true },
            ].map(({ label, name, required }) => (
              <div key={name} style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{label}</label><br />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="file"
                    name={name}
                    ref={(ref) => (fileInputRefs.current[name] = ref)}
                    onChange={handleChange}
                    style={inputStyle}
                    required={required}
                  />
                  {selectedFiles[name] && (
                    <button
                      type="button"
                      onClick={() => {
                        fileInputRefs.current[name].value = null;
                        setSelectedFiles((prev) => ({ ...prev, [name]: null }));
                        setFormData((prev) => ({ ...prev, [name]: null }));
                      }}
                      onMouseEnter={() => setHoveredClear(name)}
                      onMouseLeave={() => setHoveredClear(null)}
                      style={{
                        ...clearButtonStyle,
                        ...(hoveredClear === name ? clearButtonHoverStyle : {}),
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
            <legend style={legendStyle}>WASH Facilities</legend>
            <select name="number_of_handwashing_facilities" value={formData.number_of_handwashing_facilities} onChange={handleChange} style={inputStyle} required>
              <option value="">Handwashing Facilities*</option>
              <option>none</option><option>one</option><option>two</option><option>three</option><option>more than three</option>
            </select>

            <select name="number_of_gender_sensitive_latrines" value={formData.number_of_gender_sensitive_latrines} onChange={handleChange} style={inputStyle} required>
              <option value="">Gender-Sensitive Latrines*</option>
              <option>none</option><option>one</option><option>two</option><option>three</option><option>more than three</option>
            </select>

            <select name="source_of_water" value={formData.source_of_water} onChange={handleChange} style={inputStyle} required>
              <option value="">Source of Water*</option>
              <option>hand-dug well</option><option>borehole</option><option>LWSC</option><option>creek</option><option>other</option>
            </select>

            {formData.source_of_water === 'other' && (
              <input name="specify_other_source" placeholder="Specify other source" value={formData.specify_other_source} onChange={handleChange} style={inputStyle} required />
            )}

            <select name="number_of_drinking_water_facilities" value={formData.number_of_drinking_water_facilities} onChange={handleChange} style={inputStyle} required>
              <option value="">Drinking Water Facilities*</option>
              <option>none</option><option>one</option><option>two</option><option>three</option><option>more than three</option>
            </select>
          </fieldset>

          <fieldset style={sectionStyle}>
            <legend style={legendStyle}>Method of Payment</legend>
            <select name="method_of_payment" value={formData.method_of_payment} onChange={handleChange} required style={inputStyle}>
              <option value="">Select Method of Payment*</option>
              <option value="bank_deposit">Bank Transfer</option>
              <option value="debit_credit_card">Debit/Credit Card</option>
              <option value="mobile_money">Mobile Money</option>
            </select>
          </fieldset>

          <div style={{ marginTop: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" name="attestation" checked={formData.attestation} onChange={handleChange} required />
              I attest that all information provided is accurate.*
            </label>
          </div>

          <button type="submit" style={submitButtonStyle} disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ApplyCertificate;

