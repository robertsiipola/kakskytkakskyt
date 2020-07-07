import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC<Record<never, never>> = () => {
    return (
        <div className={styles.footer}>
            <div>Yhteydenotot: kaksytkakskyt@gmail.com</div>
        </div>
    );
};

export default Footer;
