'use client';
// This page needs to be a client component for the smooth scroll event handler.

import Link from 'next/link';
// --- MODIFICATION: Import the new SheetCount component ---
import SheetCount from '@/components/SheetCount'; 
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
   // --- ADD THIS FUNCTION FOR THE FLIP EFFECT ---
  const handleCardFlip = (e) => {
    e.currentTarget.classList.toggle('is-flipped');
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
          {/* MODIFICATION: Updated subtitle to mention "Virtual" internships */}
          <p className="hero-subtitle">Join the ultimate coding challenge where innovation meets creativity. Compete for a massive prize pool and 100+ free Virtual internship opportunities!</p>
          <div id="responseMsg"></div>
          
          {/* --- MODIFICATION: Added the SheetCount component --- */}
          <SheetCount />

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
            {/* --- MODIFICATION: Updated with your Razorpay link and fixed target --- */}
            <a href="https://rzp.io/rzp/KOR0p5l" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span>Register Now</span>
              <i className="fas fa-arrow-right"></i>
            </a>
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
              {/* MODIFICATION: Updated card text to mention "virtual" internships */}
              <p>Compete for exciting cash prizes and recognition, with 100+ free virtual internships for top teams!</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: Prizes & Rewards (MODIFIED FOR PRIZE POOL) --- */}
      <section id="prizes" className="prizes-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Prizes & Rewards</h2>
            <p className="section-subtitle">Compete for a massive prize pool and kickstart your career.</p>
          </div>
          
          <div className="prize-pool-banner">
              <div className="prize-shine"></div>
              <div className="prize-pool-content">
                  <i className="fas fa-sack-dollar prize-pool-icon"></i>
                  <h3 className="prize-pool-title">Total Prize Pool</h3>
                  <p className="prize-pool-amount">Worth ₹3 Lakhs+</p>
                  <p className="prize-pool-description">Including cash prizes, exciting goodies, and valuable resources for the top-performing teams.</p>
              </div>
          </div>

          <div className="internship-banner">
             <div className="prize-shine"></div>
             <div className="internship-content">
                <i className="fas fa-briefcase internship-icon"></i>
                <div className="internship-text">
                  {/* MODIFICATION: Updated h3 to include "Virtual" */}
                  <h3>100+ Free Virtual Internships</h3>
                  <p>Top-performing teams will be offered exclusive internship opportunities to gain real-world experience and accelerate their careers.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
       {/* Tracks Section */}
      <section id="tracks" className="tracks-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title1">Hackathon Tracks</h2>
            <p className="section-subtitle">Choose your domain and start building the future</p>
          </div>
          <div className="tracks-grid">
            
            {/* Card 1: AI & ML */}
            <div className="track-card" onClick={handleCardFlip}>
              <div className="track-card-inner">
                <div className="track-card-front">
                  <div className="track-icon ai-ml"><i className="fas fa-brain"></i></div>
                  <h3>Intellect Innovators</h3>
                  <p>Artificial Intelligence & Machine Learning.</p>
                </div>
                <div className="track-card-back">
                  <h3>AI & ML</h3>
                  <p>Dive into data science, neural networks, and predictive modeling. Build intelligent systems that learn, adapt, and solve complex problems using NLP, computer vision, or reinforcement learning.</p>
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>

            {/* Card 2: IoT & Robotics */}
            <div className="track-card" onClick={handleCardFlip}>
              <div className="track-card-inner">
                <div className="track-card-front">
                  <div className="track-icon robotics"><i className="fas fa-robot"></i></div>
                  <h3>Bot Builds</h3>
                  <p>IoT, Robotics, and Automation.</p>
                </div>
                <div className="track-card-back">
                  <h3>IoT & Robotics</h3>
                  <p>Create smart devices that connect to the internet or build autonomous robots. Focus on hardware integration, sensor data processing, and real-world automation solutions.</p>
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>

            {/* Card 3: Cyber Security & Blockchain */}
            <div className="track-card" onClick={handleCardFlip}>
              <div className="track-card-inner">
                <div className="track-card-front">
                  <div className="track-icon cyber"><i className="fas fa-shield-alt"></i></div>
                  <h3>Code Guardians</h3>
                  <p>Cybersecurity and Blockchain.</p>
                </div>
                <div className="track-card-back">
                  <h3>Cyber & Blockchain</h3>
                  <p>Develop secure, decentralized applications (DApps) or create tools for ethical hacking, encryption, and threat detection. Protect digital assets and ensure data integrity.</p>
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>

            {/* Card 4: Electrical Vehicles */}
            <div className="track-card" onClick={handleCardFlip}>
              <div className="track-card-inner">
                <div className="track-card-front">
                  <div className="track-icon mobile"><i className="fas fa-car"></i></div>
                  <h3>Eco Drivers</h3>
                  <p>Electrical Vehicle Technology.</p>
                </div>
                <div className="track-card-back">
                  <h3>Electrical Vehicles</h3>
                  <p>Innovate for the future of mobility. Work on EV battery management systems, smart charging station networks, vehicle-to-grid (V2G) technology, or enhanced navigation for electric travel.</p>
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>

            {/* Card 5: Women Empowerment */}
            <div className="track-card" onClick={handleCardFlip}>
              <div className="track-card-inner">
                <div className="track-card-front">
                  <div className="track-icon women"><i className="fas fa-venus"></i></div>
                  <h3>Femine Sakthi</h3>
                  <p>Women Empowerment Technologies.</p>
                </div>
                <div className="track-card-back">
                  <h3>Women Empowerment</h3>
                  <p>Create tech solutions that address challenges faced by women. Focus on projects related to safety, health, financial inclusion, education, or bridging the gender gap in technology.</p>
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>

            {/* Card 6: Business Plan */}
            <div className="track-card" onClick={handleCardFlip}>
              <div className="track-card-inner">
                <div className="track-card-front">
                  <div className="track-icon business-plan"><i className="fas fa-chart-line"></i></div>
                  <h3>Plan Horizons</h3>
                  <p>Business Planning and Strategy.</p>
                </div>
                <div className="track-card-back">
                  <h3>Business Plan</h3>
                  <p>Develop a comprehensive business model for a tech startup. This track focuses on market analysis, value proposition, revenue streams, and creating a scalable plan for a viable product.</p>
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>

            {/* Card 7: Bio-medical */}
            <div className="track-card" onClick={handleCardFlip}>
              <div className="track-card-inner">
                <div className="track-card-front">
                  <div className="track-icon biomedical"><i className="fas fa-heartbeat"></i></div>
                  <h3>Medi Minds</h3>
                  <p>Biomedical Technologies.</p>
                </div>
                <div className="track-card-back">
                  <h3>Bio-medical</h3>
                  <p>Innovate at the intersection of health and technology. Build solutions for medical diagnostics, design wearable health monitors, improve telemedicine, or create assistive devices for accessibility.</p>
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>

            {/* Card 8: Mobile & Web */}
            <div className="track-card" onClick={handleCardFlip}>
              <div className="track-card-inner">
                <div className="track-card-front">
                  <div className="track-icon mobile"><i className="fas fa-mobile-alt"></i></div>
                  <h3>App Ventures</h3>
                  <p>Mobile and Web Apps.</p>
                </div>
                <div className="track-card-back">
                  <h3>Mobile & Web Apps</h3>
                  <p>Design and build a functional, user-friendly application for mobile or web platforms. Focus on creating a seamless user experience to solve a real-world problem or provide entertainment.</p>
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>
            
            {/* Card 9: Quantum Computing */}
            <div className="track-card" onClick={handleCardFlip}>
              <div className="track-card-inner">
                <div className="track-card-front">
                  <div className="track-icon quantum"><i className="fas fa-atom"></i></div>
                  <h3>Superposition</h3>
                  <p>Quantum Computing Solutions.</p>
                </div>
                <div className="track-card-back">
                  <h3>Quantum Computing</h3>
                  <p>Explore the next frontier of computation. Use quantum simulators or APIs to tackle complex problems in optimization, cryptography, or material science that are intractable for classical computers.</p>
                  <span>Click to flip back</span>
                </div>
              </div>
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
              <p>pscmrmindsprint2k25@gmail.com</p>
            </div>
            <div className="contact-card">
              <i className="fas fa-phone"></i>
              <h3>Phone</h3>
              {/* MODIFICATION: Updated phone numbers */}
              <p>RTR LALITH: +91 9182476691</p>
              <p>CHAITANYA: +91 7396166089</p>
              <p>RTR ANUSHA: +91 7893333750</p>
              <p>DEEPTHI: +91 8639812316</p>
              <p>RTR.VAMSI: +91 7989568835</p>
              <p>PRASANA: +91 9398909087</p>
              
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
              <a href="#prizes" onClick={handleSmoothScroll}>Prizes</a>
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
