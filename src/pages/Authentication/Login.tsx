import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from './AuthLayout';
import Loader from '../../common/Loader';

const Login = () => {
  const BASE_URL = import.meta.env.VITE_URL_BACKEND_LOCAL;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(BASE_URL+'login', {
        email,
        password,
      });
      console.log(response);
      const authorizationHeader = response.headers['authorization']; // Suponiendo que el token se envía en el encabezado "Authorization"

      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.replace('Bearer ', ''); // Elimina el prefijo "Bearer "
        localStorage.setItem('token', token);
        const rol = parseToken(token);
        console.log(rol);
        navigate('/' + rol);
      } else {
        setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      }
    } catch (err) {
      console.error(err);
      setError('Email o contraseña incorrecta. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const parseToken = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem('data', JSON.stringify(payload));
      return payload?.rol?.nombre?.toLowerCase();
    } catch (error) {
      console.error('Failed to parse token:', error);
    }
  };

  return (
    <AuthLayout>
      {loading && <Loader />}
      <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <span className="mb-1.5 block font-medium">TEKCAM</span>
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6+ Characters, 1 Capital letter"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>
            </div>
            {error && <div className="mb-4 text-red-500">{error}</div>}

            <div className="mb-5">
              <input
                type="submit"
                value="Iniciar Sesión"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
            <Link
              to="/cliente/reset-password"
              className=" text-blue-600 hover:text-blue-900"
            >
              Olvido su contraseña?
            </Link>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
