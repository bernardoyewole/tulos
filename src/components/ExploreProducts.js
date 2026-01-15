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
            hmProductId: product.id,
            name: product.productName,
            imageUrl: product.modelImage,
            price: product.prices[0].price,
            sizeVariants: [...product.sizes.map(pr => pr.label)],
            color: product.colorName
        };

        const response = await addToFavorite(productObj);

        if (response === "Product added to favorites") {
            updateLikedProducts([...likedProductIds, product.id]);
        } else if (response === "Favorite removed") {
            updateLikedProducts(likedProductIds.filter(id => id !== product.id));
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
                        <Link to={`/product/${product.id}`} className='relative block cursor-pointer'>
                            <AsyncImage
                                src={product.modelImage}
                                style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                loader={<div style={{ background: '#ededed' }} />}
                                error={
                                    <AsyncImage
                                        src={product.productImage}
                                        style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                        loader={<div style={{ background: '#ededed' }} />}
                                        error={
                                            <AsyncImage
                                                src={product.images[0].url || ""}
                                                style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                                loader={<div style={{ background: '#ededed' }} />}
                                            />
                                        }
                                    />
                                }
                            />
                            {likedProductIds.includes(product.id) ? (
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
                                        className="absolute top-3 right-4 text-2xl text-gray-600 md:group-hover:hidden"
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
                            <p className='pt-2 text-[13px]'>{product.productName}</p>
                        </Link>
                        <p>${product.prices[0].price}</p>
                        {product.swatches?.length > 0 && (
                            <div className="flex items-center space-x-1 h-4">
                                {product.swatches.length <= 3 ? (
                                    product.swatches.map((color, index) => (
                                        <div
                                            key={product.swatches.articleId}
                                            className="h-2 w-2 border border-black"
                                            style={{ backgroundColor: `#${color.colorCode}` }}
                                            title={color.colorName}
                                        ></div>
                                    ))
                                ) : (
                                    <>
                                        {product.swatches.slice(0, 3).map((color, index) => (
                                            <div
                                                key={product.swatches.articleId}
                                                className="h-2 w-2 border border-black"
                                                style={{ backgroundColor: `#${color.colorCode}` }}
                                                title={color.colorName}
                                            ></div>
                                        ))}
                                        <span className="text-[13px] leading-[1]">{`+${product.swatches.length - 3}`}</span>
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
