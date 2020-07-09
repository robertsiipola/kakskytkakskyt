import React from 'react';
import Layout from '../../components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import postsParser from '../../utils/parsers/postsParser';
import * as _ from 'lodash';
import { Post } from '../../interfaces';
import ReactMarkdown from 'react-markdown';
import styles from './blog.module.css';
import fetchWithSlug from '../../utils/api/fetchWithSlug';
import fetchPreviewWithSlug from '../../utils/api/fetchPreviewWithSlug';
import Alert from '../../components/Alert';

interface BlogPost {
    props: {
        [post: string]: Post;
    };
}

const BlogPost: React.FC<BlogPost> = (props) => {
    const post: Post | null = _.get(props, 'post', null);
    const preview: boolean = _.get(props, 'preview', false);
    return (
        <Layout title="Blog Post">
            <Alert preview={preview}></Alert>
            {post && (
                <div className={styles.blog}>
                    <h1>{post.title}</h1>
                    <h4>Teksti: {post.author?.firstName}</h4>
                    <ReactMarkdown source={post.body} />
                </div>
            )}
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
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
    const paths = posts.map((post) => ({
        params: {
            slug: post.slug,
        },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug: (string | string[]) | null = _.get(context, 'params.slug', null);
    if (context.preview) {
        const post = await fetchPreviewWithSlug(slug);
        return {
            props: {
                post: post,
                preview: true,
            },
        };
    } else {
        const post = await fetchWithSlug(slug);
        return {
            props: {
                post: post,
                preview: false,
            },
        };
    }
};

export default BlogPost;
