import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Detail from "../components/Detail"
import Gallery from "../components/Gallery"

function Product() {
    const [product, setProduct] = useState(null);
    const [articleImages, setArticleImages] = useState(null);

    const { id } = useParams();
    // console.log(id);

    const options = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail',
        params: {
            lang: 'en',
            country: 'us',
            productcode: id
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
                // console.log(response.data.product.articlesList);

                const articlesList = response.data.product.articlesList;

                const filteredArticles = articlesList.map(article => {
                    return {
                        code: article.code,
                        galleryDetails: article.galleryDetails,
                        fabricSwatchThumbnails: article.fabricSwatchThumbnails
                    }
                });

                setArticleImages(filteredArticles);
                setProduct(response.data.product);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProduct();
    }, []);

    return (
        <section>
            <div className="my-container flex gap-10">
                {/* {product category title} */}
                {articleImages && <Gallery articles={articleImages} />}
                {product && articleImages && <Detail product={product} articles={articleImages} />}
            </div>
        </section>
    )
}

export default Product