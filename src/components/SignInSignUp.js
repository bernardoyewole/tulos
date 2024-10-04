import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from '../provider/AuthProvider';
import TrySignIn from './TrySignIn';
import PasswordSignIn from './PasswordSignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

function SignInSignUp({ open, closeModal }) {
  const [modalView, setModalView] = useState('signIn');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const { setToken } = useAuth();

  const onTrySignIn = data => {
    setEmail('');

    if (isValid(data.email)) {
      setLoading(true);

      const trimmedEmail = data.email.trim();

      axios.post('https://tulosapi.azurewebsites.net/api/Account/checkUser', trimmedEmail, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data === "User confirmed successfully") {
              setEmail(trimmedEmail);
              setModalView('passwordSignIn');
            } else {
              setEmail(trimmedEmail);
              setModalView('signUp');
            }
          }

          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    } else {
      setMessage('Enter a valid email address');
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

    axios.post('https://tulosapi.azurewebsites.net/api/Account/register', trimmedData)
      .then(res => {
        if (res.data.message.includes("User registered successfully") && res.status === 200) {
          closeModal();
        }

        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }

  const onForgotPassword = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post('https://tulosapi.azurewebsites.net/api/Account/forgotPassword', data);
      if (response.status === 200) {
        setMessage(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setLoading(false);
    }
  }

  const onPasswordSignIn = data => {
    setLoading(true);

    const trimmedData = {
      email: data.email.trim(),
      password: data.password.trim(),
      rememberMe: data.rememberMe
    };

    axios.post('https://tulosapi.azurewebsites.net/login', trimmedData)
      .then(res => {
        if (res.data.accessToken.length > 0 && res.status === 200) {
          setMessage('');
          setToken(res.data.accessToken, res.data.refreshToken, res.data.expiresIn, trimmedData.email);
          closeModal();
        }

        setLoading(false);
      })
      .catch(err => {
        if (err.response.data.status === 401 && err.response.data.title === 'Unauthorized') {
          if (err.response.data.detail === 'NotAllowed') {
            setMessage('Please activate your account');
          } else {
            setMessage('Invalid email or password');
          }
        } else {
          setMessage('Some error occurred, try again')
        }

        setLoading(false);
      });
  }

  const isValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  useEffect(() => {
    setMessage('');
    setLoading(false);
  }, [modalView]);

  const renderModalContent = () => {
    switch (modalView) {
      case 'signIn':
        return <TrySignIn
          onTrySignIn={onTrySignIn}
          loading={loading}
          errorMessage={message}
        />

      case 'passwordSignIn':
        return <PasswordSignIn
          onPasswordSignIn={onPasswordSignIn}
          loading={loading}
          changeModalView={setModalView}
          showPassword={showPassword}
          togglePassword={setShowPassword}
          errorMessage={message}
          email={email}
        />

      case 'signUp':
        return <SignUp
          onSignUp={onSignUp}
          loading={loading}
          togglePassword={setShowPassword}
          showPassword={showPassword}
          changeModalView={setModalView}
          email={email}
        />

      case 'forgotPassword':
        return <ForgotPassword
          onForgotPassword={onForgotPassword}
          message={message}
          loading={loading}
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
