import React from 'react';
import styles from './card.module.css';

interface Card {
    handleClick: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<Card> = ({ children, handleClick }) => {
    return (
        <div onClick={handleClick} className={styles.card}>
            {children}
        </div>
    );
};

export default Card;
