'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  // State for the pop-up message
  const [responseMsg, setResponseMsg] = useState({ text: '', type: '' });

  // A single state object to hold all form data
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
    problemLink: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  // A single handler to update the formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showMessage = (message, type) => {
    setResponseMsg({ text: message, type });
    setTimeout(() => setResponseMsg({ text: '', type: '' }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Client-side validation... (can be expanded here)
    if (!formData.collegeName || !formData.city || !formData.state || !formData.department || !formData.teamSize || !formData.member1 || !formData.member1Phone || !formData.email || !formData.problemLink) {
        showMessage("❌ Please fill all required fields.", "error");
        return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/participants/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the complete formData state object
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        showMessage("✅ Registration successful!", "success");
        // Reset the form by setting the state back to its initial value
        setFormData(initialFormData);
      } else {
        showMessage(`❌ ${data.message || "Registration failed."}`, "error");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      showMessage("❌ Server connection failed. Try again later.", "error");
    }
  };

  return (
    <>
      <header><nav className="navbar"><Link href="/" className="home-btn">Home</Link></nav></header>
      <main>
        <div className="register-container">
          <h2>Hackathon Registration</h2>
          <div id="responseMsg" style={{ color: responseMsg.type === 'success' ? '#16a34a' : '#dc2626', opacity: responseMsg.text ? 1 : 0, transition: 'opacity 0.3s' }}>
            {responseMsg.text}
          </div>
          {/* Add the onSubmit handler to the form tag */}
          <form id="registrationForm" onSubmit={handleSubmit}>
                {/* Each input is now "controlled" by the component's state */}
                <input type="text" id="collegeName" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College Name" required />
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                
                <select id="department" name="department" value={formData.department} onChange={handleChange} required>
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

                <select id="teamSize" name="teamSize" value={formData.teamSize} onChange={handleChange} required>
                    <option value="">Team Size</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <input type="text" id="member1" name="member1" value={formData.member1} onChange={handleChange} placeholder="1st Member Name" required />
                <input type="text" id="member2" name="member2" value={formData.member2} onChange={handleChange} placeholder="2nd Member Name" />
                <input type="text" id="member3" name="member3" value={formData.member3} onChange={handleChange} placeholder="3rd Member Name" />
                <input type="text" id="member1Phone" name="member1Phone" value={formData.member1Phone} onChange={handleChange} placeholder="1st Member Phone" required />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="url" id="problemLink" name="problemLink" value={formData.problemLink} onChange={handleChange} placeholder="Problem Statement Drive Link (PDF)" required />
                
                <button type="submit">Register</button>
            </form>
        </div>
      </main>
    </>
  );
}