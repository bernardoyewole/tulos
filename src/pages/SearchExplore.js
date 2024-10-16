import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import ExploreProducts from '../components/ExploreProducts';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function SearchExplore({ addToFavorite, likedProductIds, updateLikedProducts, onOpenModal }) {
    const [queryResult, setQueryResult] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('View All');
    const [categoryProducts, setCategoryProducts] = useState([]);

    const { query } = useParams();
    const navigate = useNavigate();

    const options = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
        params: {
            country: 'us',
            lang: 'en',
            currentpage: '0',
            pagesize: '30',
            query: query
        },
        headers: {
            'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
            'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
    };

    const updateCategoryProducts = () => {
        // hard code for view all
        if (currentCategory === 'View All') {
            setCategoryProducts(queryResult);
            return;
        }

        const products = queryResult.filter(item => item.categoryName === currentCategory);

        if (products.length > 0) {
            setCategoryProducts(products);
            // console.log(categoryProducts);
        }
    }

    useEffect(() => {
        const fetchQueryResult = async () => {
            try {
                const response = await axios.request(options);
                // console.log(response.data);

                if (response.data.results.length && response.data.results.length > 0) {
                    setQueryResult(response.data.results);
                } else {
                    // // mocking selected for you page
                    // handleSearch('shirt');
                    // navigate('/searchExplore');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchQueryResult();
    }, [query]);

    useEffect(() => {
        if (queryResult.length > 0) {
            // console.log(queryResult);
            setCategories(Array.from((new Set([...queryResult.map(product => product.categoryName)]))));
            updateCategoryProducts();
        }
    }, [queryResult]);

    useEffect(() => {
        updateCategoryProducts();
    }, [currentCategory]);

    return (
        <div className='my-container mt-[105px] min-h-[calc(100%-80px)]'>
            <div className='mb-10'>
                <h2 className="text-4xl font-semibold uppercase py-6">{currentCategory}</h2>
                <div className="flex gap-2 overflow-scroll no-scrollbar">
                    <button
                        onClick={() => setCurrentCategory('View All')}
                        className={`px-4 py-1.5 uppercase text-sm font-semibold border-black border whitespace-nowrap ${currentCategory === 'View All' ? 'bg-black text-white' : 'bg-transparent'}`}
                    >
                        VIEW ALL [{queryResult.length}]
                    </button>
                    {categories && categories.length > 0 && categories.map((cat) =>
                        <button
                            key={uuidv4()}
                            onClick={() => setCurrentCategory(cat)}
                            className={`px-4 py-1.5 uppercase text-sm font-semibold border-black border whitespace-nowrap ${currentCategory === cat ? 'bg-black text-white' : 'bg-transparent'
                                }`}
                        >
                            {cat} [{queryResult.filter(res => res.categoryName === cat).length}]
                        </button>
                    )}
                </div>
            </div>
            {
                categoryProducts.length > 0 &&
                <ExploreProducts
                    onOpenModal={onOpenModal}
                    products={categoryProducts}
                    addToFavorite={addToFavorite}
                    likedProductIds={likedProductIds}
                    updateLikedProducts={updateLikedProducts}
                />
            }
        </div>
    )
}

export default SearchExplore