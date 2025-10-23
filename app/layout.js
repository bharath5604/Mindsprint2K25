import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation'; // Import the Navigation component

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
        
        {/* --- MODIFICATION START: Added Fixed Banner and Navigation --- */}
        <div className="fixed-banner">
          <img src="/colleg_banner.jpg" alt="College Banner" />
        </div>
        <Navigation />
        {/* --- MODIFICATION END --- */}

        {/* This will render the content of your individual pages */}
        {children}

      </body>
    </html>
  );
}