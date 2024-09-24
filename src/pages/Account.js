import React, { useEffect, useState } from 'react';
import AccountMenu from '../components/AccountMenu';
import AccountView from '../components/AccountView';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('orders');
    const [user, SetUser] = useState(null);
    const [userName, SetUserName] = useState('');
    const [isDetailModified, setIsDetailModified] = useState(false);

    const { email, logout } = useAuth();
    const navigate = useNavigate();

    const getUserInfo = () => {
        axios.get(`https://localhost:44397/api/User/${email}`)
            .then(res => {
                if (res.status === 200) {
                    SetUser(res.data);
                    SetUserName(`${res.data.firstName} ${res.data.lastName}`);
                }
            })
            .catch(err => {
                console.log(err.response);
                // setErrorMessage('Some error occurred, try again');
            });
    }

    const saveChanges = (userInfo) => {
        axios.put(`https://localhost:44397/api/User/${email}`, userInfo)
            .then(res => {
                if (res.status === 200) {
                    setIsDetailModified(false);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

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
        <div className='bg-gray-100'>
            <h1 className='text-center text-2xl font-semibold pb-5 pt-10'>MY ACCOUNT</h1>
            <div className="flex my-container min-h-screen pb-10">
                <div className="w-1/4">
                    <AccountMenu
                        selectedMenu={selectedMenu}
                        setSelectedMenu={setSelectedMenu}
                        userName={userName}
                    />
                </div>
                <div className="w-3/4">
                    <AccountView
                        selectedMenu={selectedMenu}
                        user={user}
                        email={email}
                        saveChanges={saveChanges}
                        setIsDetailModified={setIsDetailModified}
                        isDetailModified={isDetailModified}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
