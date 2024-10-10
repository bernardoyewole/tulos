import React, { useEffect } from 'react';
import HeroBanner from "../components/HeroBanner";
import NewArrival from "../components/NewArrival";
import NewStore from "../components/NewStore";
import Featured from '../components/Featured';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

function Home({ newArrivals, onOpenModal, addToFavorite, updateLikedProducts, likedProductIds, categories, shopNow, shop }) {
    const isLoading = !newArrivals || newArrivals.length === 0;

    return (
        <div className='mt-[105px]'>
            <HeroBanner categories={categories} shopNow={shopNow} />
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
                                <Skeleton height={350} width="100%" className="rounded" />
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
                    <NewArrival
                        newArrivals={newArrivals}
                        addToFavorite={addToFavorite}
                        onOpenModal={onOpenModal}
                        likedProducts={likedProductIds}
                        updateLikedProducts={updateLikedProducts}
                        shopNow={shopNow}
                    />
                </motion.div>
            )}
            <NewStore />
            <Featured shop={shop} />
        </div>
    );
}

export default Home;
