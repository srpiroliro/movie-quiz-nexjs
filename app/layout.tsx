import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MovieMatch',
  description: 'Find your next favorite movie or series',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>La meva llista - 3Cat</title>
        <meta name="author" content="CCMA" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ca_ES" />
        <meta property="og:site_name" content="3Cat" />
        <meta
          property="og:image"
          content="https://img.3cat.cat/multimedia/png/0/2/1697462461920_1920x1080.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@som3cat" />
        <meta
          name="twitter:image"
          content="https://img.3cat.cat/multimedia/png/0/2/1697462461920_1920x1080.png"
        />
        <meta
          name="twitter:image:src"
          content="https://img.3cat.cat/multimedia/png/0/2/1697462461920_1920x1080.png"
        />
        <meta
          name="description"
          content="En aquesta pàgina trobaràs tots els vídeos, àudios  i programes que hagis anat guardant dins de 3Cat, per poder-los localitzar més ràpidament."
        />
        <meta property="og:title" content="La meva llista - 3Cat" />
        <meta
          property="og:description"
          content="En aquesta pàgina trobaràs tots els vídeos, àudios  i programes que hagis anat guardant dins de 3Cat, per poder-los localitzar més ràpidament."
        />
        <meta
          property="og:url"
          content="https://www.3cat.cat/3cat/meva-llista/"
        />
        <meta name="twitter:title" content="La meva llista - 3Cat" />
        <meta
          name="twitter:description"
          content="En aquesta pàgina trobaràs tots els vídeos, àudios  i programes que hagis anat guardant dins de 3Cat, per poder-los localitzar més ràpidament."
        />
        <meta
          name="twitter:url"
          content="https://www.3cat.cat/3cat/meva-llista/"
        />
        <meta name="next-head-count" content="20" />
        <link rel="preconnect" href="https://statics.3cat.cat/" />
        <link rel="preconnect" href="https://img.3cat.cat/" />
        <link rel="preconnect" href="https://assets.adobedtm.com/" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/_resources/favicons/3cat-mstile-144x144.png?v=1.2411.7"
        />

        <link
          rel="preload"
          href="/3cat-landing/88b76cea6fb64307.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="/3cat-landing/88b76cea6fb64307.css"
          data-n-g=""
        />
        <link
          rel="preload"
          href="/3cat-landing/90d23763af3f9338.css"
          as="style"
        />
        <link rel="stylesheet" href="/3cat-landing/90d23763af3f9338.css" />
        <link
          rel="preload"
          href="/3cat-landing/b455a166472aaf9c.css"
          as="style"
        />
        <link rel="stylesheet" href="/3cat-landing/b455a166472aaf9c.css" />
        <link
          rel="preload"
          href="/3cat-landing/cf8af483de368ba1.css"
          as="style"
        />
        <link rel="stylesheet" href="/3cat-landing/cf8af483de368ba1.css" />
        <link
          rel="preload"
          href="/3cat-landing/9d4812d2deab956a.css"
          as="style"
        />
        <link rel="stylesheet" href="/3cat-landing/9d4812d2deab956a.css" />
        <link
          rel="preload"
          href="/3cat-landing/dd37a0ee214f663d.css"
          as="style"
        />
        <link rel="stylesheet" href="/3cat-landing/dd37a0ee214f663d.css" />
        <link
          rel="preload"
          href="/3cat-landing/5e07c247669d6555.css"
          as="style"
        />
        <link rel="stylesheet" href="/3cat-landing/5e07c247669d6555.css" />
        <link
          rel="preload"
          href="/3cat-landing/7e45b7484c0873e4.css"
          as="style"
        />
        <link rel="stylesheet" href="/3cat-landing/7e45b7484c0873e4.css" />

        <link
          rel="stylesheet"
          type="text/css"
          href="/3cat-landing/e5e7c436e2d564da.css"
        />

        <style type="text/css">
          {`
    @font-face {
      font-weight: 400;
      font-style: normal;
      font-family: circular;

      src: url('chrome-extension://liecbddmkiiihnedobmlmillhodjkdmb/fonts/CircularXXWeb-Book.woff2') format('woff2');
    }

    @font-face {
      font-weight: 700;
      font-style: normal;
      font-family: circular;

      src: url('chrome-extension://liecbddmkiiihnedobmlmillhodjkdmb/fonts/CircularXXWeb-Bold.woff2') format('woff2');
    }
    `}
        </style>
        <link
          rel="stylesheet"
          type="text/css"
          href="/3cat-landing/4cad3d93afbccb1f.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/3cat-landing/b7e52a4d8634b5df.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/3cat-landing/8a6f09ab6ba8f6b3.css"
        />
      </head>
      <body className={`${inter.className} trescat`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}