import React, { useEffect } from 'react';
import HeroBanner from "../components/HeroBanner";
import NewArrival from "../components/NewArrival";
import NewStore from "../components/NewStore";
import Featured from '../components/Featured';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';
import { useAuth } from '../provider/AuthProvider';
import axios from 'axios';

function Home({ newArrivals, onOpenModal }) {
    const { isAuthenticated } = useAuth();
    const isLoading = !newArrivals || newArrivals.length === 0;

    useEffect(() => {
        console.log(isAuthenticated);
    }, [isAuthenticated]);

    const addtoFavorite = async (product) => {
        console.log(product);
        try {
            const response = await axios.post('https://localhost:44397/api/Favorite/addToFavorite', product);
            if (response.status === 200) {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <HeroBanner />
            {isLoading ? (
                <section className="pt-20">
                    <h2 className="text-center text-4xl">
                        <Skeleton width={200} />
                    </h2>
                    <p className="text-sm text-gray-600 text-center pt-2 pb-10">
                        <Skeleton width={300} />
                    </p>
                    <div className="my-container grid grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index}>
                                <Skeleton height={200} width="100%" className="rounded" />
                                <Skeleton width={100} height={20} className="mt-2" />
                                <Skeleton width={50} height={20} />
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
                    <NewArrival newArrivals={newArrivals} addtoFavorite={addtoFavorite} onOpenModal={onOpenModal} />
                </motion.div>
            )}
            <NewStore />
            <Featured />
        </>
    );
}

export default Home;
