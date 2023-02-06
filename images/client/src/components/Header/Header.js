import React from 'react';
import MealSummary from '../Meal/MealSummary';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
    return (
        <>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onOpenCart={props.onOpenCart} />
            </header>
            <div className={styles['main-image']}>
                <img src="/meals.jpg" alt="A table with various meals"></img>
            </div>
            <MealSummary />
        </>
    );
}
export default Header;
