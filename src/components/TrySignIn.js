import { GoShieldLock } from "react-icons/go";
import { FaSpinner } from 'react-icons/fa';
import { useForm } from "react-hook-form";

function TrySignIn({ onTrySignIn, loading, errorMessage }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <h2 className="text-lg font-medium">SIGN IN</h2>
            <p className="text-sm font-normal my-6">
                Sign in with your email or sign up to become a TULOS member
            </p>
            <form onSubmit={handleSubmit(onTrySignIn)}>
                <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email" className="text-sm font-semibold">EMAIL <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="email"
                        className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 focus:ring-0 outline-none h-12 px-3 transition-all duration-300 ease-out text-[15px]"
                        autoComplete="off"
                        {...register('email', { required: 'Email is required' })}
                    />
                    <p className="text-[10px] leading-none text-red-500 h-2">{errors.email?.message || errorMessage}</p>
                </div>
                <div className="flex gap-2 items-center justify-center text-sm text-gray-800 mb-6">
                    <GoShieldLock />
                    <p>All data is kept secure</p>
                </div>
                <button type="submit" className="w-full bg-black text-white h-12 mb-4 hover:bg-gray-900 flex items-center justify-center" disabled={loading}>
                    {loading ? <FaSpinner className="animate-spin mr-2" /> : 'CONTINUE'}
                </button>
            </form>
            <button className="w-full text-black h-12 border border-black hover:bg-gray-100 transition-all ease-in-out duration-300">
                TULOS MEMBERSHIP
            </button>
        </>
    )
}

export default TrySignIn