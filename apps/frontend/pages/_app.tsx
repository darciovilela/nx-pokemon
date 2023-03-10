import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Pokemon Page!</title>
        <link rel="icon" type="image/png" href="pokemon-favicon.png"></link>
      </Head>
      <div className="app">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default CustomApp;
