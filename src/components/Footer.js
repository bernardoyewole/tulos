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
                recipient: email,
            });
            setMessage("Thank you for subscribing!");
            setEmail('');
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <footer className="pt-8">
            <div className="my-container flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-8">
                <div className="flex flex-col w-full lg:w-auto">
                    <a href="/" className="font-sans font-bold text-6xl mb-4">TULOS</a>
                    <p className="text-gray-500 mb-4 text-sm">
                        Get newsletter updates for upcoming products and the best discounts.
                    </p>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="flex-grow px-4 py-2 border rounded-full focus:border-gray-800 focus:ring-0 outline-none text-sm transition duration-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailRef}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 rounded-full w-full sm:w-auto"
                        >
                            Submit
                        </button>
                    </form>
                    {message && <div className="mt-2 text-green-500">{message}</div>}
                </div>

                <div className="flex flex-wrap gap-16">
                    <div>
                        <h3 className="font-bold mb-4">Product</h3>
                        <ul className="text-gray-500 space-y-2 text-sm">
                            {['Tshirt', 'Jacket', 'Shoes', 'Pants', 'Sunglasses', 'Tuxedo'].map((product) => (
                                <li key={product}>
                                    <a href="#" className="hover:text-gray-800 transition">{product}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Categories</h3>
                        <ul className="text-gray-500 space-y-2 text-sm">
                            {['Man', 'Woman', 'Kids', 'Gift', 'New Arrival'].map((category) => (
                                <li key={category}>
                                    <a href="#" className="hover:text-gray-800 transition">{category}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Our Social Media</h3>
                        <ul className="text-gray-500 space-y-2 text-sm">
                            {['Instagram', 'Facebook', 'YouTube', 'Twitter'].map((social) => (
                                <li key={social}>
                                    <a href="#" className="hover:text-gray-800 transition">{social}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-black">
                <div className="my-container py-6 mt-8 flex flex-col-reverse sm:flex-row justify-between items-center text-sm text-white gap-4">
                    <p>© 2023 Tulos Production</p>
                    <div className="flex gap-3">
                        {['Terms & Conditions', 'Privacy Policy', 'Cookie Policy'].map((policy) => (
                            <a key={policy} href="#">
                                {policy}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
