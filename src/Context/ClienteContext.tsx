import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import axios from 'axios';
import { Categoria } from '../types/Categoria';
import { Producto } from '../types/producto';
import Carrito from '../types/Carrito';


// Define el tipo para el contexto del producto
type ClienteContextType = {
  categorias: Categoria[] | null;

  fetchCatalogos: () => void;
  productos: Producto[] | null;
  fetchProductos: () => void;
  agregarAlCarrito: (productoId: number) => void;
  quitarDelCarrito: (productoId: number) => void;
  carrito: Carrito[] |null;
  vaciarCarrito: () => void;
  actualizarCantidadCarrito: (productoId: number, cantidad: number) => void;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  preguntas: Pregunta[] | null;
  setPreguntas: React.Dispatch<React.SetStateAction<Pregunta[] | null>>;
};
// Crea el contexto
const ClienteContext = createContext<ClienteContextType | undefined>(
  undefined,
);

// Hook para usar el contexto
export const useClienteContext = (): ClienteContextType => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error(
      'useProductoContext must be used within a ProductoProvider',
    );
  }
  return context;
};

// Proveedor del contexto del producto
export const ClienteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categorias] = useState<Categoria[] | null>([]);
  const [productos,setProductos] = useState<Producto[] | null>([]);
  const BASE_URL = import.meta.env.VITE_URL_BACKEND_LOCAL;
  const [carrito, setCarrito] = useState<Carrito[]>(
    JSON.parse(localStorage.getItem('carrito') || '[]')
  );
  const [preguntas, setPreguntas] = useState<Pregunta[] | null>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchProductos= async()=>{
    try {
      const headers= {
        'Content-Type': 'application/json',
      };
      // Solicitud para obtener los productos
      const productosResponse = await axios.get(`${BASE_URL}producto/cliente`, {
        headers,
      });
      console.log(productosResponse.data.data)
      setProductos(productosResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const fetchPreguntas = async () => {
    try {
     
      // Solicitud para obtener las preguntas
      const preguntasResponse = await axios.get(`${BASE_URL}pregunta/cliente`, {
       
      });
      console.log(preguntasResponse)
      setPreguntas(preguntasResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 

  useEffect(() => {
  

       fetchProductos();
       fetchPreguntas();
    
  }, []);

  const agregarAlCarrito = (productoId: number) => {
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  
    // Busca si el producto ya existe en el carrito
    const productoIndex = carrito.findIndex((item: { id: number; cantidad: number }) => item.id === productoId);
  
    if (productoIndex !== -1) {
      // Si el producto ya existe, incrementa la cantidad
      carrito[productoIndex].cantidad += 1;
    } else {
      // Si el producto no existe, lo agrega con cantidad 1
      carrito.push({ id: productoId, cantidad: 1 });
    }
    setCarrito(carrito);
    setDrawerOpen(true);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };
  
  const quitarDelCarrito = (productoId: number) => {
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  
    // Filtra el carrito para eliminar el producto con el ID dado
    carrito = carrito.filter((item: { id: number }) => item.id !== productoId);
  
    // Actualiza el estado y el localStorage
    setCarrito(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };
  
  const actualizarCantidadCarrito = (productoId: number, cantidad: number) => {
    let nuevoCarrito = [...carrito];

    // Busca si el producto ya existe en el carrito
    const productoIndex = nuevoCarrito.findIndex((item) => item.id === productoId);

    if (productoIndex !== -1) {
      if (cantidad > 0) {
        // Actualiza la cantidad del producto
        nuevoCarrito[productoIndex].cantidad = cantidad;
      } else {
        // Si la cantidad es 0, elimina el producto del carrito
        nuevoCarrito.splice(productoIndex, 1);
      }
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };
  

  return (
    <ClienteContext.Provider
      value={{
        categorias,
        productos,
        fetchProductos,
        agregarAlCarrito,
        quitarDelCarrito,
        carrito,
        vaciarCarrito,
        actualizarCantidadCarrito,
        drawerOpen,
        setDrawerOpen,
        preguntas,
        setPreguntas,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};
