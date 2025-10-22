'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [responseMsg, setResponseMsg] = useState({ text: '', type: '' });

  const initialFormData = {
    collegeName: '',
    city: '',
    state: '',
    department: '',
    teamSize: '',
    member1: '',
    member2: '',
    member3: '',
    member1Phone: '',
    email: '',
    problemLink: '',
    // --- MODIFICATIONS START ---
    track: '',
    member1Gender: '',
    member2Gender: '',
    member3Gender: '',
    // --- MODIFICATIONS END ---
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showMessage = (message, type) => {
    setResponseMsg({ text: message, type });
    setTimeout(() => setResponseMsg({ text: '', type: '' }), 5000); // Increased time for longer messages
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- MODIFICATIONS START ---
    // Expanded Client-side validation
    const requiredFields = ['collegeName', 'city', 'state', 'department', 'teamSize', 'member1', 'member1Phone', 'email', 'problemLink', 'track', 'member1Gender'];
    if (requiredFields.some(field => !formData[field])) {
        showMessage("❌ Please fill all required fields.", "error");
        return;
    }

    // "Femine Sakthi" track validation
    if (formData.track === 'Femine Sakthi (Women Empowermen)') {
        if (formData.member1Gender !== 'Female') {
            showMessage("❌ For the Femine Sakthi track, Member 1 must be female.", "error");
            return;
        }
        if (formData.member2 && formData.member2Gender !== 'Female') {
            showMessage("❌ For the Femine Sakthi track, Member 2 must be female.", "error");
            return;
        }
        if (formData.member3 && formData.member3Gender !== 'Female') {
            showMessage("❌ For the Femine Sakthi track, Member 3 must be female.", "error");
            return;
        }
    }
    // --- MODIFICATIONS END ---

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/participants/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        showMessage("✅ Registration successful!", "success");
        setFormData(initialFormData);
      } else {
        showMessage(`❌ ${data.message || "Registration failed."}`, "error");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      showMessage("❌ Server connection failed. Try again later.", "error");
    }
  };

  // Determine number of members to show based on team size
  const memberCount = parseInt(formData.teamSize, 10) || 0;

  return (
    <>
      <header><nav className="navbar"><Link href="/" className="home-btn">Home</Link></nav></header>
      <main>
        <div className="register-container">
          <h2>Hackathon Registration</h2>
          <div id="responseMsg" style={{ color: responseMsg.type === 'success' ? '#16a34a' : '#dc2626', opacity: responseMsg.text ? 1 : 0, transition: 'opacity 0.3s' }}>
            {responseMsg.text}
          </div>
          <form id="registrationForm" onSubmit={handleSubmit}>
                <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College Name" required />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                
                <select name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select Department / Degree</option>
                    <option value="CSE">BTech CSE / CSE Allied Branches</option>
                    <option value="ECE">BTech ECE</option>
                    <option value="EEE">BTech EEE</option>
                    <option value="Degree">Degree</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="MSc">MSc</option>
                    <option value="Other">Other</option>
                </select>

                {/* --- MODIFICATION: ADDED TRACK SELECTOR --- */}
                <select name="track" value={formData.track} onChange={handleChange} required>
                    <option value="">Select Hackathon Track</option>
                    <option value="Intellect Innovators (AI & ML)">Intellect Innovators (AI & ML)</option>
                    <option value="Bot Builds (IoT, Robotics & Automation)">Bot Builds (IoT, Robotics & Automation)</option>
                    <option value="Code Guardians (Cyber Security & Block Chain)">Code Guardians (Cyber Security & Block Chain)</option>
                    <option value="Eco Drivers (Electrical Vehicles)">Eco Drivers (Electrical Vehicles)</option>
                    <option value="Femine Sakthi (Women Empowermen)">Femine Sakthi (Women Empowerment)</option>
                    <option value="Plan Horizons (Business Plan)">Plan Horizons (Business Plan)</option>
                    <option value="Medi Minds (Bio-medical)">Medi Minds (Bio-medical)</option>
                    <option value="App Ventures (Mobile & Web Application)">App Ventures (Mobile & Web Application)</option>
                    <option value="Superposition (Quantum Computing)">Superposition (Quantum Computing)</option>
                </select>

                <select name="teamSize" value={formData.teamSize} onChange={handleChange} required>
                    <option value="">Team Size</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                
                {/* --- MODIFICATION: ADDED GENDER SELECTORS AND CONDITIONAL RENDERING --- */}
                {memberCount >= 1 && (
                  <div className="member-fields">
                    <input type="text" name="member1" value={formData.member1} onChange={handleChange} placeholder="1st Member Name" required />
                    <select name="member1Gender" value={formData.member1Gender} onChange={handleChange} required>
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}

                {memberCount >= 2 && (
                  <div className="member-fields">
                    <input type="text" name="member2" value={formData.member2} onChange={handleChange} placeholder="2nd Member Name" required />
                    <select name="member2Gender" value={formData.member2Gender} onChange={handleChange} required>
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}
                
                {memberCount >= 3 && (
                  <div className="member-fields">
                    <input type="text" name="member3" value={formData.member3} onChange={handleChange} placeholder="3rd Member Name" required />
                    <select name="member3Gender" value={formData.member3Gender} onChange={handleChange} required>
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}

                <input type="text" name="member1Phone" value={formData.member1Phone} onChange={handleChange} placeholder="1st Member Phone" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="url" name="problemLink" value={formData.problemLink} onChange={handleChange} placeholder="Problem Statement Drive Link (PDF)" required />
                
                <button type="submit">Register</button>
            </form>
        </div>
      </main>
    </>
  );
}