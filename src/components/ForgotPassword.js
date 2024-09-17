import { useForm } from "react-hook-form";
import { FaSpinner } from 'react-icons/fa';

function ForgotPassword({ onForgotPassword, message, loading }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onForgotPassword)}>
            <p className="text-sm text-gray-700 mb-4">Enter your email to get a password reset link</p>
            <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="email" className="text-sm font-medium">EMAIL <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    id="email"
                    className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-[50px] px-3 transition-all duration-300 ease-out text-[15px]"
                    autoComplete="off"
                    {...register('email',
                        {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Enter a valid email address'
                            }
                        })}
                />
                <p className="text-[12px] leading-none text-red-500 h-2 mb-2">{errors.email && `${errors.email.message}`}</p>
            </div>
            <button type="submit" className="w-full bg-black text-white h-12 mb-4 hover:bg-gray-900 flex items-center justify-center" disabled={loading}>
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'CONTINUE'}
            </button>
            <p className="h-2 text-[13px] text-[#28865f]">{message}</p>
        </form>
    )
}

export default ForgotPassword