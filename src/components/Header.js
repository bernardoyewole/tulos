import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LiaHeart } from "react-icons/lia";
import { BsHandbag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import SignInSignUp from "./SignInSignUp";
import 'react-responsive-modal/styles.css';
import { useAuth } from "../provider/AuthProvider";
import { useCart } from "../provider/CartProvider";
import SearchMenu from "./SearchMenu";
import { IoCloseOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import MobileMenu from "./MobileMenu";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { LuMenu } from "react-icons/lu";

function Header({ categories, onOpenModal, onCloseModal, isModalOpen, handleSearch, welcomeUser }) {
    const [currentMenu, setCurrentMenu] = useState('');
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [season, setSeason] = useState('');
    const [isSearchMenuOpen, setisSearchMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { isAuthenticated } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleMouseLeave = () => {
        setCurrentMenu('');
    };

    const handleAccountClick = async () => {
        if (isAuthenticated) {
            navigate('/account');
        } else {
            onOpenModal();
        }
    }

    const handleFavoritesClick = () => {
        if (isAuthenticated) {
            navigate('/favorites');
        } else {
            onOpenModal();
        }
    }

    const handleCartClick = () => {
        if (isAuthenticated) {
            navigate('/cart');
        } else {
            onOpenModal();
        }
    }

    const handleSearchMenuOpen = () => {
        openSearchMenu();
    }

    const openSearchMenu = () => {
        setisSearchMenuOpen(true);
    };

    const closeSearchMenu = () => {
        setisSearchMenuOpen(false);
    };

    const openMobileMenu = () => {
        setIsMobileMenuOpen(true);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    }

    // Define end dates for each season
    const seasons = {
        Summer: new Date('2024-09-30T23:59:59'), // Example: Summer ends on September 30
        Fall: new Date('2024-12-21T23:59:59'),   // Example: Fall ends on December 21
        Winter: new Date('2025-03-19T23:59:59'), // Example: Winter ends on March 19
    };

    // Determine the current season based on the current date
    const determineSeason = () => {
        const now = new Date();

        if (now <= seasons.Summer) {
            return 'Summer';
        } else if (now <= seasons.Fall) {
            return 'Fall';
        } else if (now <= seasons.Winter) {
            return 'Winter';
        } else {
            return 'Summer'; // Reset to next Summer (for next cycle)
        }
    };

    useEffect(() => {
        // Set the initial season
        const initialSeason = determineSeason();
        setSeason(initialSeason);

        // Function to update the time left
        const updateTimeLeft = () => {
            const now = new Date();
            const seasonEndDate = seasons[initialSeason];
            const difference = seasonEndDate - now;

            if (difference > 0) {
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
                const minutes = Math.floor((difference / (1000 * 60)) % 60).toString().padStart(2, '0');
                const seconds = Math.floor((difference / 1000) % 60).toString().padStart(2, '0');

                setTimeLeft({ hours, minutes, seconds });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timerId = setInterval(updateTimeLeft, 1000);

        updateTimeLeft();

        return () => clearInterval(timerId);
    }, [season]);

    return (
        <section className="w-full bg-white">
            <div className="bg-[#151515] h-[35px] grid place-content-center">
                <p className="text-white text-xs sm:text-sm">
                    Get 25% Off This {season} Sale. Grab It Fast!!
                    <span className="inline-block w-32 text-center">
                        {`${timeLeft.hours}H : ${timeLeft.minutes}M : ${timeLeft.seconds}S`}
                    </span>
                </p>
            </div>
            <div className="my-container">
                <nav className="flex justify-between items-center h-[70px] leading-[70px]">
                    <ul className="md:flex gap-4 group relative md:visible hidden" onMouseLeave={handleMouseLeave}>
                        {['Women', 'Men', 'Baby', 'Kids', 'Home'].map(menu => (
                            <li key={menu}>
                                <a
                                    className={`inline-block hover:underline underline-offset-4 ${currentMenu === menu && 'underline'}`}
                                    onMouseOver={() => setCurrentMenu(menu)}
                                >
                                    {menu}
                                </a>
                            </li>
                        ))}

                        <div
                            className="dropdown-content absolute top-[70px] px-10 pb-10 pt-2 hidden backdrop-blur-sm bg-black/60 text-white shadow-lg dropdown-container z-10 group-hover:block transition-all ease-in-out duration-300"
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="flex gap-16">
                                {categories.length > 0 && categories.find(cat => cat.CatName === currentMenu)?.CategoriesArray.map(category => (
                                    category.CategoriesArray?.length > 0 && category.CategoriesArray.every(array => array.tagCodes.length > 0) &&
                                    <div key={uuidv4()}>
                                        <h2>{category.CatName}</h2>
                                        <ul className="flex flex-col gap-3">
                                            {category.CategoriesArray?.map(subcategory => (
                                                subcategory.tagCodes && subcategory.tagCodes.length > 0 &&
                                                <li key={uuidv4()} className="text-sm capitalize" onClick={handleMouseLeave}>
                                                    <Link to={`explore/${currentMenu}/${category.CatName}/${subcategory.CatName}`}>{subcategory.CatName}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ul>
                    <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                        <Link to='/' className="font-sans font-bold text-2xl md:text-3xl leading-[4] md:leading-[7]">TULOS</Link>
                    </div>
                    <ul className="flex gap-5 md:gap-6 items-center">
                        <li onClick={handleSearchMenuOpen} className="cursor-pointer">
                            <IoSearchOutline className="text-[20px] hover:text-gray-700" />
                        </li>
                        <li onClick={handleAccountClick} className="cursor-pointer">
                            <FaRegUser className="text-[17px] text-gray-700 hover:text-gray-600" />
                        </li>
                        <li onClick={handleFavoritesClick} className="cursor-pointer">
                            <LiaHeart className="text-xl hover:text-gray-700" />
                        </li>
                        <li onClick={handleCartClick} className="cursor-pointer relative">
                            <BsHandbag className="text-lg hover:text-gray-700" />
                            <span className="absolute -top-2 -right-2  text-xs">{cartItems.length > 0 && `${cartItems.length}`}</span>
                        </li>
                        {/* Hamburger Icon */}
                        <div className="md:hidden mt-[2px]" onClick={openMobileMenu}>
                            <HiOutlineMenu className="text-2xl cursor-pointer text-gray-800" />
                        </div>
                    </ul>
                </nav>
                <SignInSignUp
                    isModalOpen={isModalOpen}
                    closeModal={onCloseModal}
                    welcomeUser={welcomeUser}
                />
            </div>
            <SearchMenu
                isOpen={isSearchMenuOpen}
                closeMenu={closeSearchMenu}
                search={handleSearch}
            />
            <MobileMenu
                isOpen={isMobileMenuOpen}
                closeMenu={closeMobileMenu}
                options={categories}
                selectMenu={setCurrentMenu}
            />
        </section>
    );
}

export default Header;
