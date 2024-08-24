import store from '../images/store.jpg';

function NewStore() {
    return (
        <section className='py-28'>
            <div className='my-container flex items-center gap-10'>
                <div>
                    <img src={store} />
                </div>
                <div>
                    <h2 className='text-4xl pb-4'>Find Your Perfect Look at Tulos Stylish New on Tokyo</h2>
                    <p className='text-gray-600 text-sm'>
                        Welcome to the newest Tulos outlet in Shibuya, Japan! Step into our
                        stylish and trendy store and discover the latest in fashion and apparel.
                        Come and experience the unique and vibrant atmosphere.
                    </p>
                    <div className='flex flex-col items-start gap-4 pt-10'>
                        <p className='text-md font-semibold leading-[1]'>Come and Enjoy Sales!</p>
                        <p className='text-5xl'>50%</p>
                        <button className='text-white bg-black py-3 px-10 text-[13px] rounded-full'>Check Sales</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewStore