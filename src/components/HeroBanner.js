function HeroBanner() {
    return (
        <section className="h-full">
            <div className="bg-[url('../images/hero-light.jpg')] bg-cover h-[calc(100%-95px)]">
                <div className="bg-black/20 h-full flex items-end p-6">
                    <div className="my-container flex flex-col">
                        <h1 className="text-white text-[62px]">TULOS SPRING COLLECTION</h1>
                        <div className="flex justify-between items-center">
                            <p className="text-white">Find out our best spring collection. Offering our best quality product in a Tulos Spring Collection</p>
                            <button className="text-black bg-white py-3 px-10 text-sm rounded-full">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner