import { useCart } from "../provider/CartProvider";
import CartItem from "../components/CartItem";
import CartValue from "../components/CartValue";
import { useAuth } from "../provider/AuthProvider";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Cart({ likedProductIds, addToFavorite, onOpenModal, shopNow }) {
    const { cartItems, fetchCartItems } = useCart();
    const { isAuthenticated } = useAuth();

    const handleLike = (product) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        addToFavorite(product);
    }

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div className="my-container mb-10">
            <h1 className='text-4xl font-semibold pt-6 pb-10'>SHOPPING BAG</h1>
            <div className="flex flex-col lg:flex-row justify-between gap-10">
                {cartItems && cartItems.length > 0 ? (
                    <section className="flex flex-col gap-8 w-full lg:w-2/3">
                        {cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                likeProduct={handleLike}
                                addToFavorite={addToFavorite}
                                likedProductIds={likedProductIds}
                            />
                        ))}
                    </section>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[400px] w-full lg:w-2/3">
                        <div className="mb-2">
                            <BsHandbag className="text-4xl" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Your bag is empty</h2>
                        <p className="text-gray-600 text-center mb-4">
                            Items in your bag are patient, they’ll hang out until you’re ready to make a move!
                        </p>
                        <Link
                            to="/favorites"
                            className="bg-black text-white py-3 px-10 font-semibold mb-3 hover:bg-gray-900 transition-all duration-300"
                        >
                            VIEW FAVOURITES
                        </Link>
                        <button
                            onClick={() => shopNow()}
                            className="text-gray-600 underline hover:text-black transition-colors duration-300"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}

                <section className="w-full lg:w-1/3">
                    <CartValue />
                </section>
            </div>
        </div>
    )
}

export default Cart