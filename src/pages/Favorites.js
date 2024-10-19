import { v4 as uuidv4 } from 'uuid';
import { AsyncImage } from 'loadable-image';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useState } from 'react';
import SizeMenu from '../components/SizeMenu';

function Favorites({ likedProducts, likedProductIds, addToFavorite, onOpenModal, shopNow }) {
    const [size, setSize] = useState(null);
    const [isSizeMenuOpen, setIsSizeMenuOpen] = useState(false);
    const [productDetail, setProductDetail] = useState({});

    const { isAuthenticated } = useAuth();

    const handleOpenSizeMenu = (product) => {
        setSize(null);
        setProductDetail(product);
        openSizeMenu();
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
        <section className="my-container mb-[50px]">
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
                                <button onClick={() => handleOpenSizeMenu(product)} className='border border-gray-700 py-4 text-md mt-4 w-full'>ADD TO BAG</button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                    <p className="text-lg font-semibold mb-4">Your favourites list is empty</p>
                    <p className="text-gray-600 mb-6">Browse our collection and add items to your favourites.</p>
                    <button onClick={shopNow} className="bg-black text-white py-4 w-60 text-center font-semibold hover:bg-gray-900 transition-all duration-300">
                        Explore Products
                    </button>
                </div>
            )}

            <SizeMenu
                isOpen={isSizeMenuOpen}
                product={productDetail}
                setSize={setSize}
                selectedSize={size}
                closeMenu={closeSizeMenu}
            />
        </section>

    )
}

export default Favorites
