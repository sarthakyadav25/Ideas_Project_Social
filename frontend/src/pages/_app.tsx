import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import { AuthProvider } from '@/components/authContext';
import { toast, ToastContainer } from 'react-toastify';
import { Bugfender } from '@bugfender/sdk';

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

// Bugfender analytics Integration 
interface Metric {
  name: string;
  value: number;
}

const sendAnalytics = async ({ name, value }: Metric) => {
  const NextBugfender = (await import('../utils/NextBugfender')).default;
  NextBugfender.init();

  if (name === 'FCP') {
    if (value >= 0 && value <= 2000) {
      NextBugfender.log(`${name} value ${value} is in range and the speed is fast.`);
    } else if (value > 2000 && value <= 4000) {
      NextBugfender.warn(
        `${name} value ${value} is a bit out of range and the speed is moderate.`
      );
      
    }
    if (value > 4000) {
      NextBugfender.error(
        `${name} value ${value} is completely out of range and the speed is slow.`
      );
      
    }
  } else if (name === 'LCP') {
    if (value >= 0 && value <= 2500) {
      NextBugfender.log(`${name} value ${value} is in range and the speed is fast.`);
    } else if (value > 2500 && value <= 4000) {
      NextBugfender.warn(
        `${name} value ${value} is a bit out of range and the speed is moderate.`
      );
      
    }
    if (value > 4000) {
      NextBugfender.error(
        `${name} value ${value} is completely out of range and the speed is slow.`
      );
      
    }
  } else if (name === 'CLS') {
    if (value >= 0 && value <= 0.1) {
      NextBugfender.log(`${name} value ${value} is in range and the speed is fast.`);
    } else if (value > 0.1 && value <= 0.25) {
      NextBugfender.warn(
        `${name} value ${value} is a bit out of range and the speed is moderate.`
      );
      
    }
    if (value > 0.25) {
      NextBugfender.error(
        `${name} value ${value} is completely out of range and the speed is slow.`
      );
    
    }
  } else if (name === 'FID') {
    if (value >= 0 && value <= 100) {
      NextBugfender.log(`${name} value ${value} is in range and the speed is fast.`);
    } else if (value > 100 && value <= 300) {
      NextBugfender.warn(
        `${name} value ${value} is a bit out of range and the speed is moderate.`
      );
      
    }
    if (value > 300) {
      NextBugfender.error(
        `${name} value ${value} is completely out of range and the speed is slow.`
      );
      
    }
  } else {
    NextBugfender.log(`${name} value is: ${value}`);
  }
};

export function reportWebVitals(metric: Metric) {
  sendAnalytics(metric);
}