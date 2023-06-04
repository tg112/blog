import type { NextPage } from 'next'
import Head from 'next/head'

import SinglePost from './components/Post/SinglePost'

import { getAllPosts } from '../lib/notionApi'
import { PostType } from './types'
import Layout from './components/Layout'

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts
    },
    revalidate: 60 // ISRで必要。ここでは、60秒後毎に再更新していく。更新頻度によって変える。
  }
}

const Home: NextPage = ({ allPosts }) => {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>
          Notion Blog
        </h1>
        {allPosts.map((post: PostType)  => (
          <div className='mx-4' key={post.title}>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tag={post.tag}
              slug={post.slug}
            />
          </div>
        ))}
        </main>
        </Layout>
    </div>
  )
}

export default Home
