import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveEmail } from '../redux/actions';

function Login() {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [isDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const testLogin = (email: string, password: string) => {
    const emailPattern = /\S+@\S+\.\S+/;
    setButtonDisabled(
      !email
      || !password
      || password.length < 6
      || !emailPattern.test(email),
    );
  };

  useEffect(() => {
    testLogin(emailValue, passwordValue);
  }, [emailValue, passwordValue]);

  const handleLogin = () => {
    dispatch(saveEmail(emailValue));
    navigate('/carteira');
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          data-testid="email-input"
          value={ emailValue }
          onChange={ handleEmail }
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          data-testid="password-input"
          value={ passwordValue }
          onChange={ handlePassword }
        />
      </div>
      <button onClick={ handleLogin } disabled={ isDisabled }>
        Entrar
      </button>
    </div>
  );
}

export default Login;
