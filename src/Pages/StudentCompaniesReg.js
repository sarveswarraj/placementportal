import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig"; // Import your firebase config
import { ref, onValue, set, remove } from "firebase/database";
import "./Css/StudentCompanies.css"; // Assuming you have CSS for styling

const StudentCompaniesReg = () => {
  const [companies, setCompanies] = useState([]);
  const [email, setEmail] = useState(""); // Corrected from emsil to email
  const [studentCgpa, setStudentCgpa] = useState(0);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [registeredCompanies, setRegisteredCompanies] = useState(new Set());

  useEffect(() => {
    const storedCgpa = localStorage.getItem("mycgpa");
    const storedEmail = localStorage.getItem("user").substring(0,12);

    if (storedCgpa) setStudentCgpa(parseFloat(storedCgpa));
    if (storedEmail) setEmail(storedEmail);

    const companyRef = ref(database, "companies/");
    onValue(companyRef, (snapshot) => {
      const data = snapshot.val();
      const companyList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setCompanies(companyList);
    });
  }, []);

  useEffect(() => {
    // Filter companies based on CGPA
    const filtered = companies.filter((company) => 
      parseFloat(company.cgpa) <= studentCgpa
    );
    setFilteredCompanies(filtered);
  }, [companies, studentCgpa]);

  const handleCgpaChange = (e) => {
    setStudentCgpa(parseFloat(e.target.value));
  };

  const registerCompany = (companyId) => {
    if (registeredCompanies.has(companyId)) {
      console.log("Company already registered.");
      return; // Prevent duplicate registration
    }

    // Define the path for storing student registrations
    const regRef = ref(database, `students/companies/${companyId}/${email}`);
    set(regRef, { cgpa: studentCgpa }) // Store CGPA along with email
      .then(() => {
        setRegisteredCompanies((prev) => new Set(prev).add(companyId));
      })
      .catch((error) => console.error("Error registering company:", error));
  };

  const unregisterCompany = (companyId) => {
    const regRef = ref(database, `students/companies/${companyId}/${email}`);
    remove(regRef)
      .then(() => {
        setRegisteredCompanies((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(companyId);
          return updatedSet;
        });
      })
      .catch((error) => console.error("Error unregistering company:", error));
  };

  useEffect(() => {
    const registeredRef = ref(database, `students/companies/`);
    onValue(registeredRef, (snapshot) => {
      const data = snapshot.val();
      const registeredList = data ? Object.keys(data).flatMap(companyId => {
        return Object.keys(data[companyId]); // List of emails for each company
      }) : [];
      setRegisteredCompanies(new Set(registeredList));
    });
  }, []);

  return (
    <div className="student-companies">
      <h3>Available Companies for You</h3>
      <input
        type="number"
        placeholder="Enter your CGPA"
        value={studentCgpa}
        onChange={handleCgpaChange}
        step="0.1"
        className="cgpa-input"
      />

      <h4>Your Registered Companies</h4>
      <div className="registered-companies">
        {registeredCompanies.size > 0 ? (
          Array.from(registeredCompanies).map((id) => {
            const company = companies.find((c) => c.id === id);
            return (
              <div key={id} className="company-item">
                <h4>{company?.name}</h4>
                <button
                  className="unregister-btn"
                  onClick={() => unregisterCompany(id)}
                >
                  Deselect
                </button>
              </div>
            );
          })
        ) : (
          <p>No registered companies.</p>
        )}
      </div>

      <h4>Eligible Companies</h4>
      <div className="company-list">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <div key={company.id} className="company-item">
              <h4>{company.name}</h4>
              <p>Description: {company.description}</p>
              <p>Date: {company.date}</p>
              <p>CGPA Requirement: {company.cgpa}</p>
              <button
                className="register-btn"
                onClick={() => registerCompany(company.id)}
              >
                Register
              </button>
            </div>
          ))
        ) : (
          <p>No companies available for your CGPA.</p>
        )}
      </div>
    </div>
  );
};

export default StudentCompaniesReg;
