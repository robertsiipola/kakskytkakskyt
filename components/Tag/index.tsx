import React from 'react';
import styles from './tag.module.css';

type Tag = {
    tag: string;
};

const Tag: React.FC<Tag> = ({ tag }) => {
    return <div className={styles.tag}>#{tag}</div>;
};

export default Tag;
