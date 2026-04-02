import "@/styles/app.scss"
import { Inter } from 'next/font/google'
import ClientWrapper from "@/components/ClientWrapper.jsx"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rubel Mondol | SEO Specialist Portfolio',
  description: 'Professional SEO specialist helping businesses grow with data-driven SEO, technical optimization, and content strategy.',
  keywords: 'Rubel Mondol, SEO Specialist, SEO Expert, SEO Portfolio, Search Engine Optimization, On Page SEO, Technical SEO, Keyword Research, SEO Consultant, Freelance SEO Specialist',
  authors: [{ name: 'Rubel Mondol' }],
  openGraph: {
    title: 'Rubel Mondol | SEO Specialist Portfolio – Rank Higher & Grow',
    description: 'Rubel Mondol is a professional SEO specialist helping businesses rank higher on Google with proven on-page, technical, and content SEO strategies.',
    url: 'https://rubeltech.com/',
    siteName: 'Rubel Mondol Portfolio',
    images: [
      {
        url: 'https://rubeltech.com/images/pictures/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubel Mondol | SEO Specialist Portfolio',
    description: 'Professional SEO specialist helping businesses grow with data-driven SEO, technical optimization, and content strategy.',
    images: ['https://rubeltech.com/images/pictures/og-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className} style={{ backgroundColor: '#111111' }}>
        <div id="root">
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </div>
      </body>
    </html>
  )
}
