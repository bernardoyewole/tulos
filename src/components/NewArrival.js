import axios from 'axios';
import { useEffect, useState } from 'react';
import { LiaHeart } from "react-icons/lia";

function NewArrival() {
    const [baseApparel, setBaseApparel] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);

    const optionsWomen = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
        params: {
            country: 'us',
            lang: 'en',
            currentpage: '0',
            pagesize: '30',
            categories: 'ladies_all'
        },
        headers: {
            'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
            'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
    };

    const optionsMen = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
        params: {
            country: 'us',
            lang: 'en',
            currentpage: '0',
            pagesize: '30',
            categories: 'men_all',
            concepts: 'H&M MAN'
        },
        headers: {
            'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
            'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
    };

    const shuffle = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };

    useEffect(() => {
        const fetchBaseApparel = async () => {
            try {
                const storedArrivals = JSON.parse(localStorage.getItem('newArrivals'));
                const expirationTime = 24 * 60 * 60 * 1000; // 24 hours

                if (storedArrivals && (Date.now() - storedArrivals.timestamp < expirationTime)) {
                    setNewArrivals(storedArrivals.data);
                } else {
                    const [responseMen, responseWomen] = await Promise.all([
                        axios.request(optionsMen),
                        axios.request(optionsWomen)
                    ]);

                    const baseApparel = [...responseMen.data.results, ...responseWomen.data.results];
                    shuffle(baseApparel);
                    setBaseApparel(baseApparel);
                    updateNewArrivals(baseApparel);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const updateNewArrivals = async (baseApparel) => {
            const storedArrivals = JSON.parse(localStorage.getItem('newArrivals'));
            const expirationTime = 24 * 60 * 60 * 1000; // 24 hours

            if (storedArrivals && (Date.now() - storedArrivals.timestamp < expirationTime)) {
                setNewArrivals(storedArrivals.data);
            } else {
                const validNewArrivals = [];
                let index = 0;

                while (validNewArrivals.length < 10 && index < baseApparel.length) {
                    const item = baseApparel[index];
                    try {
                        await new Promise((resolve, reject) => {
                            const img = new Image();
                            img.src = item.images[0].baseUrl;
                            img.onload = resolve;
                            img.onerror = reject;
                        });
                        validNewArrivals.push(item);
                    } catch {
                        console.warn(`Image failed to load for item: ${item.code}, trying next item...`);
                    }
                    index++;
                }

                setNewArrivals(validNewArrivals);
                localStorage.setItem('newArrivals', JSON.stringify({ data: validNewArrivals, timestamp: Date.now() }));
            }
        };

        fetchBaseApparel();
    }, []);

    return (
        <section className='pt-20'>
            <h2 className='text-center text-4xl'>NEW ARRIVALS</h2>
            <p className='text-sm text-gray-600 text-center pt-2 pb-10'>Our latest collection, where classic and contemporary styles converge in perfect harmony</p>
            <div className='my-container grid grid-cols-5 gap-4'>
                {newArrivals.map((arrival) => (
                    <div key={arrival.code}>
                        <div className='relative cursor-pointer'>
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
