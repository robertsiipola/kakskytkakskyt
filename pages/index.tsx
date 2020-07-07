import Layout from '../components/Layout';
import React from 'react';
import Title from '../components/Title';
import ReactMarkdown from 'react-markdown';
import styles from '../components/Title/title.module.css';
import { GetStaticProps } from 'next';
import { postParser } from '../utils/parsers/postsParser';
import { Post } from '../interfaces';

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
    const url = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID}/entries/${process.env.NEXT_PUBLIC_MANIFEST_ID}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        },
    });
    const data = await res.json();
    const post = postParser(data);

    return {
        props: {
            post,
        },
    };
};

export default IndexPage;
