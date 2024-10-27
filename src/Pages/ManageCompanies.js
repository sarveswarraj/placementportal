import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { ref, set, onValue, remove, update } from "firebase/database";
import "./Css/ManageCompanies.css";

const ManageCompanies = () => {
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUser = JSON.parse(localStorage.getItem("adminuser"));
    if (!adminUser) {
      navigate("/adminlogin");
    } else {
      setUser(adminUser);
    }
  }, [navigate]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  useEffect(() => {
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

  const addCompany = () => {
    if (name && description && date && cgpa) {
      const companyId = editingId || Date.now().toString();
      const companyRef = ref(database, `companies/${companyId}`);

      const companyData = { name, description, date, cgpa };
      if (editingId) {
        update(companyRef, companyData);
        setEditingId(null);
      } else {
        set(companyRef, companyData);
      }
      setName("");
      setDescription("");
      setDate("");
      setCgpa("");
    }
  };

  const editCompany = (company) => {
    setName(company.name);
    setDescription(company.description);
    setDate(company.date);
    setCgpa(company.cgpa);
    setEditingId(company.id);
  };

  const deleteCompany = (id) => {
    const companyRef = ref(database, `companies/${id}`);
    remove(companyRef);
  };

  return (
    <div className="manage-companies">
      <h3>Company List</h3>
      {!user ? (
        <button className="sign-in-btn" onClick={handleSignIn}>Sign in with Google</button>
      ) : (
        <div className="company-container">
          <p className="welcome-text">Welcome, {user.displayName || user.email}</p>
          <div className="input-section">
            <input
              type="text"
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field long-input"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field textarea"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="CGPA Requirement"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              className="input-field"
            />
            <button onClick={addCompany} className="add-btn">
              {editingId ? "Update Company" : "Add Company"}
            </button>
          </div>

          <div className="company-list">
            {companies.map((company) => (
              <div key={company.id} className="company-item">
                <h4>{company.name}</h4>
                <p>{company.description}</p>
                <p>Date: {company.date}</p>
                <p>CGPA Requirement: {company.cgpa}</p>
                <button onClick={() => editCompany(company)} className="edit-btn">Edit</button>
                <button onClick={() => deleteCompany(company.id)} className="delete-btn">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCompanies;
