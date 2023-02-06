import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { CartItemsProvider } from './Store/CartStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartItemsProvider>
        <App />
    </CartItemsProvider>
);
