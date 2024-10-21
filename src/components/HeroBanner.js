function HeroBanner({ shopNow }) {

    return (
        <section className="h-[calc(100%-105px)]">
            <div className="bg-[url('../images/hero-light.jpg')] bg-cover h-full">
                <div className="bg-black/50 lg:bg-black/30 h-full flex items-center lg:items-end px-6 py-10">
                    <div className="w-full max-w-[1380px] mx-auto flex flex-col">
                        <h1 className="text-white text-[50px] lg:text-[62px] text-balance mb-2 lg:mb-0 md:text-center lg:text-left">TULOS SPRING COLLECTION</h1>
                        <div className="flex flex-col gap-6 lg:gap-4 lg:flex-row lg:justify-between lg:items-center">
                            <p className="text-white md:text-center md:text-balance">Find out our best spring collection. Offering our best quality product in a Tulos Spring Collection</p>
                            <button className="text-black bg-white py-3 w-40 text-md rounded-full self-center" onClick={shopNow}>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner