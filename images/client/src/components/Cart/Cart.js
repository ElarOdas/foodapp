import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItemsContext from '../../Store/CartStore';
import CartItem from '../Cart/CartItem';

function Cart(props) {
    let cartItems = <p>No items in your Cart</p>;
    const ctx = useContext(CartItemsContext);

    const { items, totalCost, addCartItem, removeCartItem } = ctx;

    const isCartEmpty = items.length === 0;

    const onOrderHandler = function (event) {
        if (isCartEmpty) {
            console.log('You need to add food to your cart first');
        } else {
            console.log('Your food will arrive shortly');
        }
    };

    if (!isCartEmpty) {
        cartItems = items.map((element) => {
            const {
                amount,
                item: { price, name, id },
            } = element;

            return (
                <ul className={styles['cart-items']} key={id}>
                    <CartItem
                        amount={amount}
                        price={price}
                        name={name}
                        onRemove={removeCartItem.bind(null, element.item, 1)}
                        onAdd={addCartItem.bind(null, element.item, 1)}
                    />
                </ul>
            );
        });
    }

    return (
        <Modal
            onCloseCart={props.onCloseCart}
            modal={{
                backdrop: {
                    onClick: props.onCloseCart,
                },
                modal: {},
                backdropId: 'backdrop-root',
                modalId: 'modal-root',
            }}
        >
            {cartItems}
            <div className={styles.total}>
                <span>Total cost : </span>
                <span>{totalCost.toFixed(2)} €</span>
            </div>
            <div className={styles.actions}>
                <button
                    className={styles['button--alt']}
                    onClick={props.onCloseCart}
                >
                    Dismiss
                </button>
                {!isCartEmpty && (
                    <button className={styles.button} onClick={onOrderHandler}>
                        Order
                    </button>
                )}
            </div>
        </Modal>
    );
}
export default Cart;
