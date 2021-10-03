import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Date from '../../components/Date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData, PostData } from '../../lib/posts';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id || typeof (params.id) !== 'string') {
    return {
      props: {
        postData: '',
      },
    };
  }

  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};

interface PostProps {
  postData: PostData
}

const Post: NextPage<PostProps> = ({
  postData: {
    title, date, contentHtml,
  },
}: PostProps) => (
  <Layout>
    <Head>
      <title>{title}</title>
    </Head>
    <article>
      <h1 className="text-xl mb-1.5">{title}</h1>
      <div className="text-indigo-300 mb-2"><Date dateString={date} /></div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  </Layout>
);

export default Post;
