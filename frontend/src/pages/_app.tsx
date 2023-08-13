import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import { AuthProvider, useAuth } from '@/components/authContext';
import { toast, ToastContainer } from 'react-toastify';
import { Bugfender } from '@bugfender/sdk';

const metadata = {
  title: 'Think.Devs',
  description: 'Think.Devs is a community of developers and designers who are passionate about creating the best products and services.',
};
const  checkStatus = async() => {
  const response =  await fetch('https://thinkdevs.onrender.com/api/check', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
      }
  }
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <div className='main'>
        <div className='gradient' />
      </div>
      <div className=' min-w-[100vw] min-h-[100vh] '>
        <Head>
          <title>{metadata.title}</title>
          <meta name='description' content={metadata.description} />
        </Head>
      <AuthProvider>
          < Navbar />
        <div className='app'>
          <Component {...pageProps} />
          {/* </> */}
        </div>
    </AuthProvider>
          <ToastContainer />
      </div>
    </div>
  );
};

export default App;



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
      NextBugfender.sendUserFeedback(
        'FCP Warning',
        'The speed of loading this page may be moderate.'
      );
    }
    if (value > 4000) {
      NextBugfender.error(
        `${name} value ${value} is completely out of range and the speed is slow.`
      );
      NextBugfender.sendIssue(
        'Issue with FCP',
        'The speed of loading this page may be slow. Creating an issue.'
      );
    }
  } else if (name === 'LCP') {
    if (value >= 0 && value <= 2500) {
      NextBugfender.log(`${name} value ${value} is in range and the speed is fast.`);
    } else if (value > 2500 && value <= 4000) {
      NextBugfender.warn(
        `${name} value ${value} is a bit out of range and the speed is moderate.`
      );
      NextBugfender.sendUserFeedback(
        'LCP Warning',
        'The speed of loading this page may be moderate.'
      );
    }
    if (value > 4000) {
      NextBugfender.error(
        `${name} value ${value} is completely out of range and the speed is slow.`
      );
      NextBugfender.sendIssue(
        'Issue with LCP',
        'The speed of loading this page may be slow. Creating an issue.'
      );
    }
  } else if (name === 'CLS') {
    if (value >= 0 && value <= 0.1) {
      NextBugfender.log(`${name} value ${value} is in range and the speed is fast.`);
    } else if (value > 0.1 && value <= 0.25) {
      NextBugfender.warn(
        `${name} value ${value} is a bit out of range and the speed is moderate.`
      );
      NextBugfender.sendUserFeedback(
        'CLS Warning',
        'The speed of loading this page may be moderate.'
      );
    }
    if (value > 0.25) {
      NextBugfender.error(
        `${name} value ${value} is completely out of range and the speed is slow.`
      );
      NextBugfender.sendIssue(
        'Issue with CLS',
        'The speed of loading this page may be slow. Creating an issue.'
      );
    }
  } else if (name === 'FID') {
    if (value >= 0 && value <= 100) {
      NextBugfender.log(`${name} value ${value} is in range and the speed is fast.`);
    } else if (value > 100 && value <= 300) {
      NextBugfender.warn(
        `${name} value ${value} is a bit out of range and the speed is moderate.`
      );
      NextBugfender.sendUserFeedback(
        'FID Warning',
        'The speed of loading this page may be moderate.'
      );
    }
    if (value > 300) {
      NextBugfender.error(
        `${name} value ${value} is completely out of range and the speed is slow.`
      );
      NextBugfender.sendIssue(
        'Issue with FID',
        'The speed of loading this page may be slow. Creating an issue.'
      );
    }
  } else {
    NextBugfender.log(`${name} value is: ${value}`);
  }
};

export function reportWebVitals(metric: Metric) {
  sendAnalytics(metric);
}
