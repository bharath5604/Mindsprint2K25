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
      // Offset is now always the desktop value (80px banner + 70px nav)
      const offset = 150; 
      
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    // This entire <nav> element is now hidden on mobile by the CSS
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span>Mindsprint2K25</span>
        </div>

        {pathname === '/' ? (
          <ul className="nav-menu">
            <li><a href="#home" onClick={handleSmoothScroll}>Home</a></li>
            <li><a href="#about" onClick={handleSmoothScroll}>About</a></li>
            <li><a href="#tracks" onClick={handleSmoothScroll}>Tracks</a></li>
            <li><a href="#partners" onClick={handleSmoothScroll}>Partners</a></li>
            <li><a href="#contact" onClick={handleSmoothScroll}>Contact</a></li>
            <li><Link href="/register" className="register-btn">Register Now</Link></li>
          </ul>
        ) : (
          <Link href="/" className="home-btn" style={{marginTop: '0', marginLeft: '0'}}>
            Home
          </Link>
        )}
      </div>
    </nav>
  );
}