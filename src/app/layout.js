import { Bebas_Neue, Barlow_Condensed, Barlow } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
})

const barlow = Barlow({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-barlow',
})

export const metadata = {
  title: 'BikeModPK | Build. Ride. Repeat.',
  description: 'Pakistan ka #1 bike modification platform',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable}`}>
        {children}
      </body>
    </html>
  )
}