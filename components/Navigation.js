'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
  const pathname = usePathname();

  // Handler for smooth scroll, only used on the homepage
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 130, // Offset for fixed banner + nav
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

        {/* --- MODIFICATION START: Show different buttons based on page --- */}
        {pathname === '/' ? (
          // If on the homepage, show the full navigation menu
          <ul className="nav-menu">
            <li><a href="#home" onClick={handleSmoothScroll}>Home</a></li>
            <li><a href="#about" onClick={handleSmoothScroll}>About</a></li>
            <li><a href="#tracks" onClick={handleSmoothScroll}>Tracks</a></li>
            <li><a href="#contact" onClick={handleSmoothScroll}>Contact</a></li>
            <li><a href="#partners" onClick={handleSmoothScroll}>Partners</a></li>
            <li><Link href="/register" className="register-btn">Register Now</Link></li>
          </ul>
        ) : (
          // If on any other page (e.g., /register), show only the Home button
          <Link href="/" className="home-btn" style={{marginTop: '0', marginLeft: '0'}}>
            Home
          </Link>
        )}
        {/* --- MODIFICATION END --- */}
        
      </div>
    </nav>
  );
}