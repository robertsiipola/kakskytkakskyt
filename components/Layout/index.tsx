import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';

import styles from './layout.module.css';

export interface LayoutProptypes {
    title: string;
}

const Layout: React.FC<LayoutProptypes> = ({ children, title }) => {
    return (
        <div className={styles.layout}>
            <Header title={title}></Header>
            <Main>{children}</Main>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
