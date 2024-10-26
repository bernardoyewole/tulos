import { RiBox3Line } from "react-icons/ri";
import { PiIdentificationCardBold } from "react-icons/pi";
import { MdOutlineLock } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

const AccountMenu = ({ selectedMenu, setSelectedMenu, userName }) => {
    const menuItems = [
        { name: 'My Orders', key: 'orders', icon: <RiBox3Line className="text-2xl text-gray-800" /> },
        { name: 'My details', key: 'details', icon: <PiIdentificationCardBold className="text-2xl text-gray-800" /> },
        { name: 'Change password', key: 'password', icon: <MdOutlineLock className="text-2xl text-gray-800" /> },
        { name: 'Address book', key: 'addressBook', icon: <RiHome3Line className="text-2xl text-gray-800" /> },
        { name: 'Payment methods', key: 'paymentMethods', icon: <MdOutlinePayment className="text-2xl text-gray-800" /> },
        { name: 'Logout', key: 'logout', icon: <RiLogoutBoxLine className="text-2xl text-gray-800" /> }
    ];

    return (
        <div className="p-4 w-full bg-white">
            <h3 className="text-lg font-semibold mb-6">Hi, {userName}</h3>
            <ul>
                {menuItems.map((item) => (
                    <li
                        key={item.key}
                        className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg transition-all duration-300 ${selectedMenu === item.key ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
                            }`}
                        onClick={() => setSelectedMenu(item.key)}
                    >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default AccountMenu;
