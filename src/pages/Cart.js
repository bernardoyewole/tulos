import { useCart } from "../provider/CartProvider";
import CartItem from "../components/CartItem";
import CartValue from "../components/CartValue";
import { useAuth } from "../provider/AuthProvider";

function Cart({ likedProducts, likedProductIds, addToFavorite, onOpenModal }) {
    const { cartItems } = useCart();
    const { isAuthenticated } = useAuth();

    console.log(cartItems);
    const handleLike = (product) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        addToFavorite(product);
    }
    return (
        <div className="my-container">
            {/* <div className="h-[calc(100% - 505px)] overflow-scroll"> */}
            <h1 className='text-4xl font-semibold pt-6 pb-10'>SHOPPING BAG</h1>
            <div className="flex justify-between gap-20">
                <section className="flex flex-col gap-4">
                    {cartItems.map(item => (
                        <CartItem
                            key={item.hmProductId}
                            item={item}
                            handleLike={handleLike}
                            addToFavorite={addToFavorite}
                            likedProductIds={likedProductIds}
                            likedProducts={likedProducts}
                        />
                    ))}
                </section>
                <section>
                    <CartValue />
                </section>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Cart