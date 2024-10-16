import { useEffect, useState } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";

function SearchMenu({ isOpen, closeMenu, search }) {
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();

    const handleSearch = async (data) => {
        await search(data.queryText);
        closeMenu();
    }

    const query = watch("queryText")

    const handleClearInput = () => {
        reset();
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black transition-all duration-500 ${isOpen ? 'opacity-50 visible z-40' : 'opacity-0 invisible'}`}
                onClick={closeMenu}
            />
            <div
                className={`overflow-scroll fixed top-0 right-0 h-full w-[30%] bg-white px-4 py-6 transition-transform transform z-50 duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center gap-2">
                    <IoSearchOutline className="text-[21px]" />
                    <form onSubmit={handleSubmit(handleSearch)} className="w-[80%]">
                        <input
                            type="text"
                            className="w-full border-0 focus:ring-0 outline-none text-[15px]"
                            placeholder="Search"
                            {...register('queryText', { required: 'Enter product name to search' })}
                        />
                    </form>
                    {
                        query && query.length > 0 ?
                            <button onClick={handleClearInput} className="w-[10%] bg-transparent border-0 font-semibold text-sm mr-4 hover:text-gray-700">CLEAR</button>
                            :
                            <div className="w-[10%] mr-4"></div>
                    }
                    <button onClick={closeMenu} className="w-[10%] flex justify-end">
                        <IoCloseOutline className="text-3xl" />
                    </button>
                </div>
                <p className="text-xs text-red-500 text-center">{errors.queryText && `${errors.queryText.message}`}</p>
            </div>
        </>
    );
}

export default SearchMenu;
