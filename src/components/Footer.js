function Footer() {
    return (
        <footer className="pt-8">
            <div className="my-container flex justify-between items-center mb-8">
                <div className="flex flex-col">
                    <a className="font-sans font-bold text-6xl mb-4">TULOS</a>
                    <p className="text-gray-500 mb-4 text-sm">Get newsletter update for upcoming product and best discount for all item</p>
                    <div className="flex">
                        <input type="email" placeholder="Your Email" className="px-4 py-2 border rounded-l-full w-64 text-sm" />
                        <button className="bg-black text-white px-6 py-2 rounded-r-full">Submit</button>
                    </div>
                </div>
                <div className="flex space-x-16">
                    <div>
                        <h3 className="font-bold mb-4">Product</h3>
                        <ul className="text-gray-500 space-y-2 text-sm">
                            <li>Tshirt</li>
                            <li>Jacket</li>
                            <li>Shoes</li>
                            <li>Pants</li>
                            <li>Sunglasses</li>
                            <li>Tuxedo</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Categories</h3>
                        <ul className="text-gray-500 space-y-2 text-sm">
                            <li>Man</li>
                            <li>Woman</li>
                            <li>Kids</li>
                            <li>Gift</li>
                            <li>New Arrival</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Our Social Media</h3>
                        <ul className="text-gray-500 space-y-2 text-sm">
                            <li>Instagram</li>
                            <li>Facebook</li>
                            <li>Youtube</li>
                            <li>Twitter</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="my-container h-[50px] mt-8 flex justify-between items-center text-sm text-white">
                    <p>© 2023 Tulos Production</p>
                    <div className="flex space-x-8">
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer