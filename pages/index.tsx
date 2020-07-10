import Layout from '../components/Layout';
import React from 'react';
import Title from '../components/Title';
import ReactMarkdown from 'react-markdown';
import styles from '../components/Title/title.module.css';
import { GetStaticProps } from 'next';
import { Post } from '../interfaces';
import fetchWithId from '../utils/api/fetchWithId';

const IndexPage: React.FC<Record<string, unknown>> = (props) => {
    const post = props.post as Post;
    return (
        <Layout title="Home | KakskytKakskyt">
            <Title></Title>
            <div className={styles.foo}>
                <h2 className={styles.title}>{post.title}</h2>
                <ReactMarkdown source={post.body} />
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const id = process.env.NEXT_PUBLIC_MANIFEST_ID as string;
    const post = await fetchWithId(id);

    return {
        props: {
            post,
        },
    };
};

export default IndexPage;
