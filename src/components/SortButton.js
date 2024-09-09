import { IoAddOutline } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import { useEffect, useRef } from "react";

function SortButton({ sortChange, isSortMenuOpen, selectedSortType, handleSortMenu, closeMenu }) {
    const handleSortChange = (event) => {
        sortChange(event.target.value)
    }

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                onClick={handleSortMenu}
                className="flex gap-1 items-center my-4 hover:opacity-80"
            >
                <span className="font-semibold text-sm">SORT BY</span>
                {isSortMenuOpen ? <AiOutlineMinus className="text-black text-2xl" /> : <IoAddOutline className="text-black text-2xl" />}
            </button>

            {isSortMenuOpen && (
                <div
                    className="absolute px-4 py-2 left-0 z-10 w-56 origin-top-right border border-black bg-white"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1 text-[13px]" role="none">
                        <label className="flex items-center space-x-2 py-2.5 cursor-pointer">
                            <input
                                type="radio"
                                name="sortType"
                                value="recommended"
                                checked={selectedSortType === 'recommended'}
                                onChange={handleSortChange}
                                className="text-red-600 focus:ring-transparent cursor-pointer"
                            />
                            <span className="leading-[1]">Recommended</span>
                        </label>
                        <label className="flex items-center space-x-2 py-2.5 cursor-pointer">
                            <input
                                type="radio"
                                name="sortType"
                                value="newest"
                                checked={selectedSortType === 'newest'}
                                onChange={handleSortChange}
                                className="text-red-600 focus:ring-transparent cursor-pointer"
                            />
                            <span className="leading-[1]">What's new</span>
                        </label>
                        <label className="flex items-center space-x-2 py-2.5 cursor-pointer">
                            <input
                                type="radio"
                                name="sortType"
                                value="lowestPrice"
                                checked={selectedSortType === 'lowestPrice'}
                                onChange={handleSortChange}
                                className="text-red-600 focus:ring-transparent cursor-pointer"
                            />
                            <span className="leading-[1]">Price low to high</span>
                        </label>
                        <label className="flex items-center space-x-2 py-2.5 cursor-pointer">
                            <input
                                type="radio"
                                name="sortType"
                                value="highestPrice"
                                checked={selectedSortType === 'highestPrice'}
                                onChange={handleSortChange}
                                className="text-red-600 focus:ring-transparent cursor-pointer"
                            />
                            <span className="leading-[1]">Price high to low</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SortButton