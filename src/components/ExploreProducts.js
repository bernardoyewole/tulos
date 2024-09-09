import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { LiaHeart } from "react-icons/lia";
import { AsyncImage } from 'loadable-image';
import { Link } from 'react-router-dom';

function ExploreProducts({ products }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="grid grid-cols-4 gap-x-4 gap-y-12">
                {products.map(product => (
                    <div key={product.code}>
                        <Link to={`/product/${product.defaultArticle.code}`} className='relative cursor-pointer'>
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
                                                src={product.galleryImages && product.galleryImages.length > 0 && product.galleryImages[0].baseUrl}
                                                style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                                loader={<div style={{ background: '#ededed' }} />}
                                            />
                                        }
                                    />
                                }
                            />
                            <LiaHeart className='absolute top-3 right-4 text-gray-600 text-2xl ' />
                            <p className='pt-2 text-[13px]'>{product.name}</p>
                        </Link>
                        <p>${product.whitePrice.value}</p>
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
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default ExploreProducts