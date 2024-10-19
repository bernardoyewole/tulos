import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

function Footer() {
    const emailRef = useRef();
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
    const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;

    useEffect(() => {
        emailjs.init(PUBLIC_KEY);
    }, [PUBLIC_KEY]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                recipient: email
            });
            setMessage("Thank you for subscribing!");
            setEmail('');
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };
    return null;
    return (
        <footer className="pt-8">
            <div className="my-container flex justify-between items-center mb-8">
                <div className="flex flex-col">
                    <a className="font-sans font-bold text-6xl mb-4">TULOS</a>
                    <p className="text-gray-500 mb-4 text-sm">Get newsletter update for upcoming product and best discount for all item</p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="px-4 py-2 border rounded-l-full focus:border-gray-800 focus:ring-0 outline-none w-64 text-sm transition-color duration-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ref={emailRef}
                                required
                            />
                            <button type="submit" className="bg-black text-white px-6 py-2 rounded-r-full">Submit</button>
                        </div>
                    </form>
                    {message && <div className="ml-4 text-green-500 h-4 ">{message}</div>}
                </div>
                <div className="flex space-x-16">
                    <div>
                        <h3 className="font-bold mb-4">Product</h3>
                        <ul className="text-gray-500 space-y-2 text-sm">
                            <li><a href="#">Tshirt</a></li>
                            <li><a href="#">Jacket</a></li>
                            <li><a href="#">Shoes</a></li>
                            <li><a href="#">Pants</a></li>
                            <li><a href="#">Sunglasses</a></li>
                            <li><a href="#">Tuxedo</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Categories</h3>
                        <ul className="text-gray-500 space-y-2 text-sm">
                            <li><a href="#">Man</a></li>
                            <li><a href="#">Woman</a></li>
                            <li><a href="#">Kids</a></li>
                            <li><a href="#">Gift</a></li>
                            <li><a href="#">New Arrival</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Our Social Media</h3>
                        <ul className="text-gray-500 space-y-2 text-sm">
                            <li><a>Instagram</a></li>
                            <li><a>Facebook</a></li>
                            <li><a>Youtube</a></li>
                            <li><a>Twitter</a></li>
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