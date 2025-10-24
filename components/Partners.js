// components/Partners.js

import Image from 'next/image';

const logos = [
  { src: '/logos/logos.png', alt: 'Partner Logo 1' },
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
                height={75}
                className="logo-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}