import '@/styles/globals.css'
import { Metadata } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Navbar from '@/components/navbar';
import AddButton from '@/components/AddBtn';

const metadata = {
  title: 'Think.Devs',
  description: 'Think.Devs is a community of developers and designers who are passionate about creating the best products and services.',
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className='main'>
            <div className='gradient' />
      </div>
      <div className="px-5 min-w-[100vw] min-h-[100vh] ">
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>
          <div className='app'>
            <Navbar />
            <Component {...pageProps} />
            <AddButton />

          </div>
      </div>
    </div>
  );
}


