import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Header({ categories }) {
    const navigate = useNavigate();

    const [currentMenu, setCurrentMenu] = useState('Women');

    return (
        <>
            <div className="bg-[#151515] h-[35px] grid place-content-center">
                <p className="text-white text-sm">
                    Get 25% Off This Summer Sale. Grab It Fast!! <span>15H : 45M : 37S</span>
                </p>
            </div>
            <div className="my-container">
                <nav className="flex justify-between items-center h-[60px] leading-[60px]">
                    <ul className="flex gap-4 group relative">
                        <li><a className="inline-block" onMouseOver={() => setCurrentMenu('Women')}>Women</a></li>
                        <li><a className="inline-block" onMouseOver={() => setCurrentMenu('Men')}>Men</a></li>
                        <li><a className="inline-block" onMouseOver={() => setCurrentMenu('Baby')}>Baby</a></li>
                        <li><a className="inline-block" onMouseOver={() => setCurrentMenu('Kids')}>Kids</a></li>
                        <li><a className="inline-block" onMouseOver={() => setCurrentMenu('Home')}>Home</a></li>

                        <div className="dropdown-content absolute top-[60px] p-10 hidden backdrop-blur-sm bg-black/50 text-white shadow-lg dropdown-container z-10 group-hover:block transition-all ease-in-out duration-300">
                            <div className="flex gap-16">
                                {/* {console.log(categories.length > 0 && categories.find(cat => cat.CatName === currentMenu).CategoriesArray)} */}
                                {categories.length > 0 && categories.find(cat => cat.CatName === currentMenu).CategoriesArray.map(category => (
                                    category.CategoriesArray?.length > 0 &&
                                    <div key={uuidv4()}>
                                        <h2>{category.CatName}</h2>
                                        <ul className="flex flex-col gap-3">
                                            {category.CategoriesArray?.map(subcategory => (
                                                <li key={uuidv4()} className="text-sm capitalize">
                                                    <Link to={`explore/${currentMenu}/${category.CatName}/${subcategory.tagCodes[0]}`}>{subcategory.CatName}</Link>
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

    )
}

export default Header