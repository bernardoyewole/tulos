import React from 'react'
import HeroBanner from "../components/HeroBanner";
import NewArrival from "../components/NewArrival";
import NewStore from "../components/NewStore";
import Featured from '../components/Featured';


function Home({ newArrivals }) {
    return (
        <>
            <HeroBanner />
            <NewArrival newArrivals={newArrivals} />
            <NewStore />
            <Featured />
        </>
    )
}

export default Home