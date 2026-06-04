// src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import agencyLogo from '../assets/nwashc_logo.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/certificates/');
      setCertificates(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch =
      (cert.partner && cert.partner.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (cert.certificate_type && cert.certificate_type.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === 'All' || cert.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalCertificates = certificates.length;
  const validCertificates = certificates.filter(cert => cert.status === 'Valid').length;
  const expiredCertificates = certificates.filter(cert => cert.status === 'Expired').length;

  const data = {
    labels: ['Total', 'Valid', 'Expired'],
    datasets: [{
      label: 'Certificates',
      data: [totalCertificates, validCertificates, expiredCertificates],
      backgroundColor: ['#3498DB', '#2ECC71', '#E74C3C'],
      borderWidth: 1,
      barThickness: 30
    }]
  };

  return (
    <div style={styles.wrapper}>
      {/*
      <aside style={styles.sidebar}> 
        <h2 style={styles.logo}>NWASHC</h2>
        <nav style={styles.nav}>
          <div style={styles.navItem} onClick={() => navigate('/dashboard')}>Dashboard</div>
          <div style={styles.navItem} onClick={() => navigate('/apply-certificate')}>Apply for WASH-IN-SCHOOL Certificate</div>
          <div style={styles.navItem} onClick={() => navigate('/apply-license')}>Apply for WASH Compliance License</div>
          <div style={styles.navItem} onClick={() => navigate('/apply-clearance')}>Apply for WASH Clearance</div>
          <div style={styles.navItem} onClick={() => navigate('/apply-business-certificate')}>Apply for WASH Business Certificate</div>
          <div style={styles.navItem} onClick={() => navigate('/partners-registration')}>Client Registration</div>
          <a
            href="http://127.0.0.1:8000/admin/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.navItem, color: '#1ABC9C', textDecoration: 'underline' }}
          >
            Admin Panel Login
          </a>
        </nav>
      </aside>

      */}

      <main style={styles.main}>
        <header style={styles.header}>
          <h1>NWASHC Certificate Management Dashboard</h1>
          <img src={agencyLogo} alt="Agency Logo" style={styles.logoImage} />
        </header>

        <p style={styles.lastUpdated}>Last updated: {lastUpdated}</p>
        <button onClick={fetchCertificates} style={styles.refreshButton}>Refresh</button>

        {expiredCertificates > 0 && (
          <div style={styles.alertBox}>
            ⚠ {expiredCertificates} certificate(s) have expired. Consider renewal.
          </div>
        )}

        <section style={styles.cards}> 
          <Card title="Total Certificates" value={totalCertificates} color="#3498DB" />
          <Card title="Valid Certificates" value={validCertificates} color="#2ECC71" />
          <Card title="Expired Certificates" value={expiredCertificates} color="#E74C3C" />

        </section>
 
        <section style={styles.controls}>
          <input
            type="text"
            placeholder="Search by Partner or Type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.select}
          >
            <option value="All">All</option>
            <option value="Valid">Valid</option>
            <option value="Expired">Expired</option>
          </select>
        </section>

        <section style={styles.chartSection}>
          <h2>Certificates Overview</h2>
          <Bar data={data} options={{ responsive: true }} />
        </section>

        <section style={styles.tableSection}>
          <h2>Certificates Issued</h2>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Loading certificates...</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Partner</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Issued</th>
                  <th style={styles.th}>Expiry</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.length > 0 ? filteredCertificates.map(cert => (
                  <tr key={cert.id}>
                    <td style={styles.td}>{cert.partner}</td>
                    <td style={styles.td}>{cert.certificate_type}</td>
                    <td style={styles.td}>{cert.issued_date}</td>
                    <td style={styles.td}>{cert.expiry_date}</td>
                    <td style={styles.td}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '15px',
                        backgroundColor: cert.status === 'Valid' ? '#D5F5E3' : '#FADBD8',
                        color: cert.status === 'Valid' ? '#27AE60' : '#C0392B',
                        fontWeight: 'bold',
                        fontSize: '12px'
                      }}>
                        {cert.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" style={{ ...styles.td, textAlign: 'center', color: '#999' }}>
                      No certificates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
        <footer style={styles.footer}>
  &copy; {new Date().getFullYear()} National Water, Sanitation and Hygiene Commission (NWASHC). All rights reserved.
</footer>


      </main>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div style={{ ...styles.card, backgroundColor: color }}>
    <h3>{title}</h3>
    <p style={styles.cardValue}>{value}</p>
  </div>
);

const styles = {
  wrapper: {
  display: 'flex',
  justifyContent: 'center',
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
  minHeight: '100vh',
  backgroundColor: '#2980b9',
  padding: '30px 0'
},
  footer: {
    marginTop: '30px',
    padding: '15px',
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '14px'
  },
  
  sidebar: {
    width: '220px',
    background: '#2C3E50',
    color: '#ECF0F1',
    padding: '20px 15px'
  },
  logo: {
    fontSize: '22px',
    marginBottom: '30px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  navItem: {
    color: '#ECF0F1',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '8px 10px',
    borderRadius: '6px',
    transition: 'background 0.2s ease-in-out'
  },
  main: {
  width: '100%',
  maxWidth: '1000px',
  padding: '30px',
  overflowY: 'auto',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  logoImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    backgroundColor: '#fff'
  },
  lastUpdated: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '5px'
  },
  refreshButton: {
    backgroundColor: '#3498DB',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  alertBox: {
    backgroundColor: '#FADBD8',
    color: '#C0392B',
    padding: '10px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontWeight: '500'
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '30px'
  },
  card: {
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  cardValue: {
    fontSize: '28px',
    fontWeight: 'bold'
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  chartSection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '30px'
  },
  tableSection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#ECF0F1',
    textAlign: 'left',
    padding: '10px'
  },
  
  td: {
    padding: '10px',
    borderBottom: '1px solid #ECF0F1'
  }
  
};

export default Dashboard;
