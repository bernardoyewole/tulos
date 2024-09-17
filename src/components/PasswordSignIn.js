import { FaSpinner } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function PasswordSignIn({ onPasswordSignIn, loading, changeModalView, showPassword, togglePassword, errorMessage }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <h2 className="text-lg font-medium mb-4">SIGN IN</h2>
            <p className="text-sm font-normal mb-6">Please sign in with your email and password</p>
            <form onSubmit={handleSubmit(onPasswordSignIn)}>
                <div className="flex flex-col gap-1 mb-4 relative">
                    <label htmlFor="email" className="text-sm font-medium">EMAIL <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="email"
                        className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-12 px-3 transition-all duration-300 ease-out text-[15px]"
                        autoComplete="off"
                        {...register('email', { required: 'Email is required' })}
                    />
                    <p className="text-[10px] leading-none text-red-500 h-2">{errors.email && `${errors.email.message}`}</p>
                </div>
                <div className="flex flex-col gap-1 mb-4 relative">
                    <label htmlFor="password" className="text-sm font-medium">PASSWORD <span className="text-red-500">*</span></label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className={`border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-[50px] px-3 transition-all duration-300 ease-out text-[15px] bg-yellow-50`}
                        autoComplete="off"
                        {...register('password', { required: 'Password is required' })}
                    />
                    <div className="absolute right-3 top-10 cursor-pointer text-gray-600" onClick={() => togglePassword(!showPassword)}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </div>
                    <p className="text-[10px] leading-none text-red-500 h-2">{errors.password && `${errors.password.message}`}</p>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        className="mr-2"
                        {...register('rememberMe')}
                    />
                    <label htmlFor="rememberMe" className="text-sm">Remember me</label>
                </div>
                <p className="text-[12px] leading-none text-red-500 h-6 flex items-center" >{errorMessage && `${errorMessage}`}</p>
                <button type="submit" className="w-full bg-black text-white h-12 mb-4 hover:bg-gray-900 flex items-center justify-center" disabled={loading}>
                    {loading ? <FaSpinner className="animate-spin mr-2" /> : 'CONTINUE'}
                </button>
                <button onClick={() => changeModalView('signIn')} className="w-full text-black h-12 border border-black hover:bg-gray-100">
                    BACK TO SIGN IN
                </button>
            </form>
            <button className="text-sm text-gray-500 hover:text-black mt-4">FORGOT PASSWORD?</button>
        </>
    )
}

export default PasswordSignIn