import { Link } from "react-router-dom";

function NewArrival({ newArrivals, shopNow }) {

    return (
        <section className='pt-16 md:pt-20'>
            <h2 className='text-center text-3xl md:text-4xl'>NEW ARRIVALS</h2>
            <p className='text-sm text-gray-600 text-center pt-2 pb-6 md:pb-10 text-balance'>
                Our latest collection, where classic and contemporary styles converge in perfect harmony
            </p>

            <div className='my-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                {newArrivals.map((arrival) => (
                    <div key={arrival.code} className="relative">
                        <Link to={`/product/${arrival.articles[0].code}`} className='relative block'>
                            <img
                                src={arrival.images[0].baseUrl}
                                alt={arrival.name}
                                className="cursor-pointer w-full h-auto object-cover"
                            />
                        </Link>
                    </div>
                ))}
            </div>

            <div className='flex justify-center pt-10'>
                <button
                    className='text-white bg-black py-3 px-10 text-[13px] rounded-full hover:bg-gray-900 transition duration-300'
                    onClick={shopNow}
                >
                    Shop Now
                </button>
            </div>
        </section>

    );
}

export default NewArrival;
