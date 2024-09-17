import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import { useForm } from "react-hook-form";

function SignUp({ onSignUp, togglePassword, loading, changeModalView, showPassword }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <h2 className="text-lg font-medium">SIGN UP</h2>
            <p className="text-sm font-normal my-6">Sign up to become a TULOS member</p>
            <form onSubmit={handleSubmit(onSignUp)}>
                <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="firstName" className="text-sm font-medium">FIRST NAME <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="firstName"
                        className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-[50px] px-3 transition-all duration-300 ease-out text-[15px]"
                        autoComplete="off"
                        {...register('firstName',
                            {
                                required: 'First Name is required',
                                pattern: {
                                    value: /^(?!\s*$).+/,
                                    message: 'First Name cannot be empty'
                                }
                            })}
                    />
                    <p className="text-[10px] leading-none text-red-500 h-2">{errors.firstName && `${errors.firstName.message}`}</p>
                </div>
                <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="lastName" className="text-sm font-medium">LAST NAME <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="lastName"
                        className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-[50px] px-3 transition-all duration-300 ease-out text-[15px]"
                        autoComplete="off"
                        {...register('lastName', {
                            required: 'Last Name is required',
                            pattern: {
                                value: /^(?!\s*$).+/,
                                message: 'Last Name cannot be empty'
                            }
                        })}
                    />
                    <p className="text-[10px] leading-none text-red-500 h-2">{errors.lastName && `${errors.email.message}`}</p>
                </div>
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
                    <p className="text-[10px] leading-none text-red-500 h-2">{errors.email && `${errors.email.message}`}</p>
                </div>
                <div className="flex flex-col gap-1 relative">
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
                    <div className="absolute right-3 top-10 cursor-pointer text-gray-600" onClick={() => togglePassword(!showPassword)}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </div>
                    <p className="text-[10px] leading-none text-red-500 h-2">{errors.password && `${errors.password.message}`}</p>
                </div>
                <ul className="text-[11px] text-gray-500 mb-3">
                    <li>
                        - at least six characters long
                    </li>
                    <li>
                        - at least one uppercase letter
                    </li>
                    <li>
                        - at least one lowercase letter
                    </li>
                    <li>
                        - at least one numeric digit
                    </li>
                    <li>
                        - at least one nonalphanumeric character
                    </li>
                </ul>
                <button type="submit" className="w-full bg-black text-white h-12 mb-4 hover:bg-gray-900 flex items-center justify-center" disabled={loading}>
                    {loading ? <FaSpinner className="animate-spin mr-2" /> : 'SIGN UP'}
                </button>
                <button onClick={() => changeModalView('signIn')} className="w-full text-black h-12 border border-black hover:bg-gray-100">
                    BACK TO SIGN IN
                </button>
            </form>
        </>
    )
}

export default SignUp