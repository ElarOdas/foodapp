import React from 'react';
import MealItem from './MealItem';
import Card from '../UI/Card';

import styles from './AvailableMeals.module.css';
let entry = <h2>No entries found</h2>;

function AvailableMeals(props) {
    const { meals } = props;
    if (meals.len !== 0) {
        entry = meals.map((meal) => {
            return <MealItem meal={meal} key={meal.id}></MealItem>;
        });
    }
    return (
        <section className={styles.meals}>
            <Card>
                <ul>{entry}</ul>
            </Card>
        </section>
    );
}
export default AvailableMeals;
