import React, { useState, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import AvailableMeals from './components/Meal/AvailableMeals';
import useHttp from './hooks/use-http';
import DUMMY_MEALS from './DUMMY_MEALS.json';

function App() {
    const [availMeals, changeMeals] = useState([]);
    const [isCartShown, changeCarShown] = useState(false);
    const { isLoading, error, sendRequest: sendMealsRequest } = useHttp();

    async function addMeals(data) {
        changeMeals((prev) => prev.concat(data));
    }
    useEffect(() => {
        sendMealsRequest(
            {
                url: 'http://localhost:3050/api/meals',
            },
            addMeals
        );
    }, []);

    function openCartHandler() {
        changeCarShown(true);
    }

    function closeCartHandler() {
        changeCarShown(false);
    }

    return (
        // ? Handle State of Modals in the top
        <>
            <Header onOpenCart={openCartHandler} />

            {isCartShown && <Cart onCloseCart={closeCartHandler} />}
            {isLoading && !error && <p>Loading</p>}
            {!isLoading && !error && <AvailableMeals meals={availMeals} />}
            {error && <p>Something went wrong</p>}
        </>
    );
}

export default App;
