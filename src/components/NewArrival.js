import { LiaHeart } from "react-icons/lia";
import { Link } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { useAuth } from "../provider/AuthProvider";

function NewArrival({ newArrivals, addtoFavorite, onOpenModal }) {
    const { email, isAuthenticated } = useAuth();

    const handleLike = (arrival) => {
        if (!isAuthenticated) {
            onOpenModal();
        }

        const product = {
            userEmail: email,
            hmProductId: arrival.defaultArticle.code,
            name: arrival.name,
            imageUrl: arrival.images[0].baseUrl,
            price: arrival.price.value
        }

        addtoFavorite(product);
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
                                className='absolute z-20 bottom-3 right-4 text-white text-2xl fill-current hover:text-red-500 transition-colors duration-300'
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
