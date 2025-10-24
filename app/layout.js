// ... imports
import Image from 'next/image';

// ... metadata

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* ... head tag ... */}
      <body className={inter.className}>
        
        <div className="attractive-banner">
          {/* --- MODIFICATION START: Added a wrapper div for mobile layout --- */}
          <div className="banner-top-row">
            <div className="banner-logo">
              <Image src="/logos/college-logo.png" alt="College Logo" width={65} height={65} />
            </div>
            <div className="banner-accreditations">
              <div className="accreditation-item">
                <Image src="/logos/naac-logo.png" alt="NAAC Logo" width={50} height={50} />
                <span>A++ Grade</span>
              </div>
              <div className="accreditation-item">
                <Image src="/logos/nba-logo.png" alt="NBA Logo" width={70} height={50} />
                <span>Accredited</span>
              </div>
            </div>
          </div>
          {/* --- MODIFICATION END --- */}

          <div className="banner-details">
            <h2>Potti Sriramulu Chalavadi Mallikarjuna Rao College of Engineering & Technology</h2>
            <h3>(Autonomous)</h3>
            <p>Sponsored by SKPVV Hindu High Schools Committee, Estd: 1906 | Approved by AICTE | Affiliated to JNTU Kakinada</p>
          </div>
        </div>
        
        <Navigation />

        {children}
        
      </body>
    </html>
  );
}