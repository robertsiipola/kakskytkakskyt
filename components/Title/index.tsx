import * as React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './title.module.css';

const Title: React.FC<> = () => {
    return (
        <div className={styles.title}>
            <h1>KakskytKakskyt</h1>
        </div>
    );
};

export default Title;
