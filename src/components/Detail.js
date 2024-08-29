import { useState, useEffect } from "react";
import { TfiHeart } from "react-icons/tfi";
import { IoBagHandleOutline } from "react-icons/io5";
import { PiCaretDown } from "react-icons/pi";

function Detail({ product, currentArticle, changeArticle }) {
    // console.log(product.articlesList);
    const [expandedSection, setExpandedSection] = useState(null);
    const [thumbnails, setThumbnails] = useState([]);
    const [selectedThumbnailCode, setSelectedThumbnailCode] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const toggleExpand = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    useEffect(() => {
        const tempThumbnails = product.articlesList.map(article => ({
            id: article.fabricSwatchThumbnails[0].id,
            code: article.code,
            baseUrl: article.fabricSwatchThumbnails[0].baseUrl
        }));

        const currentThumbnailId = currentArticle.fabricSwatchThumbnails[0].id;
        const currentThumbnailIndex = tempThumbnails.findIndex(thumbnail => thumbnail.id === currentThumbnailId);

        if (currentThumbnailIndex !== -1) {
            const [currentThumbnail] = tempThumbnails.splice(currentThumbnailIndex, 1);
            tempThumbnails.unshift(currentThumbnail);
        }

        if (tempThumbnails && tempThumbnails.length > 0) {
            setSelectedThumbnailCode(tempThumbnails[0].code);
        }

        setThumbnails(tempThumbnails);
    }, []);

    const handleArticleChange = (code) => {
        changeArticle(code);
        setSelectedThumbnailCode(code);
    }

    const handleSizeChange = (name) => {
        setSelectedSize(name);
    }

    return (
        <div className="w-[40%]">
            <div className="flex justify-between items-center">
                <h2 className="text-md font-semibold leading-[1]">{product.name}</h2>
                <TfiHeart className='text-gray-700 text-2xl' />
            </div>
            <p className="text-xl my-6 leading-[1]">${product.whitePrice.price}</p>

            <div className="mb-6">
                <span className="text-gray-800 font-semibold text-sm">Colour - </span>
                <span className="text-gray-500 text-sm">{currentArticle.colourDescription}</span>
                <div className="flex mt-4 gap-2 flex-wrap">
                    {thumbnails && thumbnails.length > 0 &&
                        thumbnails.map(thumbnail => (
                            <img
                                key={thumbnail.id}
                                src={thumbnail.baseUrl}
                                className={`w-16 border cursor-pointer ${selectedThumbnailCode === thumbnail.code ? 'border-black' : 'border'}`}
                                onClick={() => handleArticleChange(thumbnail.code)}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold mb-4">
                    {selectedSize ? `Selected size - ${selectedSize}` : 'Select size'}
                </h3>
                <div className="grid grid-cols-4 gap-1 text-center text-lg">
                    {currentArticle.variantsList.map(variant => (
                        <button
                            onClick={() => handleSizeChange(variant.size.name)}
                            key={variant.code}
                            className={`border py-2 ${selectedSize === variant.size.name ? 'border-black' : 'border'}`}>
                            {variant.size.name}
                        </button>
                    ))}
                </div>
                {/* <a href="#" className="text-sm text-gray-600 mt-2 inline-block">Size Guide</a> */}
            </div>

            <button className="bg-black text-white py-4 w-full  font-semibold mb-4 flex gap-2 justify-center items-center">
                <IoBagHandleOutline className="text-lg leading-tight" />
                <p className="leading-[1]">Add to bag</p>
            </button>

            <p className="text-center text-red-600 text-sm mb-6">15% off $60 or 20% off $80</p>

            <div className="flex items-center">
                <i className="fas fa-store text-xl"></i>
                <div>
                    <p className="font-semibold">Find in store</p>
                    <p className="text-sm text-gray-600">Members get free online returns.</p>
                </div>
            </div>

            <div className="mt-6">
                <div className="border-b">
                    <button
                        className={`w-full text-left py-4 flex justify-between items-center focus:outline-none ${expandedSection === 'description' && 'text-red-600'}`}
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
                        <div>
                            {
                                <div>
                                    {product.hasOwnProperty('sellingAttributes') && product.sellingAttributes.includes('New Arrival') &&
                                        <p className="text-xs pb-2">New Arrival</p>}
                                    <p className="pb-4 text-[15px]">{product.description}</p>
                                    {/* <p>
                                        <span className="text-sm font-semibold">Size: </span>
                                        <span></span>
                                    </p> */}
                                    <p className="text-sm">
                                        <span className="font-semibold">Length: </span>
                                        <span>{product.lengthCollection.find(x => x.code === 'garmentLength').value[0]}</span>
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-semibold">Length: </span>
                                        <span>{product.lengthCollection.find(x => x.code === 'garmentLength').value[0]}</span>
                                    </p>
                                </div>
                            }
                        </div>
                    )}
                </div>

                <div className="border-b">
                    <button
                        className={`w-full text-left py-4 flex justify-between items-center focus:outline-none ${expandedSection === 'materials' && 'text-red-600'}`}
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