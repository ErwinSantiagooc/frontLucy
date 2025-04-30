import React from "react";
import { useClienteContext } from "../../../../Context/ClienteContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Categorias: React.FC = () => {
  const { categorias } = useClienteContext();

  return (
    <div className="container mx-auto px-4 py-12" id="categorias">
      <h2 className="mb-8 text-center text-3xl font-bold uppercase dark:text-white">Categorías</h2>
      <div className="flex justify-center">
        <div className="grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mx-auto">
          {categorias?.map((categoria, index) => (
            <motion.div
              key={categoria.id}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
             <Link to={`/cliente/productos/?${categoria.nombre}`}>
             <img
                src={categoria.imagen}
                alt={categoria.nombre}
                className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <h3 className="text-center text-xl font-bold text-white underline">
                  {categoria.nombre}
                </h3>
              </div>
             </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorias;
