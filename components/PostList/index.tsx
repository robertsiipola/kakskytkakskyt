import React from 'react';
import PostCard from '../PostCard';
import { Post } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import styles from './postlist.module.css';

const PostList: React.FC<Record<string, unknown>> = (props) => {
    const posts = props.posts as Post[];
    return (
        <div>
            <ul className={styles.list}>
                {posts.map((post) => {
                    return (
                        <li key={uuidv4()}>
                            <PostCard
                                title={post.title}
                                description={post.description}
                                slug={post.slug}
                                author={post.author}
                                tags={post.tags}
                            ></PostCard>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PostList;
