import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Rol } from '../types/Rol';
import { Usuario } from '../types/Usuario';
import axios from 'axios';

// Define el tipo para el contexto del usuario
type UsuariosContextType = {
  roles: Rol[] | null;
  setRoles: React.Dispatch<React.SetStateAction<Rol[] | null>>;
  usuarios: Usuario[] | null;
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[] | null>>;

  fetchUsuarios: () => void;
  preguntas: Pregunta[] | null;
  setPreguntas: React.Dispatch<React.SetStateAction<Pregunta[] | null>>;
  fetchPreguntas: () => void;
};

// Crea el contexto y define el tipo que puede ser UserContextType o undefined
const UsuariosContext = createContext<UsuariosContextType | undefined>(
  undefined,
);

// Hook para usar el contexto
export const useUsuariosContext = (): UsuariosContextType => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Proveedor del contexto del usuario
export const UsuariosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [roles, setRoles] = useState<Rol[] | null>([]);
  const [usuarios, setUsuarios] = useState<Usuario[] | null>([]);
  const [preguntas, setPreguntas] = useState<Pregunta[] | null>([]);

  const BASE_URL = import.meta.env.VITE_URL_BACKEND_LOCAL;
  const token = localStorage.getItem('token');

  const fetchRoles = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      // Solicitud para obtener los roles
      const rolesResponse = await axios.get(`${BASE_URL}rol/all`, {
        headers,
      });
      setRoles(rolesResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchUsuarios = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Solicitud para obtener los usuarios
      const usuariosResponse = await axios.get(`${BASE_URL}rol/vendedor`, {
        headers,
      });
      setUsuarios(usuariosResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchPreguntas = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Solicitud para obtener las preguntas
      const preguntasResponse = await axios.get(`${BASE_URL}pregunta`, {
        headers,
      });
      console.log(preguntasResponse)
      setPreguntas(preguntasResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchUsuarios();
      fetchRoles();
      fetchPreguntas();
    }
  }, [token]);

  return (
    <UsuariosContext.Provider
      value={{
        roles,
        setRoles,
        usuarios,
        setUsuarios,
        fetchUsuarios,
        preguntas,
        setPreguntas,
        fetchPreguntas,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
