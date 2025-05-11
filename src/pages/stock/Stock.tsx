import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { BsFillBagPlusFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import CardProducto from './producto/CardProducto';
const Stock: React.FC = () => {
  const { modulo } = useUserContext();
  return (
    <>
      <Breadcrumb pageName="Stock" lastPage='' />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* Contenedor principal */}
          <div className="rounded-lg border border-blue-100 bg-white shadow-sm dark:border-blue-900 dark:bg-blue-950">
            {/* Header */}
            <div className="border-b border-blue-100 py-4 px-6.5 dark:border-blue-800 flex items-center justify-between">
              <h3 className="font-medium text-blue-900 dark:text-blue-50 text-lg">
                Lista de productos
              </h3>
              {modulo === 'admin' && (
                <div className="ml-auto">
                  <Link
                    title='Registrar Producto'
                    to={`/${modulo}/stock/registrar`}
                    className="flex items-center justify-between gap-2 bg-blue-900 text-white rounded-lg px-4 py-2 font-medium transition hover:bg-blue-800 hover:shadow-md"
                  >
                    <BsFillBagPlusFill className="text-coral-300" />
                    <span>Nuevo Producto</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="p-6">
              <CardProducto />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
