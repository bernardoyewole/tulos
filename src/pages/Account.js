import React, { useEffect, useState } from 'react';
import AccountMenu from '../components/AccountMenu';
import AccountView from '../components/AccountView';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('orders');
    const [user, SetUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [isDetailModified, setIsDetailModified] = useState(false);

    const { email, logout } = useAuth();
    const navigate = useNavigate();

    const getUserInfo = () => {
        axios.get(`https://tulosapi.azurewebsites.net/api/User/${email}`)
            .then(res => {
                if (res.status === 200) {
                    SetUser(res.data);
                    setUserName(`${res.data.firstName} ${res.data.lastName}`);
                }
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    const saveDetailsChanges = (userInfo) => {
        axios.put(`https://tulosapi.azurewebsites.net/api/User/${email}`, userInfo)
            .then(res => {
                if (res.status === 200) {
                    setIsDetailModified(false);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    const submitNewPassword = async (currentPassword, newPassword) => {
        try {
            const response = await axios.post('https://tulosapi.azurewebsites.net/api/Account/changePassword', {
                email,
                currentPassword,
                newPassword
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    useEffect(() => {
        getUserInfo();
    }, [isDetailModified]);

    useEffect(() => {
        if (selectedMenu === 'logout') {
            logout();
            navigate('/');
        }
    }, [selectedMenu]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-center text-2xl font-semibold pb-5 pt-10">MY ACCOUNT</h1>

            <div className="my-container flex flex-col lg:flex-row md:gap-6 lg:gap-10 min-h-screen pb-10">
                <div className="w-full lg:w-1/4 lg:mr-8 mb-8 lg:mb-0">
                    <AccountMenu
                        selectedMenu={selectedMenu}
                        setSelectedMenu={setSelectedMenu}
                        userName={userName}
                    />
                </div>

                <div className="w-full lg:w-3/4">
                    <AccountView
                        selectedMenu={selectedMenu}
                        user={user}
                        email={email}
                        saveChanges={saveDetailsChanges}
                        setIsDetailModified={setIsDetailModified}
                        isDetailModified={isDetailModified}
                        submitNewPassword={submitNewPassword}
                    />
                </div>
            </div>
        </div>

    );
};

export default AccountPage;
