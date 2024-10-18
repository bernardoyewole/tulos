import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import ExploreProducts from '../components/ExploreProducts';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SortButton from "../components/SortButton";
import { FaSpinner } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

function SearchExplore({ addToFavorite, likedProductIds, updateLikedProducts, onOpenModal, shopNow }) {
    const [queryResult, setQueryResult] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('View All');
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [isProductsLoading, setIsProductsLoading] = useState(true);
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [selectedSortType, setSelectedSortType] = useState('recommended');
    const [currentPage, setCurrentPage] = useState(0);
    const [maxProducts, setMaxProducts] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);

    const { query } = useParams();

    const options = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
        params: {
            country: 'us',
            lang: 'en',
            currentpage: currentPage,
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

    const fetchQueryResult = async (reset = false) => {
        try {
            const response = await axios.request(options);

            if (response.data.results.length > 0) {
                if (reset) {
                    setQueryResult(response.data.results);
                } else {
                    setQueryResult((prevResults) => {
                        const combinedResults = [...prevResults, ...response.data.results];
                        // Ensure uniqueness based on `code`
                        return combinedResults.filter(
                            (item, index, self) =>
                                index === self.findIndex(obj => obj.code === item.code)
                        );
                    });
                }

                setMaxProducts(response.data.pagination.totalNumberOfResults);
            } else {
                toast.remove();
                toast.custom(
                    <div className="flex p-6 gap-4 min-w-[340px] bg-red-200 shadow-md text-balance">
                        <p className='text-[15px]'>
                            We couldn't find any results for "{query}"
                        </p>
                    </div>,
                    {
                        duration: 3000,
                        position: 'top-center',
                        backgroundColor: 'white'
                    }
                );

                shopNow();
            }

            setTimeout(() => setLoadingMore(false), 1000);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchQueryResult(true); // Reset results when the query changes
    }, [query]);

    useEffect(() => {
        if (currentPage > 1) {
            fetchQueryResult(); // Fetch additional results when page changes
        }
    }, [currentPage]);


    useEffect(() => {
        if (queryResult.length > 0) {
            setCategories(Array.from((new Set([...queryResult.map(product => product.categoryName)]))));
            updateCategoryProducts();
        }
    }, [queryResult]);

    useEffect(() => {
        updateCategoryProducts();
        setSelectedSortType('recommended');
    }, [currentCategory]);

    useEffect(() => {
        if (categoryProducts && categoryProducts.length > 0) {
            setIsProductsLoading(false);
        }
    }, [categoryProducts]);

    const handleSortMenu = () => {
        setIsSortMenuOpen(!isSortMenuOpen);
    }

    const handleSortChange = (target) => {
        setSelectedSortType(target);
    };

    const handleCloseMenu = () => {
        setIsSortMenuOpen(false);
    }

    useEffect(() => {
        if (categoryProducts.length > 0) {
            // Sort logic based on selected type
            switch (selectedSortType) {
                case 'newest':
                    setCategoryProducts([...categoryProducts].sort((a, b) => {
                        const aIsNewArrival = a.hasOwnProperty('sellingAttributes') && a.sellingAttributes.includes('New Arrival');
                        const bIsNewArrival = b.hasOwnProperty('sellingAttributes') && b.sellingAttributes.includes('New Arrival');

                        // Items with 'New Arrival' should come first
                        if (aIsNewArrival && !bIsNewArrival) return -1;
                        if (!aIsNewArrival && bIsNewArrival) return 1;
                        return 0; // Preserve original order for items with the same status
                    }));
                    break;
                case 'lowestPrice':
                    setCategoryProducts([...categoryProducts].sort((a, b) => a.whitePrice.value - b.whitePrice.value));
                    break;
                case 'highestPrice':
                    setCategoryProducts([...categoryProducts].sort((a, b) => b.whitePrice.value - a.whitePrice.value));
                    break;
                default: // 'recommended'
                    currentCategory === 'View All' ? setCategoryProducts(queryResult) : setCategoryProducts(queryResult.filter(res => res.categoryName === currentCategory)); // Revert to original data
                    break;
            }
        }
    }, [selectedSortType, queryResult]);

    useEffect(() => {
        setProgress((categoryProducts.length / maxProducts) * 100);
    }, [categoryProducts, maxProducts]);

    useEffect(() => {
        fetchQueryResult();
    }, [currentPage]);

    const handleLoadMore = () => {
        setLoadingMore(true);
        if (categoryProducts.length < maxProducts) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    return (
        <div className='my-container mt-[105px] min-h-[calc(100%-80px)]'>
            <Toaster />
            {isProductsLoading ? (
                <div>
                    <Skeleton width={300} height={36} className="mb-4" />
                    <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} width={100} height={40} className="rounded" />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
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
            )}

            {isProductsLoading ? (
                <div>
                    <Skeleton width={100} height={36} className="my-4" />
                </div>
            ) : (
                <SortButton
                    sortChange={handleSortChange}
                    isSortMenuOpen={isSortMenuOpen}
                    handleSortMenu={handleSortMenu}
                    selectedSortType={selectedSortType}
                    closeMenu={handleCloseMenu}
                />
            )}

            {isProductsLoading ? (
                <div className="grid grid-cols-4 gap-x-4 gap-y-12">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <Skeleton height={500} width={330} className="mb-2" />
                            <Skeleton width={80} height={20} className="mb-1" />
                            <Skeleton width={80} height={20} />
                        </div>
                    ))}
                </div>
            ) : (
                categoryProducts && categoryProducts.length > 0 && (
                    categoryProducts.length > 0 &&
                    <ExploreProducts
                        onOpenModal={onOpenModal}
                        products={categoryProducts}
                        addToFavorite={addToFavorite}
                        likedProductIds={likedProductIds}
                        updateLikedProducts={updateLikedProducts}
                    />
                )
            )}

            {currentCategory === 'View All' &&
                <div className="flex flex-col justify-center items-center mt-10">
                    <p className="mb-4 text-sm text-red-600">You've viewed {queryResult.length} of {maxProducts} products</p>
                    <div className="w-[40%] bg-gray-200 h-1 mb-5 mx-auto">
                        <div className="bg-red-600 h-1" style={{ width: `${progress}%` }}></div>
                    </div>
                    <button
                        className={`bg-black text-white h-14 w-[11rem] flex justify-center items-center transition-colors ${queryResult.length === maxProducts
                            ? 'cursor-not-allowed opacity-70'
                            : 'hover:bg-gray-800'
                            }`}
                        onClick={handleLoadMore}
                        disabled={queryResult.length === maxProducts}
                    >
                        {loadingMore ? <FaSpinner className="animate-spin mr-2" /> : 'LOAD MORE'}
                    </button>
                </div>}
        </div>
    )
}

export default SearchExplore