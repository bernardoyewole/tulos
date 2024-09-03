import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Bottleneck from "bottleneck";
import Detail from "../components/Detail";
import Gallery from "../components/Gallery";
import StyleWith from "../components/StyleWith";
import OthersBought from "../components/OthersBought";

function Product() {
    const [product, setProduct] = useState(null);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [sectionHeight, setSectionHeight] = useState(null);
    const [styleWithProducts, setStyleWithProducts] = useState([]);
    const [OthersBoughtList, setOthersBoughtList] = useState([]);

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

    // Setup Bottleneck limiter
    const limiter = new Bottleneck({
        maxConcurrent: 5, // Max 5 requests running at the same time
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
                // Prepare requests with Bottleneck
                const requests = product.articlesList[0].styleWith.map((style) =>
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

                // Set the fetched styleWith products in the state
                setStyleWithProducts(products);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchOthersBought = async () => {
            try {
                console.log(product.mainCategory.code)
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
                console.log(response.data.results);
                setOthersBoughtList(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStyleWithProducts();
        fetchOthersBought();
    }, [product]);

    useEffect(() => {
    }, [OthersBoughtList, styleWithProducts]);

    const changeArticle = (code) => {
        const article = product.articlesList.find(art => art.code === code);
        if (article !== undefined) {
            setCurrentArticle(article);
        }
    };

    // Update the section height
    const handleHeight = (detailSectionHeight) => {
        setSectionHeight(detailSectionHeight);
    };

    // React to section height changes
    useEffect(() => {
        handleHeight(sectionHeight);
    }, [sectionHeight]);

    return (
        <section>
            {product && (
                <div className="my-container leading-[1] py-6">
                    <p>
                        <span className="text-sm text-gray-700">{product.customerGroup} / </span>
                        <span className="text-sm text-gray-700">{product.presentationTypes} / </span>
                        <span className="text-[15px] text-red-600">{product.name}</span>
                    </p>
                </div>
            )}
            <div className="my-container flex gap-10">
                {currentArticle && <Gallery gallery={currentArticle.galleryDetails} height={sectionHeight} />}
                {product && currentArticle && (
                    <Detail
                        product={product}
                        currentArticle={currentArticle}
                        changeArticle={changeArticle}
                        handleHeight={handleHeight}
                    />
                )}
            </div>
            {styleWithProducts.length > 0 && <StyleWith styleWithList={styleWithProducts} />}
            {OthersBought.length > 0 && <OthersBought OthersBought={OthersBoughtList} />}
        </section>
    );
}

export default Product;
