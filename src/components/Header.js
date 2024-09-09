import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Header({ categories }) {
    const navigate = useNavigate();
    const [currentMenu, setCurrentMenu] = useState('');
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [season, setSeason] = useState('');

    const handleMouseLeave = () => {
        setCurrentMenu('');
    };

    useEffect(() => {
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
        <>
            <div className="bg-[#151515] h-[35px] grid place-content-center">
                <p className="text-white text-sm">
                    Get 25% Off This {season} Sale. Grab It Fast!!
                    <span className="inline-block w-32 text-center">
                        {`${timeLeft.hours}H : ${timeLeft.minutes}M : ${timeLeft.seconds}S`}
                    </span>
                </p>
            </div>
            <div className="my-container">
                <nav className="flex justify-between items-center h-[60px] leading-[60px]">
                    <ul className="flex gap-4 group relative" onMouseLeave={handleMouseLeave}>
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
                            className="dropdown-content absolute top-[60px] p-10 hidden backdrop-blur-sm bg-black/60 text-white shadow-lg dropdown-container z-10 group-hover:block transition-all ease-in-out duration-300"
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
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <a className="font-sans font-bold text-3xl leading-[0.8]" onClick={() => navigate('/')}>TULOS</a>
                    </div>
                    <ul className="flex gap-4 items-center">
                        <li><FiSearch /></li>
                        <li><IoBagHandleOutline /></li>
                        <li><a>Login</a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Header;
