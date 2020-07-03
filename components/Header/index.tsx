import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from './header.module.css';

export interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <div className={styles.header}>
            <Head>
                <title>{title}</title>
            </Head>
            <header>
                <nav>
                    <Link href="/">
                        <a>Koti</a>
                    </Link>{' '}
                    🏠 |{' '}
                    <Link href="/about">
                        <a>Meistä</a>
                    </Link>{' '}
                    👋 |{' '}
                    <Link href="/blog">
                        <a>Blogi</a>
                    </Link>{' '}
                    📚
                </nav>
            </header>
        </div>
    );
};

export default Header;
