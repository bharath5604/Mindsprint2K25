'use client';
import { useState } from 'react';

export default function AdminPage() {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminMsg, setAdminMsg] = useState({ text: '', type: '' });

    const showMessage = (message, type) => {
        setAdminMsg({ text: message, type });
        setTimeout(() => setAdminMsg({ text: '', type: '' }), 4000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                setToken(data.token);
                setIsLoggedIn(true);
                showMessage('Login successful!', 'success');
            } else {
                showMessage(data.message || 'Login failed.', 'error');
            }
        } catch (err) {
            showMessage('Server error. Try later.', 'error');
        }
    };
    
    const handleDownload = async (url, filename) => {
        if (!token) return;
        showMessage('Starting download...', 'success');
        try {
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error(`Download failed: ${res.statusText}`);
            const blob = await res.blob();
            const href = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = href;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(href);
            a.remove();
        } catch (err) {
            console.error(err);
            showMessage(`Failed to download ${filename}.`, 'error');
        }
    };

    // Dynamically set className for the message
    const messageClassName = `admin-msg ${adminMsg.type} ${adminMsg.text ? 'visible' : ''}`;

    return (
        // New class for the body background
        <div className="admin-page-body">
            <main className="admin-container">
                <h2>Admin Panel</h2>
                
                {/* New message div with dynamic classes */}
                <div className={messageClassName}>
                    {adminMsg.text}
                </div>

                {!isLoggedIn ? (
                    <form className="admin-form" onSubmit={handleLogin}>
                        <input type="text" name="username" placeholder="Username" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <button type="submit" className="btn-admin btn-admin-primary">Login</button>
                    </form>
                ) : (
                    <div className="download-section">
                        <h3>Downloads</h3>
                        <p>Access participant data and submitted files.</p>
                        <button 
                            className="btn-admin btn-admin-primary" 
                            onClick={() => handleDownload(`${process.env.NEXT_PUBLIC_API_URL}/admin/download`, 'participants.xlsx')}>
                            Download Excel Sheet
                        </button>
                        <button 
                            className="btn-admin btn-admin-secondary" 
                            onClick={() => handleDownload(`${process.env.NEXT_PUBLIC_API_URL}/admin/download-pdfs`, 'all_pdfs.zip')}>
                            Download All PDFs (ZIP)
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}