import Head from 'next/head';
import Header from '../components/Header';
import Footer from './Footer';
export default function Layout({ children, title = ' ' }) {
  return (
    <div className='site-wrapper'>
      <Head>
        <title>{title || 'Create Next App'}</title>

        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='site-main'>{title && <h1>{title}</h1>}</main>

      {children}
      <Footer />
    </div>
  );
}
