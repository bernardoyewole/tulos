import menBg from '../images/men-2.jpg';
import womenBg from '../images/women-2.jpg';
import kidsBg from '../images/kids-2.jpg';
import homeBg from '../images/home.jpg';

function Featured() {
    return (
        <section className='pb-20'>
            <h2 className='text-center text-4xl'>FEATURED COLLECTION</h2>
            <p className='text-sm text-gray-600 text-center pt-2 pb-10'>Dare to mix and match! Check our collections to level up your fashion game</p>
            <div className='my-container flex gap-4'>
                <div className='relative'>
                    <div className='bg-black/30 absolute inset-0'>
                    </div>
                    <img src={menBg} />
                    <div className='absolute text-center left-6 bottom-4'>
                        <h3 className='text-4xl text-white pb-4'>MEN</h3>
                        <button className='bg-white py-2 text-sm px-10 rounded-full'>Shop</button>
                    </div>
                </div>
                <div className='relative'>
                    <div className='bg-black/40 absolute inset-0'>
                    </div>
                    <img src={womenBg} />
                    <div className='absolute text-center left-6 bottom-4'>
                        <h3 className='text-4xl text-white pb-4'>WOMEN</h3>
                        <button className='bg-white py-2 text-sm px-10 rounded-full'>Shop</button>
                    </div>
                </div>
                <div className='relative'>
                    <div className='bg-black/35 absolute inset-0'>
                    </div>
                    <img src={kidsBg} />
                    <div className='absolute text-center left-6 bottom-4'>
                        <h3 className='text-4xl text-white pb-4'>KIDS</h3>
                        <button className='bg-white py-2 text-sm px-10 rounded-full'>Shop</button>
                    </div>
                </div>
                <div className='relative'>
                    <div className='bg-black/35 absolute inset-0'>
                    </div>
                    <img src={homeBg} />
                    <div className='absolute text-center left-6 bottom-4'>
                        <h3 className='text-4xl text-white pb-4'>HOME</h3>
                        <button className='bg-white py-2 text-sm px-10 rounded-full'>Shop</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Featured