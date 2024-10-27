import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebaseConfig';
import './Css/CompaniesAndStudents.css'; // Import CSS for styling

const CompaniesAndStudents = () => {
  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      const db = getDatabase(app);
      try {
        const companiesRef = ref(db, 'companies');
        const companiesSnapshot = await get(companiesRef);
        const companiesData = companiesSnapshot.val();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Companies and Registered Students</h1>
      {Object.entries(companies).map(([companyId, company]) => (
        <div className="company-card" key={companyId}>
          <h2 className="company-name">{company.name}</h2>
          <p><strong>CGPA Requirement:</strong> {company.cgpa}</p>
          <p><strong>Date:</strong> {company.date}</p>
          <p><strong>Description:</strong> {company.description}</p>
          <h3>Registered Students</h3>
          <ul className="student-list">
            {company.register
              ? Object.entries(company.register).map(([studentId, student]) => (
                  <li className="student-item" key={studentId}>
                    Registration Number: {studentId.replace(/"/g, '')} | CGPA: {student.cgpa}
                  </li>
                ))
              : <p>No students registered</p>}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CompaniesAndStudents;
