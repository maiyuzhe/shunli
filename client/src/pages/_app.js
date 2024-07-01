import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '../styles/globals.css';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <title>Shunli Chinese</title>
      </Head>
      <Component {...pageProps}/>
    </UserProvider>
  );
};

export default App