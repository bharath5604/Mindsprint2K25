import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Image from 'next/image'; // Import the Image component

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mindsprint2k25 - 36 Hour Hackathon',
  description: 'Join the ultimate coding challenge where innovation meets creativity. Build, compete, and win!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        
        {/* --- MODIFICATION START: New Attractive Banner --- */}
        <div className="attractive-banner">
          <div className="banner-logo">
            <Image src="/logos/college-logo.png" alt="College Logo" width={60} height={60} />
          </div>

          <div className="banner-details">
            <h2>POTTI SRIRAMULU CHALAVADI MALLIKARJUNA RAO</h2>
            <h3>COLLEGE OF ENGINEERING & TECHNOLOGY (AUTONOMOUS)</h3>
            <p>Sponsored by SKPVV Hindu High Schools Committee. Estd: 1906</p>
            <p>Approved by AICTE, New Delhi, Affiliated to JNTU Kakinada</p>
          </div>

          <div className="banner-accreditations">
            <Image src="/logos/naac-logo.png" alt="NAAC A++ Logo" width={60} height={60} className="accreditation-logo" />
            <Image src="/logos/nba-logo.png" alt="NBA Logo" width={80} height={60} className="accreditation-logo" />
          </div>
        </div>
        {/* --- MODIFICATION END --- */}
        
        <Navigation />
        
        {children}

      </body>
    </html>
  );
}