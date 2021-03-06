import React from 'react';

import styles from './main.module.css';

const Main: React.FC<unknown> = ({ children }) => {
    return <div className={styles.main}>{children}</div>;
};

export default Main;
