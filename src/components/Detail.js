import { useState, useEffect } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { PiCaretDown } from "react-icons/pi";
import { v4 as uuidv4 } from 'uuid';
import { AsyncImage } from 'loadable-image'
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useAuth } from "../provider/AuthProvider";
import { useCart } from "../provider/CartProvider";
import toast, { Toaster } from 'react-hot-toast';

function Detail({ product, currentArticle, changeArticle, addToFavorite, likedProducts, onOpenModal }) {
    const [expandedSection, setExpandedSection] = useState(null);
    const [thumbnails, setThumbnails] = useState([]);
    const [selectedThumbnailCode, setSelectedThumbnailCode] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [cartError, setCartError] = useState('');

    const { email, isAuthenticated } = useAuth();
    const { addToCart } = useCart();

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

        tempThumbnails.length > 12 ? setThumbnails(tempThumbnails.splice(0, 12)) : setThumbnails(tempThumbnails);
    }, [product]);

    const handleArticleChange = (code) => {
        changeArticle(code);
        setSelectedThumbnailCode(code);
    }

    const handleSizeChange = (name) => {
        setSelectedSize(name);
    }

    const handleLike = (product) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        const productObj = {
            userEmail: email,
            hmProductId: product.code,
            name: product.name,
            imageUrl: thumbnails[0].baseUrl || thumbnails[1].baseUrl,
            price: product.whitePrice.price,
            sizeVariants: [...currentArticle.variantsList.map(art => art.size.name)],
            color: product.color.text
        }

        addToFavorite(productObj);
    }

    const handleAddToBag = async (currentProduct) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        if (selectedSize === null) {
            setCartError('Please select a size')
        } else {
            setCartError('');

            const productObj = {
                userEmail: email,
                hmProductId: currentProduct.code,
                name: currentProduct.name,
                imageUrl: currentProduct.fabricSwatchThumbnails[0].baseUrl,
                price: currentProduct.whitePrice.price,
                size: selectedSize,
                color: currentProduct.colourDescription
            }

            const result = await addToCart(productObj);

            if (result) {
                toast.custom(
                    <div className="flex p-6 gap-4 w-[340px] bg-white shadow-md">
                        <div className="w-[40%]">
                            <img className="w-[100%]" src={productObj.imageUrl} />
                        </div>
                        <div>
                            <p className="text-sm">{productObj.name}</p>
                            <p className="mb-3 text-sm font-semibold">{productObj.price}</p>
                            <div className="flex gap-2 text-xs">
                                <p className="flex flex-col gap-1">
                                    <span>Colour</span>
                                    <span>Size</span>
                                    <span>quantity</span>
                                </p>
                                <p className="flex flex-col gap-1">
                                    <span>{productObj.color}</span>
                                    <span>{productObj.size}</span>
                                    <span>{productObj.quantity}</span>
                                </p>
                            </div>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                        position: 'right-top',
                        backgroundColor: 'white'
                    }
                );

                setSelectedSize(null);
            }
        }
    }

    return (
        <div>
            <Toaster />
            <div className="flex justify-between items-center">
                <h2 className="text-md font-semibold leading-[1]">{product.name}</h2>
                {likedProducts.includes(product.code) ? (
                    <IoMdHeart
                        onClick={(e) => {
                            e.preventDefault();
                            handleLike(product);
                        }}
                        className="text-2xl text-red-500 fill-current hover:text-red-600 cursor-pointer"
                    />
                ) : (
                    <div className="group">
                        <IoMdHeartEmpty
                            onClick={(e) => {
                                e.preventDefault();
                                handleLike(product);
                            }}
                            className="text-2xl text-gray-600 group-hover:hidden"
                        />
                        <IoMdHeart
                            onClick={(e) => {
                                e.preventDefault();
                                handleLike(product);
                            }}
                            className="text-2xl text-red-500 cursor-pointer hidden group-hover:block"
                        />
                    </div>
                )}
            </div>
            <p className="text-xl my-6 leading-[1]">${product.whitePrice.price}</p>

            <div className="mb-6">
                <span className="text-gray-800 font-semibold text-sm">Colour - </span>
                <span className="text-gray-500 text-sm">{currentArticle.colourDescription}</span>
                <div className="flex mt-4 gap-2 flex-wrap">
                    {thumbnails && thumbnails.length > 0 &&
                        thumbnails.map(thumbnail => (
                            <AsyncImage
                                key={thumbnail.id}
                                src={thumbnail.baseUrl}
                                style={{ width: '64px', height: "auto", aspectRatio: 9 / 16 }}
                                loader={<div style={{ background: '#ededed' }} />}
                                className={`border cursor-pointer ${selectedThumbnailCode === thumbnail.code ? 'border-black' : 'border'}`}
                                onClick={() => handleArticleChange(thumbnail.code)}
                                error={
                                    <AsyncImage
                                        key={thumbnail.id}
                                        src={product.articlesList.find(x => x.code === currentArticle.code).galleryDetails[1].baseUrl}
                                        style={{ width: '64px', height: "auto", aspectRatio: 9 / 16 }}
                                        loader={<div style={{ background: '#ededed' }} />}
                                        className={`border cursor-pointer ${selectedThumbnailCode === thumbnail.code ? 'border-black' : 'border'}`}
                                        onClick={() => handleArticleChange(thumbnail.code)}
                                    />
                                }
                            />
                        ))
                    }
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-sm font-semibold mb-4">
                    {selectedSize ? `Selected size - ${selectedSize}` : 'Select size'}
                </h3>
                <div className="grid grid-cols-4 gap-1 text-center text-lg">
                    {currentArticle.variantsList.map(variant => (
                        Object.keys(variant).length > 0 &&
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
            <p className="text-red-500 h-6 text-sm">{cartError.length > 0 && `${cartError}`}</p>
            <button
                className="bg-black text-white py-4 w-full  font-semibold mb-4 flex gap-2 justify-center items-center"
                onClick={() => handleAddToBag(currentArticle)}
            >
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
                        className={`w-full text-left py-4 flex justify-between items-center hover:text-red-600 hover:transition-all ease-in-out duration-300 focus:outline-none ${expandedSection === 'description' && 'text-red-600'}`}
                        onClick={() => toggleExpand('description')}
                    >
                        <span className="font-semibold">Description & fit</span>
                        <span
                            className={`transform transition-transform duration-200 ${expandedSection === 'description' ? 'rotate-180' : ''}`}
                        >
                            <PiCaretDown />
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${expandedSection === 'description' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="transition-opacity duration-500 ease-in-out">
                            {expandedSection === 'description' && (
                                <div>
                                    <div>
                                        {currentArticle.sellingAttributes?.includes('New Arrival') && (
                                            <p className="text-xs pb-2">New Arrival</p>
                                        )}

                                        <p className="pb-4 text-[15px]">{currentArticle.description}</p>

                                        <div className="pb-6">
                                            {product.lengthCollection.length > 0 && (
                                                <p className="text-[13px]">
                                                    <span className="font-semibold">Length: </span>
                                                    <span>{product.lengthCollection.find(x => x.code === 'garmentLength')?.value[0]}</span>
                                                </p>
                                            )}

                                            {product.fits.length > 0 && (
                                                <p className="text-[13px]">
                                                    <span className="font-semibold">Fit: </span>
                                                    <span>{product.fits[0]}</span>
                                                </p>
                                            )}

                                            <p className="text-[13px]">
                                                <span className="font-semibold">Description: </span>
                                                <span>
                                                    {`${currentArticle.colourDescription}, ${currentArticle.pattern ? currentArticle.pattern : currentArticle.textualPrint}`}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-b">
                    <button
                        className={`w-full text-left py-4 flex justify-between items-center hover:text-red-600 hover:transition-all ease-in-out duration-300 focus:outline-none ${expandedSection === 'materials' && 'text-red-600'}`}
                        onClick={() => toggleExpand('materials')}
                    >
                        <span className="font-semibold hover:text-red-600">Materials</span>
                        <span
                            className={`transform transition-transform duration-200 ${expandedSection === 'materials' ? 'rotate-180' : ''
                                }`}
                        >
                            <PiCaretDown />
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${expandedSection === 'materials' ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        {expandedSection === 'materials' && (
                            <div className="pb-6">
                                <p className="font-semibold text-[15px]">Composition</p>
                                {/* composition is of one type */}
                                {
                                    currentArticle.compositions && currentArticle.compositions.length === 1 &&
                                    currentArticle.compositions.map(composition => (
                                        <p className="text-[13px] pt-1">
                                            <p>
                                                {composition.materials.map((material, index) => (
                                                    <span key={uuidv4()}>{`${material.name} `}{`${Number.parseInt(material.percentage).toFixed(0)}%`}{index !== composition.materials.length - 1 && ', '}</span>
                                                ))}
                                            </p>
                                        </p>
                                    ))
                                }
                                {/* composition is of more than one type */}
                                {
                                    currentArticle.compositions && currentArticle.compositions.length > 1 &&
                                    currentArticle.compositions.map(composition => (
                                        <p className="text-[13px] pt-1">
                                            <span className="font-semibold">{`${composition.compositionType} : `}</span>
                                            <span>{composition.materials.map((material, index) => (
                                                <span key={uuidv4()}>
                                                    <span>{`${material.name} `}{`${Number.parseInt(material.percentage).toFixed(0)}%`}{index !== composition.materials.length - 1 ? ', ' : ''}</span>
                                                </span>
                                            ))}</span>
                                        </p>
                                    ))
                                }
                                <p className="font-semibold pt-6 text-[15px]">Additional material information</p>
                                <div className="text-[13px] pt-1">
                                    <p>The total weight of this product contains:</p>
                                    {currentArticle.sustainabilityCompositions && currentArticle.sustainabilityCompositions.length > 0 &&
                                        <ul key={uuidv4()}>
                                            {currentArticle.sustainabilityCompositions[0].materials.map(material => (
                                                <li className="list-disc list-inside">{Number.parseInt(material.percentage).toFixed(0)}% {material.name}</li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                                <p className="font-semibold text-[15px] pt-6">Materials in this product explained</p>
                                {currentArticle.materialDetails && currentArticle.materialDetails.length > 1 &&
                                    currentArticle.materialDetails.map(detail => (
                                        <div key={uuidv4()} className="pt-3">
                                            <p className="font-semibold text-[13px]">{detail.name}</p>
                                            <p className="text-[13px] pt-2">{detail.description}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>

                {currentArticle.careInstructions && currentArticle.careInstructions.length > 0 &&
                    <div className="border-b">
                        <button
                            className={`w-full text-left py-4 flex justify-between items-center hover:text-red-600 hover:transition-all ease-in-out duration-300 focus:outline-none ${expandedSection === 'careGuide' && 'text-red-600'}`}
                            onClick={() => toggleExpand('careGuide')}
                        >
                            <span className="font-semibold hover:text-red-600">Care Guide</span>
                            <span
                                className={`transform transition-transform duration-200 ${expandedSection === 'careGuide' ? 'rotate-180' : ''
                                    }`}
                            >
                                <PiCaretDown />
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-max-height duration-500 ease-in-out ${expandedSection === 'careGuide' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            {expandedSection === 'careGuide' && (
                                currentArticle.careInstructions && currentArticle.careInstructions.length > 0 &&
                                <ul className="text-[13px] pb-6">
                                    {currentArticle.careInstructions.map(instruction => (
                                        <li key={uuidv4()} className="list-disc list-inside">{instruction}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                }
            </div>

            <div className="border-b">
                <button
                    className={`w-full text-left py-4 flex justify-between items-center hover:text-red-600 hover:transition-all ease-in-out duration-300 focus:outline-none ${expandedSection === 'deliveryAndPayment' && 'text-red-600'}`}
                    onClick={() => toggleExpand('deliveryAndPayment')}
                >
                    <span className="font-semibold hover:text-red-600">Delivery Payment</span>
                    <span
                        className={`transform transition-transform duration-200 ${expandedSection === 'deliveryAndPayment' ? 'rotate-180' : ''
                            }`}
                    >
                        <PiCaretDown />
                    </span>
                </button>
                <div
                    className={`text-[13px] overflow-hidden transition-max-height duration-500 ease-in-out ${expandedSection === 'deliveryAndPayment' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <p className="pb-2">Members get free online returns</p>
                    <p>
                        Delivery: Shipping is available to an address within Canada.
                        Payment: We accept credit card payments via MasterCard and Visa.
                        You can also pay with PayPal or Tolus giftcards. Learn more on our
                        customer service page
                    </p>
                </div>
            </div>
        </div >
    )
}

export default Detail