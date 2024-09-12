import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { GoShieldLock } from "react-icons/go";
import { AiOutlineClose, AiOutlineCheck, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function SignInModal({ open, onCloseModal }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [modalView, setModalView] = useState('signIn'); // State to manage the current modal view
  const [email, setEmail] = useState(''); // State to track the entered email
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);

  const onSubmit = async (data) => {
    // You can handle form submission here if needed
  };

  // Simulate email validation (use actual validation logic in production)
  const validateEmail = (email) => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailIsValid(isValid);
  };


  const handleSignIn = async () => {
    // Simulate checking if email exists in the database
    // This would typically involve an API call
    const emailExists = await checkIfEmailExists(email);

    if (false) {
      // Update modal to Sign In with email and password
      setModalView('passwordSignIn');
    } else {
      // Update modal to Sign Up modal
      setModalView('signUp');
    }
  };

  // Simulate an API call to check if the email exists
  const checkIfEmailExists = async (email) => {
    // Replace this with your actual API call logic
    // Here it's simulated with a random true/false response
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API response (50% chance email exists)
        const exists = Math.random() > 0.5;
        resolve(exists);
      }, 1000); // Simulate network delay
    });
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="email" className="text-sm">Email</label>
                <input
                  type="text"
                  id="email"
                  className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-12 px-3 transition-all duration-300 ease-out text-[15px]"
                  autoComplete="off"
                  {...register('email', { required: 'Email is required' })}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-[10px] leading-none text-red-500 h-2">{errors.email && `${errors.email.message}`}</p>
              </div>
            </form>
            <div className="flex gap-2 items-center justify-center text-sm text-gray-800 mb-6">
              <GoShieldLock />
              <p>All data is kept secure</p>
            </div>
            <button onClick={handleSignIn} className="w-full bg-black text-white py-2 mb-4 hover:bg-gray-800">
              CONTINUE
            </button>
            <button className="w-full text-black py-2 border border-black hover:bg-gray-100">
              TULOS MEMBERSHIP
            </button>
          </>
        );

      case 'passwordSignIn':
        return (
          <>
            <h2 className="text-lg font-medium mb-4">SIGN IN</h2>
            <p className="text-sm font-normal mb-6">Please sign in with your email and password</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-1 mb-4 relative">
                <label htmlFor="email" className="text-sm font-semibold">EMAIL <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  className={`border-[1px] ${emailIsValid ? 'border-green-500' : 'border-gray-300'} rounded-sm focus:border-gray-400 h-12 px-3 transition-all duration-300 ease-out text-[15px]`}
                  autoComplete="off"
                  {...register('email', { required: 'Email is required' })}
                />
                {emailIsValid && <AiOutlineCheck className="absolute right-3 top-10 text-green-500" />}
                <p className="text-[10px] leading-none text-red-500 h-2">{errors.email && `${errors.email.message}`}</p>
              </div>
              <div className="flex flex-col gap-1 mb-4 relative">
                <label htmlFor="password" className="text-sm font-semibold">PASSWORD <span className="text-red-500">*</span></label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-12 px-3 transition-all duration-300 ease-out text-[15px] bg-yellow-50`}
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
              <button type="submit" className="w-full bg-black text-white py-2 mb-4 hover:bg-gray-800">
                CONTINUE
              </button>
              <button type="button" className="w-full text-black py-2 border border-black hover:bg-gray-100">
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="email" className="text-sm">Email</label>
                <input
                  type="text"
                  id="email"
                  className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-12 px-3 transition-all duration-300 ease-out text-[15px]"
                  autoComplete="off"
                  {...register('email', { required: 'Email is required' })}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-[10px] leading-none text-red-500 h-2">{errors.email && `${errors.email.message}`}</p>
              </div>
              <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="password" className="text-sm">Create a Password</label>
                <input
                  type="password"
                  id="password"
                  className="border-[1px] border-gray-300 rounded-sm focus:border-gray-400 h-12 px-3 transition-all duration-300 ease-out text-[15px]"
                  autoComplete="off"
                  {...register('password', { required: 'Password is required' })}
                />
                <p className="text-[10px] leading-none text-red-500 h-2">{errors.password && `${errors.password.message}`}</p>
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 mb-4 hover:bg-gray-800">
                SIGN UP
              </button>
            </form>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className="w-[400px] p-6">
        {renderModalContent()}
      </div>
    </Modal>
  );
}

export default SignInModal;
