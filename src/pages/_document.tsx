import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href="/images/icon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="description" content="Авиаагрегат-Н - Инновационные решения для электротехнической промышленности" />
        <meta name="theme-color" content="#0284c7" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 