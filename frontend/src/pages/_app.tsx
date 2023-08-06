import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import { AuthProvider } from '@/components/authContext';
import { toast, ToastContainer } from 'react-toastify';

const metadata = {
  title: 'Think.Devs',
  description: 'Think.Devs is a community of developers and designers who are passionate about creating the best products and services.',
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
    <div>
      <div className='main'>
        <div className='gradient' />
      </div>
      <div className='px-5 min-w-[100vw] min-h-[100vh] '>
        <Head>
          <title>{metadata.title}</title>
          <meta name='description' content={metadata.description} />
        </Head>
        <div className='app'>
          <Navbar />
          <Component {...pageProps} />
          <ToastContainer />
        </div>
      </div>
    </div>
    </AuthProvider>
  );
};

export default App;
