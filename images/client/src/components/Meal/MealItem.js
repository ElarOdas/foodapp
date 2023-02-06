import React from 'react';
import MealForm from './MealForm';
import styles from './MealItem.module.css';

function MealItem(props) {
    const { name, description, price } = props.meal;
    return (
        <li className={styles.meal}>
            <div>
                <h3>{name}</h3>
                <div className={styles.description}>{description}</div>
                <div className={styles.price}>{price}€</div>
            </div>
            <div>
                <MealForm meal={props.meal} />
            </div>
        </li>
    );
}
export default MealItem;
