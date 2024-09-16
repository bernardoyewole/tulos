import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { GoShieldLock } from "react-icons/go";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import axios from "axios";

function SignInModal({ open, closeModal }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [modalView, setModalView] = useState('signIn');
  const [loading, setLoading] = useState(false);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const onSignIn = async (data) => {
    if (isValid(data.email)) {
      setLoading(true);

      setErrorMessage('');
      const trimmedEmail = data.email.trim();

      axios.post('https://localhost:44397/api/Account/checkUser', trimmedEmail, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            if (res.data === "User confirmed successfully") {
              setModalView('passwordSignIn');
            } else {
              setModalView('signUp');
            }
          }
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setErrorMessage('Enter a valid email address');
    }
  }

  const onSignUp = async (data) => {
    setLoading(true);

    const trimmedData = {
      email: data.email.trim(),
      password: data.password.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim()
    };

    axios.post('https://localhost:44397/api/Account/register', trimmedData)
      .then(res => {
        console.log(res.data);
        if (res.data.message.includes("User registered successfully") && res.status === 200) {
          closeModal();
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  const onSubmit = data => {
    const trimmedData = {
      email: data.email.trim(),
      password: data.password.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim()
    };

    axios.post('https://localhost:44397/api/Account/register', trimmedData)
      .then(res => {
        if (res.data.message === "User registered successfully" && res.status === 200) {
          console.log('worked!!');
          // navigate('/accountConfirmation', { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
        // const duplicateUserName = err.response.data.DuplicateUserName;

        // if (duplicateUserName && duplicateUserName.length > 0) {
        //   setErrorMessage('An account exists with this email');
        // }
      });
  }

  // Simulate email validation (use actual validation logic in production)
  const isValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const renderModalContent = () => {
    switch (modalView) {
      case 'signIn':
        return (
          <>
            <h2 className="text-lg font-medium">SIGN IN</h2>
            <p className="text-sm font-normal my-6">
              Sign in with your email or sign up to become a TULOS member
            </p>
            <form onSubmit={handleSubmit(onSignIn)}>
              <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="email" className="text-sm font-semibold">EMAIL <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="email"
                  className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-12 px-3 transition-all duration-300 ease-out text-[15px]"
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
        );

      case 'passwordSignIn':
        return (
          <>
            <h2 className="text-lg font-medium mb-4">SIGN IN</h2>
            <p className="text-sm font-normal mb-6">Please sign in with your email and password</p>
            <form>
              <div className="flex flex-col gap-1 mb-4 relative">
                <label htmlFor="email" className="text-sm font-medium">EMAIL <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="email"
                  // value={email}
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
                <div className="absolute right-3 top-10 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
                <p className="text-[10px] leading-none text-red-500 h-2">{errors.password && `${errors.password.message}`}</p>
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm">Remember me</label>
              </div>
              <button type="submit" className="w-full bg-black text-white h-12 mb-4 hover:bg-gray-800">
                CONTINUE
              </button>
              <button onClick={() => setModalView('signIn')} className="w-full text-black h-12 border border-black hover:bg-gray-100">
                BACK TO SIGN IN
              </button>
            </form>
            <button className="text-sm text-gray-500 hover:text-black mt-4">FORGOT PASSWORD?</button>
          </>
        );

      case 'signUp':
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
                <div className="absolute right-3 top-10 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
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
              <button onClick={() => setModalView('signIn')} className="w-full text-black h-12 border border-black hover:bg-gray-100">
                BACK TO SIGN IN
              </button>
            </form>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={closeModal} center>
      <div className="w-[400px] p-6">
        {renderModalContent()}
      </div>
    </Modal>
  );
}

export default SignInModal;
