import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { AsyncImage } from 'loadable-image';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

function ExploreProducts({ products, addToFavorite, likedProductIds, updateLikedProducts, onOpenModal }) {
    const { email, isAuthenticated } = useAuth();

    const handleLike = async (product) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        const productObj = {
            userEmail: email,
            hmProductId: product.defaultArticle.code,
            name: product.name,
            imageUrl: product.images[0].baseUrl,
            price: product.whitePrice.value,
            sizeVariants: [...product.variantSizes.map(pr => pr.filterCode)],
            color: product.defaultArticle.color.text
        };

        const response = await addToFavorite(productObj);

        if (response === "Product added to favorites") {
            updateLikedProducts([...likedProductIds, product.defaultArticle.code]);
        } else if (response === "Favorite removed") {
            updateLikedProducts(likedProductIds.filter(id => id !== product.defaultArticle.code));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-10 md:gap-x-2">
                {products.map(product => (
                    <div key={product.code} className="relative">
                        <Link to={`/product/${product.defaultArticle.code}`} className='relative block cursor-pointer'>
                            <AsyncImage
                                src={product.defaultArticle.logoPicture[0].baseUrl}
                                style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                loader={<div style={{ background: '#ededed' }} />}
                                error={
                                    <AsyncImage
                                        src={product.defaultArticle.images[0].baseUrl}
                                        style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                        loader={<div style={{ background: '#ededed' }} />}
                                        error={
                                            <AsyncImage
                                                src={product.galleryImages?.[0]?.baseUrl || ""}
                                                style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                                loader={<div style={{ background: '#ededed' }} />}
                                            />
                                        }
                                    />
                                }
                            />
                            {likedProductIds.includes(product.defaultArticle.code) ? (
                                <IoMdHeart
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLike(product);
                                    }}
                                    className="absolute top-3 right-4 text-2xl text-red-500 fill-current md:hover:text-red-600 cursor-pointer"
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
                                        className="absolute top-3 right-4 text-2xl text-red-500 cursor-pointer hidden md:group-hover:block"
                                    />
                                </div>
                            )}
                            <p className='pt-2 text-[13px]'>{product.name}</p>
                        </Link>
                        <p>${product.whitePrice.value}</p>
                        {product.rgbColors?.length > 0 && (
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
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default ExploreProducts;
