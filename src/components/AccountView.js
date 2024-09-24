import Order from "./Order";
import AccountDetail from "./AccountDetail";

const AccountView = ({ selectedMenu, user, email, saveChanges, setIsDetailModified, isDetailModified }) => {
    const renderContent = () => {
        switch (selectedMenu) {
            case 'orders':
                return <Order />
            case 'details':
                return <AccountDetail
                    user={user}
                    email={email}
                    saveChanges={saveChanges}
                    setIsDetailModified={setIsDetailModified}
                    isDetailModified={isDetailModified}
                />
            default:
                return <div className="p-6 bg-white shadow-md"><h2>Welcome to your account!</h2></div>;
        }
    };

    return (
        <div className="w-full">
            {renderContent()}
        </div>
    );
};

export default AccountView;