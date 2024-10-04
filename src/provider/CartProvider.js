import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { email, isAuthenticated } = useAuth();

    // Add an item to the cart
    const addToCart = async (item) => {
        try {
            const response = await axios.post('https://tulosapi.azurewebsites.net/api/Cart/addToCart', item);

            if (response.status === 200) {
                // Update cart items if the API call is successful
                setCartItems(prevItems => [...prevItems, item]);
                return true;
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
        return false;
    };

    // Remove an item from the cart
    const removeFromCart = async (itemId) => {
        try {
            const response = await axios.delete(`https://tulosapi.azurewebsites.net/api/Cart/removeFromCart/${itemId}`);

            if (response.status === 200) {
                // Update the cart items state by removing the item from the list
                setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    // Calculate the total cost of all cart items
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Fetch cart items when user is authenticated
    useEffect(() => {
        const fetchCartItems = async () => {
            if (isAuthenticated) {
                try {
                    const response = await axios.get(`https://tulosapi.azurewebsites.net/api/Cart/${email}`);

                    if (response.status === 200) {
                        const cart = response.data;

                        if (cart && cart.length > 0) {
                            setCartItems(cart);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            } else {
                setCartItems([]);
            }
        };

        fetchCartItems();
    }, [isAuthenticated, email]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                getCartTotal,
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
