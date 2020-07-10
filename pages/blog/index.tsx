import React from 'react';
import Layout from '../../components/Layout';
import { GetStaticProps } from 'next';
import { Post } from '../../interfaces';
import PostList from '../../components/PostList';
import { fetchAllWithSlugs } from '../../utils/api/fetchAllWithSlugs';

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
    const posts = await fetchAllWithSlugs();
    return {
        props: {
            posts,
        },
    };
};

export default Blog;
