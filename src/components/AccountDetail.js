import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PiIdentificationCardBold } from "react-icons/pi";

const MyDetailsForm = ({ email, user, saveChanges, setIsDetailModified, isDetailModified }) => {
    const [userInfo, setUserInfo] = useState(user);

    // const [isFormModified, setIsFormModified] = useState(false);

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
            <form onSubmit={handleSaveChanges} className='w-[356px]'>
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
                        className="w-full p-4 border border-gray-300 text-gray-800 text-sm "
                        required
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
