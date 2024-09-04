import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const [isLoading, setIsLoading] = useState(true);

    const { menu, category, subcategory } = useParams();
    const navigate = useNavigate();

    // Fetch products based on class code
    const fetchProducts = async (classCode) => {
        try {
            const response = await axios.get('https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list', {
                params: {
                    country: 'us',
                    lang: 'en',
                    currentpage: '0',
                    pagesize: '32',
                    categories: classCode
                },
                headers: {
                    'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
                    'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
                }
            });
            setProducts(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    // Update states based on URL parameters
    useEffect(() => {
        if (categories.length > 0) {
            let currentCategory = categories.find(c => c.CatName === menu);
            let currentSubcategory = currentCategory?.CategoriesArray?.find(c => c.CatName === category);
            let subcategoryClass = currentSubcategory?.CategoriesArray?.find(c => c.CatName === subcategory);

            if (subcategoryClass) {
                setBaseClass(subcategoryClass);
                setRelatedClasses(subcategoryClass.CategoriesArray || []);
                setCurrentClass(subcategoryClass);
                fetchProducts(subcategoryClass.tagCodes[0]);

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
    }, [currentClass]);

    useEffect(() => {
        if (currentClass && products.length > 0) {
            setIsLoading(false);
        }
    }, [currentClass, products]);

    const handleClassChange = (classObj) => {
        setCurrentClass(classObj);
    };

    const handleNavigation = (code) => {
        navigate(`/product/${code}`);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <section className="my-container">
            {isLoading ? (
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

            {isLoading ? (
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
                                    <div className='relative cursor-pointer' onClick={() => handleNavigation(product.defaultArticle.code)}>
                                        <AsyncImage
                                            src={product.defaultArticle.logoPicture[0].baseUrl}
                                            style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                            loader={<div style={{ background: '#ededed' }} />}
                                        />
                                        <LiaHeart className='absolute top-3 right-4 text-gray-600 text-2xl ' />
                                    </div>
                                    <p className='pt-2 text-[13px]'>{product.name}</p>
                                    <p>${product.whitePrice.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )
            )}
        </section>
    );
}

export default Explore;