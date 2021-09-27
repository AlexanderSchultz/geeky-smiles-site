import React, { ReactChild } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from './link';

const name = 'Alex Schultz';
export const siteTitle = 'Alex Schultz\'s Personal Blog';

interface LayoutProps {
  children: ReactChild | ReactChild[];
  home: boolean;
}

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div className="container mx-auto px-4 mt-12 mb-24 mx-auto max-w-xl">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="My personal website built with Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={144}
              width={144}
              alt={name}
            />
            <h1 className="text-2xl">{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className="rounded-full"
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2>
              <Link href="/">
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            ← Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
