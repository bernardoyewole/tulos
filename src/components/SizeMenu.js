import { IoCloseOutline } from 'react-icons/io5';

function SizeMenu({ isOpen, onClose }) {
    return (
        <div
            className={`fixed top-0 right-0 h-full w-[460px] bg-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                } z-50 duration-500`}
        >
            <div className="px-4 py-6 flex justify-between items-center">
                <h2 className="text-center text-[15px] w-full">ADD TO BAG</h2>
                <button onClick={onClose}>
                    <IoCloseOutline className="text-3xl" />
                </button>
            </div>

            <div className="p-4">
                <div className="flex gap-4">
                    {/* Placeholder for the image */}
                    <img
                        src="https://via.placeholder.com/100"
                        alt="Product"
                        className="w-20 h-28 object-cover"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">LOOSE FIT UTILITY PANTS</h3>
                        <p className="text-lg">$74.99</p>
                        <p className="text-sm">Selected colour: Beige</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-2">SELECT SIZE</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {/* Placeholder sizes */}
                        {['30', '32', '34', '36'].map((size) => (
                            <button
                                key={size}
                                className="py-2 px-4 border text-sm hover:bg-gray-200"
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <button className="w-full bg-black text-white py-3 font-semibold mb-4">
                        ADD TO BAG
                    </button>
                    <button className="w-full border py-3 font-semibold">
                        GO TO PRODUCT
                    </button>
                </div>
            </div>
        </div>
    );
}
export default SizeMenu;