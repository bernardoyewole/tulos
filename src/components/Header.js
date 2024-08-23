import { FiSearch } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";

function Header() {
    return (
        <>
            <div className="bg-[#151515] h-[35px] grid place-content-center">
                <p className="text-white text-sm">
                    Get 25% Off This Summer Sale. Grab It Fast!! <span>15H : 45M : 37S</span>
                </p>
            </div>
            <div className="my-container">
                <nav className="flex justify-between items-center h-[60px]">
                    <ul className="flex gap-4">
                        <li><a>Women</a></li>
                        <li><a>Men</a></li>
                        <li><a>Kids</a></li>
                        <li><a>New & Featured</a></li>
                        <li><a>Gift</a></li>
                    </ul>
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <a className="font-sans font-bold text-3xl leading-[0.8]">TULOS</a>
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