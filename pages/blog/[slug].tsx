import React from 'react';
import Layout from '../../components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import * as _ from 'lodash';
import { Post } from '../../interfaces';
import ReactMarkdown from 'react-markdown';
import styles from './blog.module.css';
import fetchWithSlug from '../../utils/api/fetchWithSlug';
import fetchPreviewWithSlug from '../../utils/api/fetchPreviewWithSlug';
import Alert from '../../components/Alert';
import fetchAllSlugs from '../../utils/api/fetchAllWithSlugs';

interface BlogPost {
    props: {
        [post: string]: Post;
    };
}

interface context {
    preview: boolean;
    previewData: unknown;
    params: {
        [slug: string]: string | string[];
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
    const slugs = await fetchAllSlugs();
    const paths = slugs.map((slug) => ({
        params: {
            slug: slug,
        },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug: (string | string[]) | null = _.get(context, 'params.slug', null);
    console.log(slug);
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
