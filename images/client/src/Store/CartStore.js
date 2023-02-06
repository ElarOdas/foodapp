import React, { useReducer } from 'react';

const itemsTemplate = {
    items: [
        {
            item: {
                id: '',
                name: '',
                description: '',
                price: 0,
            },
            amount: 0,
        },
    ],
    totalCost: 0,
    addCartItem: () => {},
    removeCartItem: () => {},
};

const CartItemsContext = React.createContext(itemsTemplate);

export default CartItemsContext;

// ? For the next Project split here into two files

function reduce(state, action) {
    // extract id of action
    const {
        item: { id: newItemID },
    } = action;
    const { items } = state;
    // Determine if meal is in cart, use uniqueness of id
    const itemIndex = items.findIndex((cartItem) => {
        const {
            item: { id: itemId },
        } = cartItem;
        return itemId === newItemID;
    }); //-1 if not in items, index if in items
    let cartItem;
    // either the cartItem or false
    cartItem = itemIndex !== -1 && items[itemIndex];

    // Determine prices
    const { totalCost } = state;
    const {
        item: { price },
        //For 1 item no amount is required
        amount,
    } = action;
    //add Action :type, meal Object + amount
    //remove Action :type, meal ID of Object + amount

    switch (action.type) {
        case 'add': {
            //Add price of new Item to total

            const newTotalCost = totalCost + price * amount;

            let newItems = [...items];
            let newItem;

            // Case 1: meal is not yet in cart : Add meal + amount
            if (!cartItem) {
                newItem = {
                    item: action.item,
                    amount: amount,
                };
                newItems.unshift(newItem);
            }
            // Case 2: meal is in cart: Add amount to meal
            else {
                newItem = {
                    ...cartItem,
                    amount: cartItem.amount + amount,
                };
                newItems[itemIndex] = newItem;
            }

            return {
                ...state,
                items: newItems,
                totalCost: newTotalCost,
            };
        }
        case 'remove': {
            // Case 1: meal is not in cart: error
            if (!cartItem) {
                console.log('Meal already not in cart');
                return state;
            }
            const newTotalCost = totalCost - cartItem.item.price * amount;
            let newItems = [...items];

            // Case 2: meal is in cart cart.amount <= item.amount
            //         Remove meal from cart
            if (cartItem.amount <= amount) {
                newItems.splice(itemIndex, 1);
                return {
                    ...state,
                    items: newItems,
                    totalCost: newTotalCost,
                };
            }
            // Case 3: meal is in cart cart.amount > item.amount
            //         Remove amount from cart
            else {
                const newItem = {
                    ...cartItem,
                    amount: cartItem.amount - amount,
                };

                newItems[itemIndex] = newItem;
            }
            console.log(newTotalCost);
            return {
                ...state,
                items: newItems,
                totalCost: newTotalCost,
            };
        }
        default:
            console.log('No valid action type was chosen');
            return state;
    }
}

export const CartItemsProvider = function (props) {
    const [state, dispatch] = useReducer(reduce, { items: [], totalCost: 0 });

    //either increases the amount or adds the meal with amount, default 1
    const addCartItem = (item, amount = 1) => {
        console.log(item);
        dispatch({
            type: 'add',
            item: item,
            amount: amount,
        });
    };

    //either decreases the amount or removes the meal if amount, default 1
    const removeCartItem = (item, amount = 1) => {
        console.log('item', item);
        dispatch({
            type: 'remove',
            item: { id: item.id },
            amount: amount,
        });
    };

    return (
        <CartItemsContext.Provider
            value={{
                items: state.items,
                totalCost: state.totalCost,
                addCartItem: addCartItem,
                removeCartItem: removeCartItem,
            }}
        >
            {props.children}
        </CartItemsContext.Provider>
    );
};
