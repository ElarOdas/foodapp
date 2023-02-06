import React, { useContext, useState, useEffect } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartItemsContext from '../../Store/CartStore';
import styles from './HeaderCartButton.module.css';

let itemAmount = 0;
function HeaderCartButton(props) {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartItemsContext);

    const { items } = cartCtx;

    itemAmount = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${styles.button} ${
        btnIsHighlighted ? styles.bump : ''
    }`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onOpenCart}>
            <div className={styles.icon}>
                <CartIcon />
            </div>
            Your Cart
            <div className={styles.badge}>{itemAmount}</div>
        </button>
    );
}
export default HeaderCartButton;
