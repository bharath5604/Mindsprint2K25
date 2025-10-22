import { Inter } from 'next/font/google';
import './globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';// Or use the new @fortawesome packages

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mindsprint2k25 - 36 Hour Hackathon',
  description: 'Join the ultimate coding challenge where innovation meets creativity. Build, compete, and win!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}