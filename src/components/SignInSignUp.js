import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from '../provider/AuthProvider';
import TrySignIn from './TrySignIn';
import PasswordSignIn from './PasswordSignIn';
import SignUp from './SignUp';

function SignInSignUp({ open, closeModal }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [modalView, setModalView] = useState('signIn');
  const [loading, setLoading] = useState(false);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const { setToken } = useAuth();
  const onTrySignIn = data => {
    if (isValid(data.email)) {
      setLoading(true);

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

  const onSignUp = data => {
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

  const onPasswordSignIn = data => {
    setLoading(true);

    const trimmedData = {
      email: data.email.trim(),
      password: data.password.trim(),
      rememberMe: data.rememberMe
    };

    axios.post('https://localhost:44397/login', trimmedData)
      .then(res => {
        if (res.data.accessToken.length > 0 && res.status === 200) {
          setToken(res.data.accessToken, res.data.refreshToken, res.data.expiresIn, trimmedData.email);
          closeModal();
        }

        setLoading(false);
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.data.status === 401 && err.response.data.title === 'Unauthorized') {
          if (err.response.data.detail === 'NotAllowed') {
            setErrorMessage('Please activate your account');
          } else {
            setErrorMessage('Invalid email or password');
          }
        } else {
          setErrorMessage('Some error occurred, try again')
        }

        setLoading(false);
      });
  }

  const isValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  useEffect(() => {
    setErrorMessage('');
    setLoading(false);
  }, [modalView]);

  const renderModalContent = () => {
    switch (modalView) {
      case 'signIn':
        return <TrySignIn
          onTrySignIn={onTrySignIn}
          loading={loading}
          errorMessage={errorMessage}
        />

      case 'passwordSignIn':
        return <PasswordSignIn
          onPasswordSignIn={onPasswordSignIn}
          loading={loading}
          changeModalView={setModalView}
          showPassword={showPassword}
          togglePassword={setShowPassword}
          errorMessage={errorMessage}
        />

      case 'signUp':
        return <SignUp
          onSignUp={onSignUp}
          loading={loading}
          togglePassword={setShowPassword}
          showPassword={showPassword}
          changeModalView={setModalView}
        />

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

export default SignInSignUp;
