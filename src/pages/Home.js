import HeroBanner from "../components/HeroBanner";
import NewArrival from "../components/NewArrival";
import NewStore from "../components/NewStore";
import Featured from '../components/Featured';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

function Home({ newArrivals, shopNow, shop }) {
    const isLoading = !newArrivals || newArrivals.length === 0;

    return (
        <>
            <HeroBanner shopNow={shopNow} />
            {isLoading ? (
                <section className="pt-20">
                    <h2 className='text-center text-4xl'>NEW ARRIVALS</h2>
                    <p className='text-sm text-gray-600 text-center pt-2 pb-10'>Our latest collection, where classic and contemporary styles converge in perfect harmony</p>
                    <div className="my-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index}>
                                <Skeleton height={300} width="100%" className="rounded" />
                            </div>
                        ))}
                    </div>

                </section>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <NewArrival
                        newArrivals={newArrivals}
                        shopNow={shopNow}
                    />
                </motion.div>
            )}
            <NewStore />
            <Featured shop={shop} />
        </>
    );
}

export default Home;
