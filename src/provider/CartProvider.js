import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { email, isAuthenticated } = useAuth();

    const fetchCartItems = async () => {
        if (isAuthenticated) {
            try {
                const response = await axios.get(`https://tulosapi.azurewebsites.net/api/Cart/${email}`);
                // const response = await axios.get(`https://localhost:44397/api/Cart/${email}`);

                if (response.status === 200) {
                    const cart = response.data;

                    if (cart && cart.length >= 0) {
                        setCartItems(cart);
                    }
                }
            } catch (error) {
                if (error.status === 404) {
                    setCartItems([]);
                    return;
                }
            }
        } else {
            setCartItems([]);
        }
    };

    useEffect(() => console.log(cartItems), [cartItems]);

    const addToCart = async (item) => {
        try {
            const response = await axios.post('https://tulosapi.azurewebsites.net/api/Cart/addToCart', item);
            // const response = await axios.post('https://localhost:44397/api/Cart/addToCart', item);

            if (response.status === 200) {
                console.log(response);
                // Update cart items if the API call is successful
                fetchCartItems();
                return true;
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
        return false;
    };

    const removeFromCart = async (itemId) => {
        try {
            const response = await axios.delete(`https://tulosapi.azurewebsites.net/api/Cart/removeFromCart/${itemId}`);
            // const response = await axios.delete(`https://localhost:44397/api/Cart/removeFromCart/${itemId}`);


            if (response.status === 200) {
                fetchCartItems();
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const clearCart = async (email) => {
        try {
            const response = await axios.delete(`https://tulosapi.azurewebsites.net/api/Cart/clearCart/${email}`);
            // const response = await axios.delete(`https://localhost:44397/api/Cart/clearCart/${email}`);

            if (response.status === 200) {
                fetchCartItems();
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    }

    const getCartValue = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Fetch cart items when user is authenticated
    useEffect(() => {
        fetchCartItems();
    }, [isAuthenticated, email]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartValue,
                fetchCartItems
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}

export default CartProvider;
