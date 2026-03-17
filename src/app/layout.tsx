import type { Metadata } from 'next'
import "./globals.css"

export const metadata: Metadata = {
  title: 'Biswadeep Tewari | Links',
  description: 'Full-Stack & AI/ML Engineer. Connect with me here.',
  openGraph: {
    title: 'Biswadeep Tewari | Links',
    description: 'Full-Stack & AI/ML Engineer',
    images: [{ url: 'https://github.com/RajTewari01.png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
