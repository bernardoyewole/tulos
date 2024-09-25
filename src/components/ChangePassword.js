import { useState } from "react";
import { MdOutlineLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons

function ChangePassword({ submitNewPassword }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'currentPassword') {
            setCurrentPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        const errors = {
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[^a-zA-Z0-9]/.test(password),
        };
        setValidationErrors(errors);

        setIsFormValid(Object.values(errors).every(Boolean));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            const res = await submitNewPassword(currentPassword, newPassword);

            if (res.includes('successfully')) {
                setErrorMessage('');
                setSuccessMessage(res);
            } else {
                setSuccessMessage('');
                setErrorMessage(res);
            }
        } else {
            setErrorMessage("Password does not meet the required criteria");
        }
    };

    return (
        <div className="p-6 bg-white">
            <div className='flex gap-4 items-center pb-6 text-gray-800'>
                <MdOutlineLock className='text-3xl' />
                <h2 className="text-2xl font-semibold">CHANGE PASSWORD</h2>
            </div>
            <p className='text-sm text-gray-800 mb-6'>Feel free to update your password so your TULOS account stays secure. (* Indicates a required field).</p>

            <form onSubmit={handleSubmit} className="w-[356px]">
                <div className="mb-6 relative">
                    <label htmlFor="currentPassword" className="pb-2 block text-sm font-semibold text-gray-700">CURRENT PASSWORD *</label>
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        id="currentPassword"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleChange}
                        className="w-full p-3 text-sm border border-gray-300 "
                        required
                    />
                    <span
                        className="absolute top-11 right-2 cursor-pointer"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                        {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>

                <div className="mb-2 relative">
                    <label htmlFor="newPassword" className="pb-2 block text-sm font-semibold text-gray-700">NEW PASSWORD *</label>
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        className="w-full p-3 text-sm border border-gray-300 "
                        required
                    />
                    <span
                        className="absolute top-11 right-2 cursor-pointer"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>

                    <ul className="text-xs text-gray-500 pt-2">
                        <li className={validationErrors.length ? 'text-green-500' : 'text-yellow-600'}>
                            - At least six characters long
                        </li>
                        <li className={validationErrors.uppercase ? 'text-green-500' : 'text-yellow-600'}>
                            - At least one uppercase letter
                        </li>
                        <li className={validationErrors.lowercase ? 'text-green-500' : 'text-yellow-600'}>
                            - At least one lowercase letter
                        </li>
                        <li className={validationErrors.number ? 'text-green-500' : 'text-yellow-600'}>
                            - At least one numeric digit
                        </li>
                        <li className={validationErrors.specialChar ? 'text-green-500' : 'text-yellow-600'}>
                            - At least one special character
                        </li>
                    </ul>
                </div>

                <p className="text-red-500 text-sm h-3">{errorMessage && errorMessage}</p>
                <p className="text-green-500 text-sm h-3">{successMessage && successMessage}</p>

                <button
                    type="submit"
                    className={`w-full py-3 mt-2  ${isFormValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                    disabled={!isFormValid}
                >
                    SAVE PASSWORD
                </button>
            </form>
        </div>
    )
}

export default ChangePassword;
