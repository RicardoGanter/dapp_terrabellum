import '../styles/globals.scss'
import {SessionProvider} from 'next-auth/react'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }:AppProps) {
  return <SessionProvider>
  <Component {...pageProps} />
  </SessionProvider>
}
