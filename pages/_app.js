import { BagContextProvider } from '@/components/BagContext'
import { WishlistContextProvider } from '@/components/WishlistContext'
import '@/styles/globals.css'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import Layout from '@/components/Layout'
import { NavDataContextProvider } from '@/components/NavDataContext'

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <>
    <Head>
      <title>Bella Veu</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    </Head>
    <SessionProvider session={session}>
      <BagContextProvider>
        <WishlistContextProvider>
          <NavDataContextProvider>
            <Layout>
              <Component {...pageProps}/>
            </Layout>
          </NavDataContextProvider>
        </WishlistContextProvider>
      </BagContextProvider>
    </SessionProvider>
    </>
  )
}
