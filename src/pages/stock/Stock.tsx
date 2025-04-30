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
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                Lista de productos
              </h3>
              {modulo==='admin' && (
              <div className="ml-auto">
                <Link
                title='Registrar Producto'
                  to={`/${modulo}/stock/registrar`}
                  className=" flex items-center justify-between gap-2 bg-primary text-white rounded-lg px-4 py-2 font-medium transition hover:bg-opacity-90"
                >
                  <BsFillBagPlusFill /> Producto
                </Link>
              </div>
              )}
            </div>
            <div className="flex flex-col gap-9 mt-3">
              <CardProducto  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
