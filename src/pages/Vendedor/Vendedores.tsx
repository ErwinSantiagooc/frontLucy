import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FaEdit, FaRegPlusSquare } from 'react-icons/fa';
import { useUserContext } from '../../Context/UserContext';
import { useUsuariosContext } from '../../Context/UsuariosContext';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Vendedores: React.FC = () => {
  const { modulo } = useUserContext();
  const { usuarios, fetchUsuarios } = useUsuariosContext();

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return (
    <>
      <Breadcrumb pageName="Vendedores" lastPage="" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center justify-between">
          <h3 className="font-medium text-black dark:text-white">
            Lista de vendedores
          </h3>
          <div className="ml-auto">
            <Link
              to={`/${modulo}/vendedores/registrar`}
              title="Registrar Usuario"
              className="flex items-center justify-between gap-2 bg-primary text-white rounded-lg px-4 py-2 font-medium transition hover:bg-opacity-90"
            >
              <FaRegPlusSquare /> Vendedor
            </Link>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white">
                  ID
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Nombre
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Celular
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Cedula
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Estado
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios?.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="border-b border-stroke dark:border-strokedark"
                >
                   <td className="py-4 px-4 text-black dark:text-white ">
                    {usuario.id}
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white xl:pl-11">
                    {usuario.nombre}
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    {usuario.email}
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    {usuario.celular}
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    {usuario.cedula}
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    {usuario.activo ? 'Activo' : 'Inactivo'}
                  </td>
                  <td>
                    <Link to={"/admin/vendedores/" + usuario.id+"/editar"}>
                    <FaEdit className="w-5 h-5 text-orange-500 hover:text-orange-700  cursor-pointer" />
                 
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Vendedores;
