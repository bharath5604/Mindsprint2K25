// components/Partners.js

import Image from 'next/image';

const logos = [
  { src: '/logos/brainovision.png', alt: 'Partner Logo 0' },
    { src: '/logos/Rotary-Midtown-Logo-01.png', alt: 'Partner Logo 1' },
   { src: '/logos/logo1.jpg', alt: 'Partner Logo 2' },
    { src: '/logos/logo2.jpg', alt: 'Partner Logo 3' },
     { src: '/logos/logo3.jpg', alt: 'Partner Logo 4' },
  // Add more logos here
];

export default function Partners() {
  return (
    <section id="partners" className="partners-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">In Association With</h2>
          <p className="section-subtitle">
            We are proud to partner with these innovative organizations to make Mindsprint2K25 a reality.
          </p>
        </div>
        <div className="logos-grid">
          {logos.map((logo, index) => (
            <div key={index} className="logo-item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={80}
                className="logo-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}