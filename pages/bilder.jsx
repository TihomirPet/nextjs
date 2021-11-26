import Layout from '@/components/Layout';
import Image from 'next/image';
 import hongKong from'@/img/hong-kong.jpg'

export default function Bilder() {
  return (
    <Layout title={'Bilder Next.js'}>
      <Image
        src={hongKong}
        alt='hong kong'
      
        layout='responsive'
        placeholder='blur'
      />
      <img
        className='logo'
        src='/img/logo@2x.jpg'
        srcSet='/img/logo@1x.jpg 1x,/img/logo@2x.jpg 2x'
        alt='Bildbeschreibung'
        height='320'
        width='100'
        loading='lazy'
      />

      <img
        className='image'
        src='https://picsum.photos/id/1011/900/450'
        srcSet='https://picsum.photos/id/1011/450/225 450w, https://picsum.photos/id/1011/900/450 900w, https://picsum.photos/id/1011/1350/675 1350w, https://picsum.photos/id/1011/1800/900 1800w'
        sizes='(max-width:50rem) 90vw, 48rem'
        alt=''
        width='2'
        height='1'
        loading='lazy'
      />

      <picture>
        <source
          media='(max-width: 30rem) and (orientation: portrait)'
          srcSet='/img/header-image-portrait.jpg'
        />
        <source
          media='(max-width: 40rem) and (orientation: portrait)'
          srcSet='/img/header-image-square.jpg'
        />
        <img
          className='image'
          src='/img/header-image-landscape@1000.jpg'
          srcSet='/img/header-image-landscape@1000.jpg 1000w,/img/header-image-landscape@1500.jpg 1500w,/img/header-image-landscape@2000.jpg 2000w'
          sizes='(max-width: 52rem) 90vw, 50rem'
          loading='lazy'
          alt=''
        />
      </picture>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
        vero quidem accusantium neque, dolorum iure quod ullam maxime totam
        autem error fugit placeat molestiae asperiores temporibus
        necessitatibus? Consequuntur, qui amet!
      </p>

      <Image
        src='/img/hong-kong.jpg'
        alt='hong kong'
        width={5184}
        height={3456}
        layout='responsive'
      />
    </Layout>
  );
}
