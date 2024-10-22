import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Bottleneck from "bottleneck";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Detail from "../components/Detail";
import Gallery from "../components/Gallery";
import StyleWith from "../components/StyleWith";
import OthersBought from "../components/OthersBought";
import { motion } from 'framer-motion';

function Product({ addToFavorite, likedProductIds, onOpenModal }) {
    const [product, setProduct] = useState(null);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [styleWithProducts, setStyleWithProducts] = useState([]);
    const [OthersBoughtList, setOthersBoughtList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { productCode } = useParams();

    const options = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail',
        params: {
            lang: 'en',
            country: 'us',
            productcode: productCode
        },
        headers: {
            'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
            'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
    };

    const limiter = new Bottleneck({
        maxConcurrent: 5, // Max 5 requests running at the same time - api plan
        minTime: 200 // Minimum time between each request (200ms for approx 5 requests per second)
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.request(options);
                const articles = response.data.product.articlesList;

                setCurrentArticle(articles.find(x => x.code === productCode));
                setProduct(response.data.product);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [productCode]);

    useEffect(() => {
        if (!product) return;

        const fetchStyleWithProducts = async () => {
            try {
                let validArticle = product.articlesList.find(article => article.styleWith.every(style => style.code !== currentArticle.code) && article.styleWith.length > 0);

                if (validArticle === undefined) return

                // Prepare requests with Bottleneck
                const requests = validArticle?.styleWith.map((style) =>
                    limiter.schedule(() => axios.request({
                        method: 'GET',
                        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail',
                        params: {
                            lang: 'en',
                            country: 'us',
                            productcode: style.code
                        },
                        headers: {
                            'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
                            'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
                        }
                    }))
                );

                // Fetch all styleWith products using Bottleneck for rate limiting
                const results = await Promise.allSettled(requests);
                const products = results
                    .filter(result => result.status === 'fulfilled')
                    .map(result => result.value.data.product);

                setStyleWithProducts(products);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchOthersBought = async () => {
            try {
                const response = await axios.request({
                    method: 'GET',
                    url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
                    params: {
                        country: 'us',
                        lang: 'en',
                        currentpage: '0',
                        pagesize: '10',
                        categories: product.mainCategory.code
                    },
                    headers: {
                        'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
                        'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
                    }
                });

                setOthersBoughtList(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStyleWithProducts();
        fetchOthersBought();
    }, [product]);


    useEffect(() => {
        if (product && currentArticle) {
            setIsLoading(false);
        }
    }, [product, currentArticle]);

    const changeArticle = (code) => {
        const article = product.articlesList.find(art => art.code === code);
        if (article !== undefined) {
            setCurrentArticle(article);
        }
    };

    return (
        <section>
            {isLoading ? (
                <div className="my-container leading-[1] py-6 flex gap-2">
                    <Skeleton width={90} height={20} className="inline-block" />
                    <Skeleton width={90} height={20} className="inline-block" />
                    <Skeleton width={90} height={20} className="inline-block text-red-600" />
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="my-container leading-[1] py-6">
                        <p>
                            <span className="text-sm text-gray-700">{product.customerGroup} / </span>
                            <span className="text-sm text-gray-700">{product.presentationTypes} / </span>
                            <span className="text-[15px] text-red-600">{product.name}</span>
                        </p>
                    </div>
                </motion.div>
            )}

            <div className="my-container md:flex md:gap-10 w-full">
                {isLoading ? (
                    <Skeleton height={500} containerClassName="md:w-[60%]" />
                ) : (
                    product && currentArticle && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="md:w-[60%]"
                        >
                            <Gallery gallery={currentArticle.galleryDetails} />
                        </motion.div>
                    )
                )}

                {isLoading ? (
                    <Skeleton height={500} containerClassName="md:w-[40%]" />
                ) : (
                    product && currentArticle && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="md:w-[40%]"
                        >
                            <Detail
                                product={product}
                                currentArticle={currentArticle}
                                changeArticle={changeArticle}
                                addToFavorite={addToFavorite}
                                likedProducts={likedProductIds}
                                onOpenModal={onOpenModal}
                            />
                        </motion.div>
                    )
                )}
            </div>

            {isLoading ? (
                <div className="my-container grid grid-cols-5 gap-4 pt-10">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={`styleWith-skeleton-${index}`}>
                            <Skeleton height={300} width="100%" className="rounded" />
                            <Skeleton width={100} height={20} className="mt-2" />
                            <Skeleton width={50} height={20} />
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {styleWithProducts.length > 1 &&
                        <StyleWith
                            styleWithList={styleWithProducts}
                            addToFavorite={addToFavorite}
                            likedProducts={likedProductIds}
                            onOpenModal={onOpenModal}
                        />}
                </motion.div>
            )}

            {isLoading ? (
                <div className="my-container grid grid-cols-5 gap-4 pt-10">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={`othersBought-skeleton-${index}`}>
                            <Skeleton height={300} width="100%" className="rounded" />
                            <Skeleton width={100} height={20} className="mt-2" />
                            <Skeleton width={50} height={20} />
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {OthersBoughtList.length > 0 &&
                        <OthersBought
                            OthersBought={OthersBoughtList}
                            addToFavorite={addToFavorite}
                            likedProducts={likedProductIds}
                            onOpenModal={onOpenModal}
                        />}
                </motion.div>
            )}
        </section>
    );
}

export default Product;
