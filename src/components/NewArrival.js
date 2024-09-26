import { Link } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";

function NewArrival({ newArrivals, addToFavorite, onOpenModal }) {
    const { email, isAuthenticated } = useAuth();
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        console.log(isAuthenticated);
        const fetchFavorites = async () => {
            if (isAuthenticated) {
                try {
                    const response = await axios.get(`https://localhost:44397/api/Favorite/${email}`);

                    if (response.status === 200) {
                        const favorites = response.data;
                        const likedProductIds = favorites.map(fav => fav.hmProductId);
                        setLikedProducts(likedProductIds);
                    }
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            } else {
                setLikedProducts([]);
            }
        };

        fetchFavorites();
    }, [email, isAuthenticated]);

    const handleLike = async (arrival) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        const product = {
            userEmail: email,
            hmProductId: arrival.defaultArticle.code,
            name: arrival.name,
            imageUrl: arrival.images[0].baseUrl,
            price: arrival.price.value
        }

        const response = await addToFavorite(product);

        if (response === "Product added to favorites") {
            setLikedProducts([...likedProducts, arrival.defaultArticle.code]);
        } else if (response === "Favorite removed") {
            setLikedProducts(likedProducts.filter(id => id !== arrival.defaultArticle.code));
        }
    }

    return (
        <section className='pt-20'>
            <h2 className='text-center text-4xl'>NEW ARRIVALS</h2>
            <p className='text-sm text-gray-600 text-center pt-2 pb-10'>Our latest collection, where classic and contemporary styles converge in perfect harmony</p>
            <div className='my-container grid grid-cols-5 gap-4'>
                {newArrivals.map((arrival) => (
                    <div key={arrival.code}>
                        <Link to={`/product/${arrival.articles[0].code}`} className='relative block'>
                            <img src={arrival.images[0].baseUrl} alt={arrival.name} className="cursor-pointer" />
                            <IoMdHeart
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLike(arrival);
                                }}
                                className={`absolute z-20 bottom-3 right-4 text-2xl fill-current transition-colors duration-300 ${likedProducts.includes(arrival.defaultArticle.code)
                                    ? 'text-red-500'
                                    : 'text-white'
                                    } hover:text-red-500`}
                            />
                        </Link>
                        <p className='pt-2 text-[13px]'>{arrival.name}</p>
                        <p>${arrival.price.value}</p>
                    </div>
                ))}
            </div>

            <div className='flex justify-center pt-6'>
                <button className='text-white bg-black py-3 px-10 text-[13px] rounded-full'>Shop Now</button>
            </div>
        </section>
    );
}

export default NewArrival;
