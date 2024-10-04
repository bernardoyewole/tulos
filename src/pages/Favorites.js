import { v4 as uuidv4 } from 'uuid';
import { AsyncImage } from 'loadable-image';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

function Favorites({ likedProducts, likedProductIds, addToFavorite, onOpenModal }) {
    console.log(likedProducts);
    const { isAuthenticated } = useAuth();

    const handleLike = (product) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        addToFavorite(product);
    }

    return (
        <section className="my-container">
            <h1 className='text-3xl font-semibold py-6'>FAVOURITES</h1>
            <p className='font-medium text-sm pb-4'>{likedProducts.length} ITEMS</p>
            <div className="grid grid-cols-4 gap-x-6 gap-y-16">
                {likedProducts.map(product => (
                    <div key={product.hmProductId}>
                        <Link to={`/product/${product.hmProductId}`} className='relative block cursor-pointer'>
                            <AsyncImage
                                src={product.imageUrl}
                                style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                loader={<div style={{ background: '#ededed' }} />}
                            // error={}
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
                        <button className='border border-gray-700 py-4 text-md mt-4 w-full'>ADD TO BAG</button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Favorites