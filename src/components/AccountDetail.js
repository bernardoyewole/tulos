import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PiIdentificationCardBold } from "react-icons/pi";

const MyDetailsForm = ({ user, saveChanges, setIsDetailModified, isDetailModified }) => {
    const [userInfo, setUserInfo] = useState(user);

    // Track changes in the form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });

        setIsDetailModified(true);
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        saveChanges(userInfo);
    };

    return (
        <div className="p-6 bg-white">
            <div className='flex gap-4 items-center pb-6 text-gray-800'>
                <PiIdentificationCardBold className='text-3xl' />
                <h2 className="text-2xl font-semibold">MY DETAILS</h2>
            </div>
            <p className='text-sm text-gray-800 mb-6'>Feel free to edit any of your details below so your TULOS account is totally up to date. (* Indicates a required field).</p>
            <form onSubmit={handleSaveChanges} className='w-full lg:w-[356px]'>
                <div className="mb-6">
                    <label htmlFor="firstName" className="block text-sm text-gray-700 font-semibold pb-2">FIRST NAME *</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 text-gray-800 text-sm"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="lastName" className="block text-sm text-gray-700 font-semibold pb-2">LAST NAME *</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 text-gray-800 text-sm"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm text-gray-700 font-semibold pb-2">EMAIL ADDRESS *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 text-gray-800 text-sm cursor-not-allowed"
                        required
                        readOnly
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2  ${isDetailModified ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                    disabled={!isDetailModified}
                >
                    SAVE CHANGES
                </button>
            </form>
        </div>
    );
};

export default MyDetailsForm;
