'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        // This calculation now uses the new banner height from the CSS
        top: targetElement.offsetTop - (80 + 70), // banner height + navbar height
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

        {pathname === '/' ? (
          // Full navigation menu for the homepage
          <ul className="nav-menu">
            <li><a href="#home" onClick={handleSmoothScroll}>Home</a></li>
            <li><a href="#about" onClick={handleSmoothScroll}>About</a></li>
            <li><a href="#tracks" onClick={handleSmoothScroll}>Tracks</a></li>
            {/* --- MODIFICATION: Added the Partners link --- */}
            <li><a href="#partners" onClick={handleSmoothScroll}>Partners</a></li>
            <li><a href="#contact" onClick={handleSmoothScroll}>Contact</a></li>
            <li><Link href="/register" className="register-btn">Register Now</Link></li>
          </ul>
        ) : (
          // Only the Home button for other pages
          <Link href="/" className="home-btn" style={{marginTop: '0', marginLeft: '0'}}>
            Home
          </Link>
        )}
        
      </div>
    </nav>
  );
}