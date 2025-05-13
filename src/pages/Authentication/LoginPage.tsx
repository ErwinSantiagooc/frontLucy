import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      // Puedes redirigir según el rol del usuario
      const { isAdmin, isCliente } = useAuth();
      
      if (isAdmin()) {
        navigate('/admin/');
      } else if (isCliente()) {
        navigate('/cliente');
      }
    } else {
      setError('Credenciales inválidas');
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-[#FFF5F9]">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-[#F4B1C7]">
      <h2 className="text-2xl font-bold text-center text-[#7A5B47] mb-6">Iniciar Sesión</h2>

      {error && (
        <div className="mb-4 p-2 bg-[#FDDCE4] text-[#A94442] border border-[#E38AAA] rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#7A5B47] mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#F4B1C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B695E0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#7A5B47] mb-1">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#F4B1C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B695E0]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#B695E0] hover:bg-[#A27FD6] text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
);

};

export default LoginPage;