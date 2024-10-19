import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaSpinner } from "react-icons/fa";
import SortButton from "../components/SortButton";
import CurrentClassButtons from "../components/CurrentClassButtons";
import ExploreProducts from "../components/ExploreProducts";

function Explore({ categories, addToFavorite, likedProductIds, updateLikedProducts, onOpenModal }) {
    const [baseClass, setBaseClass] = useState(null);
    const [currentClass, setCurrentClass] = useState(null);
    const [relatedClasses, setRelatedClasses] = useState([]);
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isProductsLoading, setIsProductsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxProducts, setMaxProducts] = useState(null);
    const [progress, setProgress] = useState(null);
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [selectedSortType, setSelectedSortType] = useState('recommended');
    const [loadingMore, setLoadingMore] = useState(false);

    const { menu, category, subcategory } = useParams();

    const fetchProducts = async (classCode, reset = false) => {
        try {
            const response = await axios.get('https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list', {
                params: {
                    country: 'us',
                    lang: 'en',
                    currentpage: currentPage,
                    pagesize: '30',
                    categories: classCode
                },
                headers: {
                    'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
                    'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
                }
            });

            let results = response.data.results;
            if (results.length > 0) {
                setProducts(reset ? results : [...products, ...results]);
                reset ?? setProducts(results);
                !reset ?? setProducts((prev) => {
                    const combinedResults = [...prev, ...results];
                    return combinedResults.filter(
                        (item, index, self) => index === self.findIndex(obj => obj.code === item.code)
                    );
                });

                setDisplayedProducts(products);
                setMaxProducts(response.data.pagination.totalNumberOfResults);

                setTimeout(() => setLoadingMore(false), 1000);
            }
            else {
                let validTagCode = currentClass.tagCodes.find(x => x.includes(`${currentClass.CatName.toLowerCase()}`));

                if (validTagCode !== undefined) {
                    fetchProducts(validTagCode);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Update states based on URL parameters
    useEffect(() => {
        if (categories.length > 0) {
            resetPage();

            let currentCategory = categories.find(c => c.CatName === menu);
            let currentSubcategory = currentCategory?.CategoriesArray?.find(c => c.CatName === category);
            let subcategoryClass = currentSubcategory?.CategoriesArray?.find(c => c.CatName === subcategory);

            if (subcategoryClass) {
                setBaseClass(subcategoryClass);
                setRelatedClasses(subcategoryClass.CategoriesArray || []);
                setCurrentClass(subcategoryClass);
                fetchProducts(subcategoryClass.tagCodes[0], true);

                if (subcategoryClass.CategoryValue === 'view-all') {
                    let related = currentSubcategory.CategoriesArray.filter(subCat => subCat.CategoryValue !== 'view-all') || [];
                    setRelatedClasses(related);
                }
            }
        }
    }, [menu, category, subcategory, categories]);

    // Update products when the current class changes
    useEffect(() => {
        if (currentClass && currentClass.tagCodes.length > 0) {
            fetchProducts(currentClass.tagCodes[0]);
        }
    }, [currentClass, currentPage]);

    useEffect(() => {
        if (currentClass && products.length > 0) {
            setIsPageLoading(false);
            setIsProductsLoading(false);
        }
    }, [currentClass, products]);

    useEffect(() => {
        setProgress((products.length / maxProducts) * 100);
    }, [products, maxProducts]);

    useEffect(() => {
        if (products.length > 0) {
            // Sort logic based on selected type
            switch (selectedSortType) {
                case 'newest':
                    setDisplayedProducts([...products].sort((a, b) => {
                        const aIsNewArrival = a.hasOwnProperty('sellingAttributes') && a.sellingAttributes.includes('New Arrival');
                        const bIsNewArrival = b.hasOwnProperty('sellingAttributes') && b.sellingAttributes.includes('New Arrival');

                        // Items with 'New Arrival' should come first
                        if (aIsNewArrival && !bIsNewArrival) return -1;
                        if (!aIsNewArrival && bIsNewArrival) return 1;
                        return 0; // Preserve original order for items with the same status
                    }));
                    break;
                case 'lowestPrice':
                    setDisplayedProducts([...products].sort((a, b) => a.whitePrice.value - b.whitePrice.value));
                    break;
                case 'highestPrice':
                    setDisplayedProducts([...products].sort((a, b) => b.whitePrice.value - a.whitePrice.value));
                    break;
                default: // 'recommended'
                    setDisplayedProducts(products); // Revert to original data
                    break;
            }
        }
    }, [selectedSortType, products]);

    const handleClassChange = (classObj) => {
        resetPage();
        setCurrentClass(classObj);
    };

    const resetPage = () => {
        setIsProductsLoading(true);
        setCurrentPage(0);
        setProducts([]);
        setDisplayedProducts([]);
    }

    const handleLoadMore = () => {
        setLoadingMore(true);
        if (products.length < maxProducts) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    const handleSortMenu = () => {
        setIsSortMenuOpen(!isSortMenuOpen);
    }

    const handleSortChange = (target) => {
        setSelectedSortType(target);
    };

    const handleCloseMenu = () => {
        setIsSortMenuOpen(false);
    }

    return (
        <section className="my-container">
            {isPageLoading ? (
                <div>
                    <Skeleton width={300} height={36} className="mb-4" />
                    <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} width={100} height={40} className="rounded" />
                        ))}
                    </div>
                </div>
            ) : (
                currentClass && <CurrentClassButtons
                    currentClass={currentClass}
                    baseClass={baseClass}
                    changeClass={handleClassChange}
                    relatedClasses={relatedClasses}
                />
            )}

            {isPageLoading ? (
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

            {(isPageLoading || isProductsLoading) ? (
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
                products.length > 0 && (
                    <ExploreProducts
                        onOpenModal={onOpenModal}
                        products={displayedProducts}
                        addToFavorite={addToFavorite}
                        likedProductIds={likedProductIds}
                        updateLikedProducts={updateLikedProducts}
                    />
                )
            )}
            <div className="flex flex-col justify-center items-center mt-10">
                <p className="mb-4 text-sm text-red-600">You've viewed {products.length} of {maxProducts} products</p>
                <div className="w-[40%] bg-gray-200 h-1 mb-5 mx-auto">
                    <div className="bg-red-600 h-1" style={{ width: `${progress}%` }}></div>
                </div>
                <button
                    className={`bg-black text-white h-14 w-[11rem] flex justify-center items-center transition-colors ${products.length === maxProducts
                        ? 'cursor-not-allowed opacity-70'
                        : 'hover:bg-gray-800'
                        }`}
                    onClick={handleLoadMore}
                    disabled={products.length === maxProducts}
                >
                    {loadingMore ? <FaSpinner className="animate-spin mr-2" /> : 'LOAD MORE'}
                </button>
            </div>
        </section>
    );
}

export default Explore;
