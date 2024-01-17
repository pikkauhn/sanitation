import type { Metadata } from 'next'
import 'primereact/resources/themes/lara-dark-blue/theme.css'
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css';

import Providers from './components/Providers';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Searcy Sanitation',
  description: 'Bin Tracking for Searcy Sanitation Department',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='className'>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
