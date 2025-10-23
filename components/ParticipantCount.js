'use client';

import { useState, useEffect } from 'react';

export default function ParticipantCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadCount() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/participants/count`);
        if (res.ok) {
          const data = await res.json();
          setCount(data.count || 0);
        }
      } catch (err) {
        console.error("Error fetching count:", err);
      }
    }
    loadCount();
  }, []);

  return (
    <div className="hero-badge participant-counter">
      <i className="fas fa-users"></i>
      <span>Total Teams Registered:</span>
      <span className="count-value">{count}</span>
    </div>
  );
}

