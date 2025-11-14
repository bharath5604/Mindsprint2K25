// File Path: components/SheetCount.js

'use client';

import { useState, useEffect } from 'react';

export default function SheetCount() {
  // Use a placeholder while loading
  const [count, setCount] = useState('...'); 

  useEffect(() => {
    async function loadCount() {
      try {
        // Fetch data from our new API route
        const res = await fetch('/api/get-sheet-count');
        
        if (res.ok) {
          const data = await res.json();
          setCount(data.count || '0');
        } else {
          // If the API returns an error, show 'N/A'
          setCount('N/A');
        }
      } catch (err) {
        console.error("Error fetching sheet count:", err);
        setCount('N/A');
      }
    }

    // Load the count when the component first mounts
    loadCount();

    // Optional: Refresh the count every 30 seconds
    const interval = setInterval(loadCount, 30000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-badge participant-counter">
      <i className="fas fa-users"></i>
      <span>Teams Registered:</span>
      <span className="count-value">{count}</span>
    </div>
  );
}