import '../styles/globals.css'
import type { AppProps } from 'next/app'

/**
 * Built-in function into Next.js that returns the global app.
 * @param - All necessary app properties.
 * @returns the app.
 */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
