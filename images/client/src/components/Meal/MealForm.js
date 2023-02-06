import React, { useContext, useRef } from 'react';
import styles from './MealForm.module.css';
import Input from '../UI/Input';
import CartItemsContext from '../../Store/CartStore';

function MealForm(props) {
    const inputRef = useRef();
    const ctx = useContext(CartItemsContext);

    const mealSubmitHandler = function (event) {
        event.preventDefault();
        const {
            current: {
                inputRef: {
                    current: { value: enteredAmount },
                },
                activate,
            },
        } = inputRef;
        const enteredAmountNumber = +enteredAmount;
        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 10
        ) {
            activate();
            return;
        }
        ctx.addCartItem(props.meal, enteredAmountNumber);
    };
    return (
        <form className={styles.form} onSubmit={mealSubmitHandler}>
            <Input
                ref={inputRef}
                label="Amount:"
                input={{
                    id: 'amount_' + props.meal.id,
                    type: 'number',
                    min: '1',
                    max: '10',
                    step: '1',
                    defaultValue: '1',
                }}
            >
                Amount
            </Input>
            <button>+Add</button>
        </form>
    );
}
export default MealForm;
