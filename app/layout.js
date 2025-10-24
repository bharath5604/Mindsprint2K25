import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

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
        
        {/* --- MODIFICATION START: Corrected Banner Structure --- */}
        <div className="attractive-banner">
          <div className="banner-logo">
            <Image src="/logos/college-logo.jpeg" alt="College Logo" width={65} height={65} />
          </div>

          <div className="banner-details">
            <h2>Potti Sriramulu Chalavadi Mallikarjuna Rao</h2>
            <h3>College of Engineering & Technology (Autonomous)</h3>
            <p>Sponsored by SKPVV Hindu High Schools Committee | Approved by AICTE | Affiliated to JNTU Kakinada</p>
          </div>

          <div className="banner-accreditations">
            <div className="accreditation-item">
              <Image src="/logos/naac-logo.png" alt="NAAC Logo" width={60} height={60} />
            </div>
            <div className="accreditation-item">
              <Image src="/logos/nba.jpg" alt="NBA Logo" width={70} height={50} />
            </div>
          </div>
        </div>
        {/* --- MODIFICATION END --- */}
        
        <Navigation />
        
        {children}

      </body>
    </html>
  );
}