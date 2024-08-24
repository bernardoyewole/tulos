import { useState } from "react";
import { TfiHeart } from "react-icons/tfi";
import { IoBagHandleOutline } from "react-icons/io5";
import { PiCaretDown } from "react-icons/pi";

function Detail({ product, articles }) {
    console.log(product);
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleExpand = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    return (
        <div className="w-[40%]">
            <div className="flex justify-between items-center">
                <h2 className="text-md font-semibold leading-[1]">Felted Jacket</h2>
                <TfiHeart className='text-gray-700 text-2xl' />
            </div>
            <p className="text-xl my-6 leading-[1]">$59.99</p>

            <div className="mb-6">
                <span className="text-gray-800 font-semibold text-sm">Colour - </span>
                <span className="text-gray-500 text-sm">Beige melange</span>
                <div className="flex mt-4 space-x-2">
                    <img src="image-url-1.jpg" alt="Beige Jacket" className="w-16 h-16 border" />
                    <img src="image-url-2.jpg" alt="Black Jacket" className="w-16 h-16 border" />
                    <img src="image-url-3.jpg" alt="Olive Jacket" className="w-16 h-16 border" />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold mb-4">Select size</h3>
                <div className="grid grid-cols-4 gap-1 text-center text-lg">
                    <button className="border py-2">XXS</button>
                    <button className="border py-2">XS</button>
                    <button className="border py-2">S</button>
                    <button className="border py-2">M</button>
                    <button className="border py-2">L</button>
                    <button className="border py-2">XL</button>
                    <button className="border py-2">XXL</button>
                </div>
                {/* <a href="#" className="text-sm text-gray-600 mt-2 inline-block">Size Guide</a> */}
            </div>

            <button className="bg-black text-white py-4 w-full  font-semibold mb-4 flex gap-2 justify-center items-center">
                <IoBagHandleOutline className="text-lg leading-tight" />
                <p className="leading-[1]">Add to bag</p>
            </button>

            <p className="text-center text-red-600 text-sm mb-6">15% off $60 or 20% off $80</p>

            <div className="flex items-center space-x-2">
                <i className="fas fa-store text-xl"></i>
                <div>
                    <p className="font-semibold">Find in store</p>
                    <p className="text-sm text-gray-600">Members get free online returns.</p>
                </div>
            </div>

            <div className="mt-6">
                <div className="border-b">
                    <button
                        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                        onClick={() => toggleExpand('description')}
                    >
                        <span className="font-semibold">Description & fit</span>
                        <span
                            className={`transform transition-transform duration-200 ${expandedSection === 'description' ? 'rotate-180' : ''
                                }`}
                        >
                            <PiCaretDown />
                        </span>
                    </button>
                    {expandedSection === 'description' && (
                        <div className="p-4">
                            <p className="text-gray-600">
                                Here is the detailed description and fit information...
                            </p>
                        </div>
                    )}
                </div>

                <div className="border-b">
                    <button
                        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                        onClick={() => toggleExpand('materials')}
                    >
                        <span className="font-semibold">Materials</span>
                        <span
                            className={`transform transition-transform duration-200 ${expandedSection === 'materials' ? 'rotate-180' : ''
                                }`}
                        >
                            <PiCaretDown />
                        </span>
                    </button>
                    {expandedSection === 'materials' && (
                        <div className="p-4">
                            <p className="text-gray-600">Material details and composition...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Detail