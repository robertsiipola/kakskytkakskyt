import React from 'react';
import Card from '../Card';
import styles from './postcard.module.css';
import { useRouter } from 'next/router';
import { Author } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import Tag from '../Tag';

type PostCard = {
    title: string;
    description: string;
    slug: string;
    author: Author | null;
    tags: string[] | null;
};

const PostCard: React.FC<PostCard> = ({ title, description, slug, author, tags }) => {
    const router = useRouter();

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        router.push('/blog/[slug]', `/blog/${slug}`, { slug });
    };
    return (
        <div className={styles.postcard}>
            <Card handleClick={handleClick}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.paragraph}>{description}</p>
                {author && (
                    <div className={styles.author}>
                        Teksti: <b>{author.firstName}</b>
                    </div>
                )}
                {tags && (
                    <ul className={styles.list}>
                        {tags.map((tag) => {
                            return (
                                <li key={uuidv4()}>
                                    <Tag tag={tag}></Tag>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </Card>
        </div>
    );
};

export default PostCard;
