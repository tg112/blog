import React from 'react'
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { getAllPosts, getSinglePost } from '../../lib/notionApi'

export const getStaticProps = async ({ params }: {params: {slug: string}}) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post
    },
    revalidate: 60 * 60 * 6
  }
}

// 動的ルーティングの場合、getStaticPathsが必要
export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  }
}

const Post = ({ post }) => {
  return (
    <section>
      <p>{post.metadata.title}</p>
      <ReactMarkdown components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              // eslint-disable-next-line react/no-children-prop
              children={String(children).replace(/\n&/, "")}
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code className={className} {...props}>{children}</code>
          )
        }
        }
      }>{post.markdown}</ReactMarkdown>
    </section>
  )
}

export default Post