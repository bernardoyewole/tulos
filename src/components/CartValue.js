import { useCart } from "../provider/CartProvider"

function CartValue() {
    const { clearCart, getCartValue } = useCart();

    return (
        <div>
            {/* Discounts Section IN PROGRESS */}
            <div className="flex justify-between text-sm mb-3">
                <p className="font-semibold">DISCOUNTS</p>
                <p className="text-indigo-600 font-semibold cursor-pointer">ADD</p>
            </div>

            {/* Order Value */}
            <div className="flex justify-between text-sm mb-3">
                <p className="font-semibold">ORDER VALUE</p>
                <p className="font-semibold">${getCartValue().toFixed(2)}</p>
            </div>

            {/* Promotion */}
            <div className="flex justify-between text-sm mb-3">
                <p className="font-semibold">PROMOTION</p>
                <p className="text-red-500 font-semibold">- $0</p>
            </div>

            {/* Delivery Fee */}
            <div className="flex justify-between text-sm mb-3">
                <p className="font-semibold">DELIVERY FEE</p>
                <p className="font-semibold text-gray-800">FREE</p>
            </div>

            {/* Total */}
            <div className="flex justify-between text-xl mb-4 font-semibold">
                <p>Total</p>
                <p>${getCartValue().toFixed(2)}</p>
            </div>
            {/* Sale Note */}
            <p className="text-xs text-gray-500 mb-6">
                * Sale items are final & cannot be returned. *Item prices exclude tax
            </p>
            <button className="w-full bg-blue-700 text-white py-3 font-semibold mb-3 hover:bg-[#2c5ce3] transition-all duration-300">
                CONTINUE TO CHECKOUT
            </button>
            <button onClick={clearCart} className="w-full border border-black py-3 font-semibold mb-6 hover:bg-gray-100 transition-all duration-300">
                CLEAR CART
            </button>
            {/* Payment Options */}
            <div className="flex justify-center space-x-4 mb-6">
                <img src="/path/to/amex-icon.png" alt="Amex" className="h-8" />
                <img src="/path/to/visa-icon.png" alt="Visa" className="h-8" />
                <img src="/path/to/paypal-icon.png" alt="Paypal" className="h-8" />
                <img src="/path/to/giftcard-icon.png" alt="Gift Card" className="h-8" />
            </div>
            {/* Legal Notes */}
            <p className="text-xs text-gray-500 mb-2">
                Prices and shipping costs are not confirmed until you've reached checkout.
            </p>
            <p className="text-xs text-gray-500 mb-4">
                30-day returns. Read more about our
                <a href="#" className="underline"> return and refund policy</a>.
            </p>
            <p className="text-xs text-gray-500">
                Need help? Please contact
                <a href="#" className="underline"> Customer Support</a>.
            </p>
        </div>
    )
}

export default CartValue
