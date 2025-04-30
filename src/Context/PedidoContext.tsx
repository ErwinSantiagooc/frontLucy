import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

// Define el tipo para el contexto del usuario
type PedidoContextType = {
  pedidos: any[];
  setPedidos: React.Dispatch<React.SetStateAction<any[]>>;
  fetchPedidosClientes: () => void;
};

// Crea el contexto y define el tipo que puede ser PedidoContextType o undefined
const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

// Hook para usar el contexto
export const usePedidoContext = (): PedidoContextType => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedidoContext must be used within a PedidoProvider');
  }
  return context;
};

// Proveedor del contexto del usuario
export const PedidoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const BASE_URL = import.meta.env.VITE_URL_BACKEND_LOCAL;
  const token = localStorage.getItem('token');
  const [pedidos, setPedidos] = useState<any[]>([]);
  useEffect(() => {
    fetchPedidosClientes();
  }, []);
  const fetchPedidosClientes = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Solicitud para obtener los usuarios
      const response = await axios.get(`${BASE_URL}factura/all`, {
        headers,
      });
      if (response.data.success) {
        setPedidos(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        setPedidos,
        fetchPedidosClientes,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
