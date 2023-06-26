import './globals.css'
import { Montserrat } from 'next/font/google'
import Provider from './redux/Provider'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'PayE',
  description: 'Payroll management next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        {children}
        </Provider>
        </body>
    </html>
  )
}
