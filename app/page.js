'use client';
// This page needs to be a client component for the smooth scroll event handler.

import Link from 'next/link';
import ParticipantCount from '../components/ParticipantCount';
import Countdown from '@/components/Countdown';
import Partners from '@/components/Partners';
// The 'Navigation' import is removed as it's now in the global layout.

export default function Home() {
  // Handler for smooth scroll on buttons within the page content
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        // MODIFIED: Offset now accounts for both the fixed banner and navbar height (60px + 70px)
        top: targetElement.offsetTop - 130, 
        behavior: 'smooth',
      });
    }
  };

  return (
    // The <Navigation /> component is no longer here.
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="particles"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-trophy"></i>
            <span>36 Hours of Innovation</span>
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">Mindsprint2K25</span>
            <br />College Hackathon
          </h1>
          <p className="hero-subtitle">Join the ultimate coding challenge where innovation meets creativity. Build, compete, and win!</p>
          <div id="responseMsg"></div>
          <ParticipantCount />
          <div className="hero-details">
            <div className="detail-item">
              <i className="fas fa-calendar-alt"></i>
              <span>December 11-12, 2025</span>
            </div>
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <span>36 Hours Non-Stop</span>
            </div>
            <div className="detail-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>PSCMR College</span>
            </div>
          </div>
          <div className="hero-buttons">
            <Link href="/register" className="btn-primary">
              <span>Register Now</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
            <a href="#tracks" className="btn-secondary" onClick={handleSmoothScroll}>
              <span>View Tracks</span>
              <i className="fas fa-eye"></i>
            </a>
          </div>
          <Countdown />
        </div>
      </section>
    
      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Mindsprint2k25</h2>
            <p className="section-subtitle">The ultimate platform for innovation, creativity, and technical excellence</p>
          </div>
          <div className="about-content">
            <div className="about-card">
              <div className="card-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation Hub</h3>
              <p>Transform your ideas into reality with cutting-edge technology and creative solutions</p>
            </div>
            <div className="about-card">
              <div className="card-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Collaboration</h3>
              <p>Work with talented individuals from diverse backgrounds to create amazing projects</p>
            </div>
            <div className="about-card">
              <div className="card-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Competition</h3>
              <p>Compete for exciting prizes and recognition while pushing your limits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="tracks-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title1">Hackathon Tracks</h2>
            <p className="section-subtitle">Choose your domain and start building the future</p>
          </div>
          <div className="tracks-grid">
            <div className="track-card" data-track="ai-ml">
              <div className="track-icon ai-ml"><i className="fas fa-brain"></i></div>
              <h3>Intellect Innovators (AI & ML)</h3>
              <p>Artificial Intelligence & Machine Learning.</p>
            </div>
            <div className="track-card" data-track="iot-robotics">
              <div className="track-icon robotics"><i className="fas fa-robot"></i></div>
              <h3>Bot Builds (IoT, Robotics & Automation)</h3>
              <p>IoT, Robotics, and Automation.</p>
            </div>
            <div className="track-card" data-track="cyber-blockchain">
              <div className="track-icon cyber"><i className="fas fa-shield-alt"></i></div>
              <h3>Code Guardians (Cyber Security & Block Chain)</h3>
              <p>Cybersecurity and Blockchain.</p>
            </div>
            <div className="track-card" data-track="ev">
              <div className="track-icon mobile"><i className="fas fa-car"></i></div>
              <h3>Eco Drivers (Electrical Vehicles)</h3>
              <p>Electrical Vehicle Technology.</p>
            </div>
            <div className="track-card" data-track="women">
              <div className="track-icon women"><i className="fas fa-venus"></i></div>
              <h3>Femine Sakthi (Women Empowermen)<br />Only Women can participate</h3>
              <p>Women Empowerment Technologies.</p>
            </div>
            <div className="track-card" data-track="business-plan">
              <div className="track-icon ai-ml"><i className="fas fa-chart-line"></i></div>
              <h3>Plan Horizons (Business Plan)</h3>
              <p>Business Planning and Strategy.</p>
            </div>
            <div className="track-card" data-track="biomedical">
              <div className="track-icon biomedical"><i className="fas fa-heartbeat"></i></div>
              <h3>Medi Minds (Bio-medical)</h3>
              <p>Biomedical Technologies.</p>
            </div>
            <div className="track-card" data-track="mobile-web">
              <div className="track-icon mobile"><i className="fas fa-mobile-alt"></i></div>
              <h3>App Ventures (Mobile & Web Application)</h3>
              <p>Mobile and Web Apps.</p>
            </div>
            <div className="track-card" data-track="quantum">
              <div className="track-icon ai-ml"><i className="fas fa-atom"></i></div>
              <h3>Superposition (Quantum Computing)</h3>
              <p>Quantum Computing Solutions.</p>
            </div>
          </div>
        </div>
      </section>
        <Partners />
      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Have questions? We&apos;re here to help!</p>
          </div>
          <div className="contact-info">
            <div className="contact-card">
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <p>hackathon2025@pscmr.ac.in</p>
            </div>
            <div className="contact-card">
              <i className="fas fa-phone"></i>
              <h3>Phone</h3>
              <p>Rtr.K.Tejasri: +91 9390866368</p>
              <p>Anusha: +91 78933 33750</p>
              <p>Rtr.N.devi Shashank: +91 92478 88889</p>
              <p>A.Hrudayaraj Akhil: +91 63002 57737</p>
            </div>
            <div className="contact-card">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Location</h3>
              <p>
                <a href="https://www.google.com/maps?q=PSCMR+College,+7-3-6%2F1,+Raghava+Reddy+Street,+Kothapet,+Vijayawada,+520001" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                  PSCMR College, Vijayawada
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span>Mindsprint2K25</span>
            </div>
            <div className="footer-links">
              <a href="#home" onClick={handleSmoothScroll}>Home</a>
              <a href="#about" onClick={handleSmoothScroll}>About</a>
              <a href="#tracks" onClick={handleSmoothScroll}>Tracks</a>
              <a href="#contact" onClick={handleSmoothScroll}>Contact</a>
              <a href="#partners" onClick={handleSmoothScroll}>Partners</a>
            </div>
            <div className="footer-social">
              <a href="https://www.instagram.com/mindsprint2k25_pscmr?utm_source=qr&igsh=MTVrZnVnaThsazhsMQ=="><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Mindsprint2K25. All rights reserved. | Built with innovation at PSCMR College</p>
          </div>
        </div>
      </footer>
    </>
  );
}