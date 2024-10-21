import { useEffect, useState } from 'react';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function MobileMenu({ isOpen, closeMenu, options }) {
    const [selectedMenu, setSelectedMenu] = useState('Women');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentCategories, setCurrentCategories] = useState([]);

    const handleBack = () => {
        if (selectedCategory) {
            // If we're viewing a category, go back to the main menu of selectedMenu
            setSelectedCategory(null);
        } else {
            closeMenu();
        }
    };

    useEffect(() => {
        if (options.length > 0) {
            setCurrentCategories(options.find(cat => cat.CatName === selectedMenu)?.CategoriesArray);

        }
    }, [options, selectedMenu]);

    useEffect(() => {
        setSelectedCategory(null);
    }, [selectedMenu]);

    return (
        <div>
            <div
                className={`fixed inset-0 bg-black transition-all duration-500 ${isOpen ? 'opacity-50 visible z-40' : 'opacity-0 invisible'
                    }`}
                onClick={closeMenu}
            />

            <div
                className={`overflow-scroll fixed top-0 right-0 h-full w-full sm:w-[70%] md:w-[40%] bg-white px-4 py-6 transition-transform transform z-50 duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Top Navigation Controls */}
                <div className="flex justify-end mb-4">
                    <IoCloseOutline className="text-3xl cursor-pointer" onClick={closeMenu} />
                </div>

                {/* Main Menu - Display Main Navigation Links */}
                <ul className="flex gap-6 sm:gap-8 justify-center items-center mb-10">
                    {['Women', 'Men', 'Baby', 'Kids', 'Home'].map(menu => (
                        <li key={menu}>
                            <a
                                onClick={() => setSelectedMenu(menu)}
                                className={`uppercase font-semibold text-sm ${selectedMenu === menu ? 'text-black' : 'text-gray-600'
                                    }`}
                            >
                                {menu}
                            </a>
                        </li>
                    ))}
                </ul>

                {!selectedCategory ? (
                    <>
                        {/* Display Categories for Selected Menu if they have valid tag codes and subcategories */}
                        <ul className="flex flex-col gap-4">
                            {currentCategories.map(category => (
                                category.CategoriesArray?.length > 0 && category.CategoriesArray.every(array => array.tagCodes.length > 0) &&
                                <li key={category.CatName} className="text-sm">
                                    <a
                                        onClick={() => setSelectedCategory(category)}
                                        className="block font-semibold uppercase hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {category.CatName}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    // Display Subcategories for the Selected Category
                    <>
                        <button onClick={handleBack} className="text-sm font-semibold">
                            {selectedCategory &&
                                <HiOutlineArrowSmallLeft className='text-2xl' />}
                        </button>
                        <p className='uppercase py-4 text-sm'>{selectedCategory.CatName}</p>
                        <ul className="flex flex-col gap-4">
                            {selectedCategory.CategoriesArray.map(subcategory => (
                                <li key={subcategory.CatName} className="text-sm">
                                    <Link
                                        to={`explore/${selectedMenu}/${selectedCategory.CatName}/${subcategory.CatName}`}
                                        onClick={closeMenu}
                                        className="block uppercase font-semibold hover:text-gray-600 transition-colors duration-2s00"
                                    >
                                        {subcategory.CatName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default MobileMenu;
