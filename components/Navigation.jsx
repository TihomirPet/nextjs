import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className='site-navigation'>
      <Link href='/'>
        <a>Start</a>
      </Link>
      <Link href='/bilder'>
        <a>Bilder</a>
      </Link>
      <Link href='/news'>
        <a>News</a>
      </Link>
      <Link href='/blogs'>
        <a>Blog</a>
      </Link>
      <Link href='/standorte'>
        <a>standorte</a>
      </Link>
    </nav>
  );
}
