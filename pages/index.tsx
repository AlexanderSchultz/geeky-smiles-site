import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Date from '../components/Date';
import Layout, { siteTitle } from '../components/layout';
import Link from '../components/link';
import { getSortedPostsData, PostData } from '../lib/posts';

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

interface HomeProps {
  allPostsData: PostData[]
}

const Home: NextPage<HomeProps> = ({ allPostsData }: HomeProps) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className="text-base">
      <p>
        Heya! I&apos;m Alex Schultz, a full stack web developer.
        I&apos;ve been programming and learning how to code for over a decade now,
        and while I primarily program in C# and React right now,
        I have lots of experience with picking up new languages and frameworks.
      </p>
    </section>
    <section className="text-md pt-1">
      <h2 className="text-l font-bold">Blog</h2>
      <ul className="list-none p-0 m-0">
        {allPostsData.map(({ id, date, title }) => (
          <li className="mb-5" key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className="text-indigo-300">
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export default Home;
