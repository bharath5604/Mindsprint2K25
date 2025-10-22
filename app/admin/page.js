'use client';
import { useState, useEffect } from 'react';
import AnalyticsChart from '../../components/AnalyticsChart'; // Corrected Path

export default function AdminPage() {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminMsg, setAdminMsg] = useState({ text: '', type: '' });
    
    // --- MODIFICATIONS START ---
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loadingAnalytics, setLoadingAnalytics] = useState(false);
    // --- MODIFICATIONS END ---

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
    
    // --- MODIFICATION: Fetch analytics data when logged in ---
    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!token) return;
            setLoadingAnalytics(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch analytics');
                const data = await res.json();
                setAnalyticsData(data);
            } catch (err) {
                console.error(err);
                showMessage('Could not load analytics.', 'error');
            } finally {
                setLoadingAnalytics(false);
            }
        };

        if (isLoggedIn) {
            fetchAnalytics();
        }
    }, [isLoggedIn, token]);


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

    const messageClassName = `admin-msg ${adminMsg.type} ${adminMsg.text ? 'visible' : ''}`;

    return (
        <div className="admin-page-body">
            <main className="admin-container" style={{ maxWidth: isLoggedIn ? '800px' : '420px', transition: 'max-width 0.5s ease' }}>
                <h2>Admin Panel</h2>
                
                <div className={messageClassName}>{adminMsg.text}</div>

                {!isLoggedIn ? (
                    <form className="admin-form" onSubmit={handleLogin}>
                        <input type="text" name="username" placeholder="Username" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <button type="submit" className="btn-admin btn-admin-primary">Login</button>
                    </form>
                ) : (
                    <>
                        {/* --- MODIFICATION: Display Analytics Chart --- */}
                        <div className="analytics-section">
                            <h3>Track Analytics</h3>
                            {loadingAnalytics && <p>Loading chart...</p>}
                            {analyticsData && analyticsData.length > 0 && <AnalyticsChart chartData={analyticsData} />}
                            {analyticsData && analyticsData.length === 0 && <p>No registration data available to display.</p>}
                        </div>

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
                    </>
                )}
            </main>
        </div>
    );
}