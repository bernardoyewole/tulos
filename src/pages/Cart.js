import { useCart } from "../provider/CartProvider";
import CartItem from "../components/CartItem";
import CartValue from "../components/CartValue";
import { useAuth } from "../provider/AuthProvider";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";

function Cart({ likedProducts, likedProductIds, addToFavorite, onOpenModal, shopNow }) {
    const { cartItems } = useCart();
    const { isAuthenticated } = useAuth();

    const handleLike = (product) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        addToFavorite(product);
    }

    return (
        <div className="my-container mt-[105px] mb-10">
            {/* <div className="h-[calc(100% - 505px)] overflow-scroll"> */}
            <h1 className='text-4xl font-semibold pt-6 pb-10'>SHOPPING BAG</h1>
            <div className="flex justify-between gap-20">
                {cartItems && cartItems.length > 0 ?
                    (<section className="flex flex-col gap-4">
                        {cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                handleLike={handleLike}
                                addToFavorite={addToFavorite}
                                likedProductIds={likedProductIds}
                                likedProducts={likedProducts}
                            />
                        ))}
                    </section>)
                    :
                    (<div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="mb-2">
                            <BsHandbag className="text-4xl" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Your bag is empty</h2>
                        <p className="text-gray-600 text-center mb-4">
                            Items in your bag are patient, they’ll hang out until you’re ready to make a move!
                        </p>
                        <Link to='/favorites' className="bg-black text-white py-3  px-10 font-semibold mb-3 hover:bg-gray-900 transition-all duration-300">
                            VIEW FAVOURITES
                        </Link>
                        <button onClick={() => shopNow()} className="text-gray-600 underline hover:text-black transition-colors duration-300">
                            Continue Shopping
                        </button>
                    </div>)
                }
                <section>
                    <CartValue />
                </section>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Cart