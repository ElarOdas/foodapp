import React from 'react';
import styles from './Card.module.css';

function Card(props) {
    const { children, className } = props;
    let parentClasses = '';
    if (className) {
        parentClasses = ' ' + className;
    }
    return <div className={styles.card + parentClasses}> {children} </div>;
}

export default Card;
