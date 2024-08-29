import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Detail from "../components/Detail"
import Gallery from "../components/Gallery"

function Product() {
    const [product, setProduct] = useState(null);
    const [currentArticle, setCurrentArticle] = useState(null);

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
        }

        fetchProduct();
    }, []);

    const changeArticle = (code) => {
        const article = product.articlesList.find(art => art.code === code);

        if (article !== undefined) {
            setCurrentArticle(article);
        }
    }

    return (
        <section>
            {product &&
                <div className="my-container leading-[1] py-6">
                    <p>
                        <span className="text-sm text-gray-700">{product.customerGroup} / </span>
                        <span className="text-sm text-gray-700">{product.presentationTypes} / </span>
                        <span className="text-[15px] text-red-600">{product.name}</span>
                    </p>
                </div>}
            <div className="my-container flex gap-10">
                {currentArticle && <Gallery gallery={currentArticle.galleryDetails} />}
                {product && currentArticle && <Detail product={product} currentArticle={currentArticle} changeArticle={changeArticle} />}
            </div>
        </section>
    )
}

export default Product