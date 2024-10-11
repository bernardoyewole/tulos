import { v4 as uuidv4 } from 'uuid';
import { AsyncImage } from 'loadable-image';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '../provider/CartProvider';
import SizeMenu from '../components/SizeMenu';

function Favorites({ likedProducts, likedProductIds, addToFavorite, onOpenModal }) {
    // console.log(likedProducts);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isSizeSelected, setIsSizeSelected] = useState(false);
    const [isSizeMenuOpen, setIsSizeMenuOpen] = useState(false);
    const [sizeVariants, setSizeVariants] = useState([]);

    const { email, isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    const addToBag = (product) => {
        if (!isSizeSelected) {
            openSizeMenu();
        }

        console.log(product);
        return;
        const productObj = {
            userEmail: email,
            hmProductId: product.code,
            name: product.name,
            imageUrl: product.fabricSwatchThumbnails[0].baseUrl,
            price: product.whitePrice.price,
            quantity: 1,
            size: selectedSize,
            color: product.colourDescription
        }

        const result = addToCart(productObj);
        if (result) {
            toast.custom(
                <div className="flex p-2 w-[200px]">
                    <div>
                        <img src={productObj.imageUrl} />
                    </div>
                    <div>
                        <p>{productObj.name}</p>
                        <p className="mb-3">{productObj.price}</p>
                        <div className="flex gap-2">
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
                    duration: 4000,
                    position: 'top-center',
                    backgroundColor: 'white'
                }
            );

            setSelectedSize(null);
            setIsSizeSelected(false);
        }
    }

    const handleLike = (product) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        addToFavorite(product);
    }

    const openSizeMenu = () => {
        setIsSizeMenuOpen(true);
    };

    const closeSizeMenu = () => {
        setIsSizeMenuOpen(false);
    };

    return (
        <section className="my-container mt-[105px]">
            <Toaster />
            <h1 className='text-4xl font-semibold py-6'>FAVOURITES</h1>

            {likedProducts && likedProducts.length > 0 ? (
                <>
                    <p className='font-medium text-sm pb-4'>{likedProducts.length} {likedProducts.length === 1 ? 'ITEM' : 'ITEMS'}</p>
                    <div className="grid grid-cols-4 gap-x-6 gap-y-16">
                        {likedProducts.map(product => (
                            <div key={product.hmProductId}>
                                <Link to={`/product/${product.hmProductId}`} className='relative block cursor-pointer'>
                                    <AsyncImage
                                        src={product.imageUrl}
                                        style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                        loader={<div style={{ background: '#ededed' }} />}
                                    />
                                    {likedProductIds.includes(product.hmProductId) ? (
                                        <IoMdHeart
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLike(product);
                                            }}
                                            className="absolute top-3 right-4 text-2xl text-red-500 fill-current hover:text-red-600 cursor-pointer"
                                        />
                                    ) : (
                                        <div className="group">
                                            <IoMdHeartEmpty
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleLike(product);
                                                }}
                                                className="absolute top-3 right-4 text-2xl text-gray-600 group-hover:hidden"
                                            />
                                            <IoMdHeart
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleLike(product);
                                                }}
                                                className="absolute top-3 right-4 text-2xl text-red-500 cursor-pointer hidden group-hover:block"
                                            />
                                        </div>
                                    )}
                                    <p className='pt-2 text-[13px]'>{product.name}</p>
                                </Link>
                                <p>${product.price}</p>
                                {product.rgbColors && product.rgbColors.length > 0 && (
                                    <div className="flex items-center space-x-1 h-4">
                                        {product.rgbColors.length <= 3 ? (
                                            product.rgbColors.map((color, index) => (
                                                <div
                                                    key={uuidv4()}
                                                    className="h-2 w-2 border border-black"
                                                    style={{ backgroundColor: `${color}` }}
                                                    title={product.articleColorNames[index]}
                                                ></div>
                                            ))
                                        ) : (
                                            <>
                                                {product.rgbColors.slice(0, 3).map((color, index) => (
                                                    <div
                                                        key={uuidv4()}
                                                        className="h-2 w-2 border border-black"
                                                        style={{ backgroundColor: `${color}` }}
                                                        title={product.articleColorNames[index]}
                                                    ></div>
                                                ))}
                                                <span className="text-[13px] leading-[1]">{`+${product.rgbColors.length - 3}`}</span>
                                            </>
                                        )}
                                    </div>
                                )}
                                <button onClick={() => addToBag(product)} className='border border-gray-700 py-4 text-md mt-4 w-full'>ADD TO BAG</button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                    <p className="text-lg font-semibold mb-4">Your favourites list is empty</p>
                    <p className="text-gray-600 mb-6">Browse our collection and add items to your favourites.</p>
                    <Link to="/explore" className="bg-black text-white py-4 w-60 text-center font-semibold hover:bg-gray-900 transition-all duration-300">
                        Explore Products
                    </Link>
                </div>
            )}

            <SizeMenu isOpen={isSizeMenuOpen} onClose={closeSizeMenu} />
        </section>

    )
}

export default Favorites
