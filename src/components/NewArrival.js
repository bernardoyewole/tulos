import { LiaHeart } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

function NewArrival({ newArrivals }) {
    console.log(newArrivals);

    const navigate = useNavigate();

    const handleNavigation = (code) => {
        navigate(`/product/${code}`);
    }

    return (
        <section className='pt-20'>
            <h2 className='text-center text-4xl'>NEW ARRIVALS</h2>
            <p className='text-sm text-gray-600 text-center pt-2 pb-10'>Our latest collection, where classic and contemporary styles converge in perfect harmony</p>
            <div className='my-container grid grid-cols-5 gap-4'>
                {newArrivals.map((arrival) => (
                    <div key={arrival.code}>
                        <div className='relative cursor-pointer' onClick={() => handleNavigation(arrival.articles[0].code)}>
                            <img src={arrival.images[0].baseUrl} alt={arrival.name} />
                            <LiaHeart className='absolute bottom-3 right-4 text-gray-600 text-2xl ' />
                        </div>
                        <p className='pt-2 text-[13px]'>{arrival.name}</p>
                        <p>${arrival.price.value}</p>
                    </div>
                ))}
            </div>
            <div className='flex justify-center pt-6'>
                <button className='text-white bg-black py-3 px-10 text-[13px] rounded-full'>Shop Now</button>
            </div>
        </section>
    )
}

export default NewArrival;
