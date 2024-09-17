import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRetype, setShowPasswordRetype] = useState(false);
    const [failed, setFailed] = useState(false);

    const navigate = useNavigate();

    const password = watch('password', '');

    const query = useQuery();
    const email = query.get('email');
    const resetCode = query.get('code').replaceAll(' ', '+');

    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);

        const newPassword = data.password;

        try {
            const response = await axios.post('https://localhost:44397/api/Account/resetPassword', {
                email,
                resetCode,
                newPassword
            });

            console.log(email, resetCode, newPassword);
            console.log(response);

            if (response.status === 200) {
                setFailed(false);
                setMessage(response.data.message);
            }

            setTimeout(() => {
                navigate('/');
            }, 2000);

            setLoading(false);
        } catch (error) {
            setFailed(true);
            setMessage(error.response.data.message);
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-[url('../images/hero-light.jpg')] h-screen bg-cover">
            <div className="bg-black/70 h-full grid place-items-center">
                <div className="bg-white w-[400px] p-6">
                    <h1 className="text-xl mb-6">RESET PASSWORD</h1>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-1 mb-4 relative">
                            <label htmlFor="email" className="text-sm font-medium">EMAIL <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                disabled
                                className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-12 px-3 transition-all duration-300 ease-out text-[15px] cursor-not-allowed disabled:bg-gray-200"
                                autoComplete="off"
                            />
                            <p className="text-[10px] leading-none text-red-500 h-2">{errors.email && `${errors.email.message}`}</p>
                        </div>
                        <div className="flex flex-col gap-1 relative mb-4">
                            <label htmlFor="password" className="text-sm font-medium">CREATE A PASSWORD <span className="text-red-500">*</span></label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className={`border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-[50px] px-3 transition-all duration-300 ease-out text-[15px] bg-yellow-50`}
                                autoComplete="off"
                                {...register('password',
                                    {
                                        required: 'Password is required',
                                        validate: {
                                            length: value => value.length >= 6 || 'Password must be at least 6 characters long',
                                            uppercase: value => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                            lowercase: value => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                                            digit: value => /\d/.test(value) || 'Password must contain at least one numeric digit',
                                            nonalphanumeric: value => /[^a-zA-Z0-9]/.test(value) || 'Password must contain at least one nonalphanumeric character',
                                            emptySpace: value => value.trim() === value || 'Password must not have leading or trailing spaces'
                                        }
                                    }
                                )}
                            />
                            <div className="absolute right-3 top-10 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </div>
                            <p className="text-[10px] leading-none text-red-500 h-2">{errors.password && `${errors.password.message}`}</p>
                        </div>
                        <div className="flex flex-col gap-1 relative mb-4">
                            <label htmlFor="retypePassword" className="text-sm font-medium">RETYPE PASSWORD <span className="text-red-500">*</span></label>
                            <input
                                type={showPasswordRetype ? 'text' : 'password'}
                                id="retypePassword"
                                className={`border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-[50px] px-3 transition-all duration-300 ease-out text-[15px] bg-yellow-50`}
                                autoComplete="off"
                                {...register('retypePassword',
                                    {
                                        required: 'Please retype your password',
                                        validate: value => value === password || "The passwords do not match"
                                    }
                                )}
                            />
                            <div className="absolute right-3 top-10 cursor-pointer text-gray-600" onClick={() => setShowPasswordRetype(!showPasswordRetype)}>
                                {showPasswordRetype ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </div>
                            <p className="text-[10px] leading-none text-red-500 h-2">{errors.retypePassword && `${errors.retypePassword.message}`}</p>
                        </div>
                        <button type="submit" className="w-full bg-black text-white h-12 mb-4 hover:bg-gray-900 flex items-center justify-center" disabled={loading}>
                            {loading ? <FaSpinner className="animate-spin mr-2" /> : 'RESET'}
                        </button>
                        <p className={`h-2 text-[13px] ${failed ? 'text-red-500' : 'text-[#34b17d]'}`}>{message}</p>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ResetPassword