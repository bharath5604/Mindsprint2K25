'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
  // Effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      navbar?.classList.toggle('sticky', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler for smooth scroll
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for the fixed navbar
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
        
          <span>Mindsprint2K25</span>
        </div>
        <ul className="nav-menu">
          <li><a href="#home" onClick={handleSmoothScroll}>Home</a></li>
          <li><a href="#about" onClick={handleSmoothScroll}>About</a></li>
          <li><a href="#tracks" onClick={handleSmoothScroll}>Tracks</a></li>
          <li><a href="#contact" onClick={handleSmoothScroll}>Contact</a></li>
          <li><Link href="/register" className="register-btn">Register Now</Link></li>
        </ul>
      </div>
    </nav>
  );
}