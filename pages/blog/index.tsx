import React from 'react';
import Layout from '../../components/Layout';
import { GetStaticProps } from 'next';
import postsParser from '../../utils/parsers/postsParser';
import { Post } from '../../interfaces';
import PostList from '../../components/PostList';

const Blog: React.FC<Record<string, unknown>> = (props) => {
    const posts = props.posts as Post[];
    return (
        <Layout title="Blog | KakskytKakskyt">
            <h1>Blogi</h1>
            <PostList posts={posts}></PostList>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const url = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID}/entries?content_type=blogPost`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        },
    });
    const data = await res.json();
    const posts = postsParser(data);
    return {
        props: {
            posts,
        },
    };
};

export default Blog;
