import React from 'react';
import Layout from '../../components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import postsParser from '../../utils/parsers/postsParser';
import * as _ from 'lodash';
import { Post } from '../../interfaces';
import ReactMarkdown from 'react-markdown';
import styles from './blog.module.css';

interface BlogPost {
    props: {
        [post: string]: Post;
    };
}

const BlogPost: React.FC<BlogPost> = (props) => {
    const post: Post | null = _.get(props, 'post', null);
    return (
        <Layout title="Blog Post">
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
    const slug: string | null = _.get(context, 'params.slug', null);
    if (slug) {
        const url = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID}/entries?content_type=blogPost&fields.slug=${slug}`;
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
            },
        });
        const data = await res.json();
        const post = postsParser(data);
        if (post.length === 1) {
            return {
                props: {
                    post: post[0],
                },
            };
        } else {
            throw new Error('More than one blog post with the same slug found. Can not identify blog post');
        }
    } else {
        throw new Error('No slug found. Can not identify blog post');
    }
};

export default BlogPost;
