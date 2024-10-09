
function CartValue() {
    return (
        <div>
            {/* Discounts Section */}
            <div className="flex justify-between text-sm mb-3">
                <p className="font-semibold">DISCOUNTS</p>
                <p className="text-indigo-600 font-semibold cursor-pointer">ADD</p>
            </div>

            {/* Order Value */}
            <div className="flex justify-between text-sm mb-3">
                <p className="font-semibold">ORDER VALUE</p>
                <p className="font-semibold">$269.94</p>
            </div>

            {/* Promotion */}
            <div className="flex justify-between text-sm mb-3">
                <p className="font-semibold">PROMOTION</p>
                <p className="text-red-500 font-semibold">- $53.94</p>
            </div>

            {/* Delivery Fee */}
            <div className="flex justify-between text-sm mb-3">
                <p className="font-semibold">DELIVERY FEE</p>
                <p className="font-semibold text-gray-800">FREE</p>
            </div>

            {/* Total */}
            <div className="flex justify-between text-xl mb-4 font-semibold">
                <p>Total</p>
                <p>$228.96</p>
            </div>

            {/* Sale Note */}
            <p className="text-xs text-gray-500 mb-6">
                * Sale items are final & cannot be returned. *Item prices exclude tax
            </p>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-3 font-semibold mb-6 hover:bg-gray-800 transition-all">
                CONTINUE TO CHECKOUT
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
