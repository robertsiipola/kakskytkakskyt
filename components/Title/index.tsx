import * as React from 'react';
import styles from './title.module.css';

const Title: React.FC<unknown> = () => {
    return (
        <div className={styles.title}>
            <h1>KakskytKakskyt</h1>
        </div>
    );
};

export default Title;
