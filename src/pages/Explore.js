import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { LiaHeart } from "react-icons/lia";
import { AsyncImage } from 'loadable-image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

function Explore({ categories }) {
    const [baseClass, setBaseClass] = useState(null);
    const [currentClass, setCurrentClass] = useState(null);
    const [relatedClasses, setRelatedClasses] = useState([]);
    const [products, setProducts] = useState([]);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isProductsLoading, setIsProductsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxProducts, setMaxProducts] = useState(null);
    const [progress, setProgress] = useState(null);

    const { menu, category, subcategory } = useParams();
    const navigate = useNavigate();

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
                console.log(results);
                setProducts(reset ? results : [...products, ...results]);
                setMaxProducts(response.data.pagination.totalNumberOfResults);
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

    const handleClassChange = (classObj) => {
        resetPage();
        setCurrentClass(classObj);
    };

    const resetPage = () => {
        setIsProductsLoading(true);
        setCurrentPage(0);
        setProducts([]);
    }

    const handleLoadMore = () => {
        if (products.length < maxProducts) {
            setCurrentPage(prevPage => prevPage + 1);
        }
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
                currentClass && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div>
                            <h2 className="text-4xl font-semibold uppercase py-6">{currentClass.CatName}</h2>
                            <div className="flex gap-2 overflow-scroll no-scrollbar">
                                <button
                                    onClick={() => handleClassChange(baseClass)}
                                    className={`px-2 py-1.5 uppercase text-sm font-semibold border-black border whitespace-nowrap ${currentClass?.CatName === baseClass.CatName ? 'bg-black text-white' : 'bg-transparent'}`}
                                >
                                    {baseClass.CatName}
                                </button>
                                {relatedClasses.map(c => (
                                    c.CategoryValue !== 'view-all' &&
                                    <button
                                        key={uuidv4()}
                                        onClick={() => handleClassChange(c)}
                                        className={`px-2 py-1.5 uppercase text-sm font-semibold border-black border whitespace-nowrap ${currentClass?.CatName === c.CatName ? 'bg-black text-white' : 'bg-transparent'}`}
                                    >
                                        {c.CatName}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                )
            )}

            {(isPageLoading || isProductsLoading) ? (
                <div className="grid grid-cols-4 gap-x-4 gap-y-12 mt-6">
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="grid grid-cols-4 gap-x-4 gap-y-12 mt-6">
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
            )}
            <div className="text-center mt-8">
                <p className="mb-4 text-sm text-red-600">You've viewed {products.length} of {maxProducts} products</p>
                <div className="w-[40%] bg-gray-200 h-1 mb-5 mx-auto">
                    <div className="bg-red-600 h-1" style={{ width: `${progress}%` }}></div>
                </div>
                <button
                    className={`bg-black text-white py-4 px-8 transition-colors ${products.length === maxProducts
                        ? 'cursor-not-allowed opacity-70'
                        : 'hover:bg-gray-800'
                        }`}
                    onClick={handleLoadMore}
                    disabled={products.length === maxProducts}
                >
                    LOAD MORE
                </button>
            </div>
        </section>
    );
}

export default Explore;
