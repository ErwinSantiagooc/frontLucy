import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useProductoContext } from '../../Context/ProductoContext';
import { Categoria } from '../../types/Categoria';
import * as Dialog from '@radix-ui/react-dialog';
import { FaEdit } from 'react-icons/fa';
import { SubCategoria } from '../../types/SubCategoria';
import { Marca } from '../../types/Marca';
import { Catalogo } from '../../types/Catalogo';
import Loader from '../../common/Loader';
import { useUserContext } from '../../Context/UserContext';

const BASE_URL = import.meta.env.VITE_URL_BACKEND_LOCAL;


const CategoriasList = () => {
  const token = localStorage.getItem('token');
  const {
    categorias,
    marcas,
    fetchCategoriasYMarcas,
    catalogos,
    fetchCatalogos,
  } = useProductoContext();
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
    null,
  );
  const { modulo } = useUserContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [entityType, setEntityType] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setSelectedCategoria(categorias[0]); // Selecciona la primera categoría por defecto
    }
  }, [categorias]);

  const handleCategoriaClick = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
  };

  const handleEditClick = (
    type: string,
    entity: Categoria | SubCategoria | Marca | Catalogo,
  ) => {
    setEntityType(type);
    setNombre(entity.nombre);
    setCategoriaId(entity.id || null);
    setErrorMsg(''); // Limpiar mensaje de error antes de abrir el modal
    setModalOpen(true);
  };

  const actualizarCategoria = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log(token);
      const formData = new FormData();
      formData.append(
        'categoria',
        new Blob([JSON.stringify({ id: categoriaId, nombre })], {
          type: 'application/json',
        }),
      );
      if (file) {
        formData.append('file', file);
      }
      setLoading(true);
      const response: AxiosResponse<any> = await axios.put(
        `${BASE_URL}detalles/categoria/update`,
        formData,
        { headers },
      );

      if (response.data.success) {
        fetchCategoriasYMarcas(); // Volver a cargar las categorías y marcas
        setModalOpen(false);
      } else {
        setErrorMsg(response.data.msg);
      }
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
      setErrorMsg(
        'Hubo un error al actualizar la categoría. Inténtalo de nuevo.',
      );
    } finally {
      setLoading(false);
    }
  };

  const actualizarSubCategoria = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      setLoading(true);
      const response: AxiosResponse<any> = await axios.put(
        `${BASE_URL}detalles/sub/categoria/update`,
        { id: categoriaId, nombre },
        { headers },
      );

      if (response.data.success) {
        fetchCategoriasYMarcas(); // Volver a cargar las categorías y marcas
        setModalOpen(false);
      } else {
        setErrorMsg(response.data.msg);
      }
    } catch (error) {
      console.error('Error al actualizar la subcategoría:', error);
      setErrorMsg(
        'Hubo un error al actualizar la subcategoría. Inténtalo de nuevo.',
      );
    } finally {
      setLoading(false);
    }
  };

  const actualizarMarca = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      setLoading(true);
      const response: AxiosResponse<any> = await axios.put(
        `${BASE_URL}detalles/marca/update`,
        { id: categoriaId, nombre },
        { headers },
      );

      if (response.data.success) {
        fetchCategoriasYMarcas(); // Volver a cargar las categorías y marcas
        setModalOpen(false);
      } else {
        setErrorMsg(response.data.msg);
      }
    } catch (error) {
      console.error('Error al actualizar la marca:', error);
      setErrorMsg('Hubo un error al actualizar la marca. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };
  const actualizarCatalogo = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      setLoading(true);
      const response: AxiosResponse<any> = await axios.put(
        `${BASE_URL}catalogo/update`,
        { id: categoriaId, nombre },
        { headers },
      );
      if (response.data.success) {
        fetchCatalogos(); // Volver a cargar las categorías y marcas
        setModalOpen(false);
      } else {
        setErrorMsg(response.data.msg);
      }
    } catch (error) {
      console.error('Error al actualizar la catalogo:', error);
      setErrorMsg(
        'Hubo un error al actualizar la catalogo. Inténtalo de nuevo.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGuardarEntidad = (e: React.FormEvent) => {
    e.preventDefault();
    if (entityType === 'categoria') {
      actualizarCategoria();
    } else if (entityType === 'subCategoria') {
      actualizarSubCategoria();
    } else if (entityType === 'marca') {
      actualizarMarca();
    } else if (entityType === 'catalogo') {
      actualizarCatalogo();
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {/* Fila de categorías */}
      {loading && <Loader />}
      <div className="flex flex-nowrap justify-start space-x-4 overflow-x-auto p-4 w-full border-b border-gray-300">
        {categorias?.map((categoria) => (
          <div
            key={categoria.id}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="relative">
              <img
                src={categoria.imagen}
                alt={categoria.nombre}
                className={`w-16 h-16 rounded-full object-cover ${
                  selectedCategoria?.id === categoria.id
                    ? 'border-4 border-blue-500'
                    : ''
                }`}
                onClick={() => handleCategoriaClick(categoria)}
              />
              {modulo === 'admin' && (
                <FaEdit
                  onClick={() => handleEditClick('categoria', categoria)}
                  className="w-5 h-5 absolute top-0 right-0 text-orange-500 hover:text-orange-700  cursor-pointer"
                />
              )}
            </div>
            <p className="text-center mt-2 text-sm font-medium">
              {categoria.nombre}
            </p>
          </div>
        ))}
      </div>

      {/* Fila de tablas para subcategorías y marcas */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-8 mt-4">
        {/* Tabla de subcategorías */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white uppercase">
              Subcategorías de {selectedCategoria?.nombre || ''}
            </h3>
          </div>
          <div className="p-7 max-h-[600px] overflow-y-auto">
            {selectedCategoria && selectedCategoria.subCategorias ? (
              <table className="w-full text-left border-collapse ">
                <thead>
                  <tr>
                    <th className="border-b p-2 dark:border-strokedark">ID</th>
                    <th className="border-b p-2 dark:border-strokedark">
                      Nombre
                    </th>
                    {modulo === 'admin' && (
                      <th className="border-b p-2 dark:border-strokedark">
                        Acciones
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {selectedCategoria.subCategorias.map((subcategoria) => (
                    <tr key={subcategoria.id}>
                      <td className="border-b p-2 dark:border-strokedark">
                        {subcategoria.id}
                      </td>
                      <td className="border-b p-2 dark:border-strokedark">
                        {subcategoria.nombre}
                      </td>
                      {modulo === 'admin' &&(
                         <td className="border-b p-2 dark:border-strokedark">
                         <FaEdit
                           onClick={() =>
                             handleEditClick('subCategoria', subcategoria)
                           }
                           className="w-5 h-5 text-orange-500 hover:text-orange-700  cursor-pointer"
                         />
                       </td>
                      )}
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay subcategorías disponibles.</p>
            )}
          </div>
        </div>

        {/* Tabla de marcas */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white uppercase">
              Marcas
            </h3>
          </div>
          <div className="p-7 max-h-[600px] overflow-y-auto">
            {marcas && marcas.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2 dark:border-strokedark">ID</th>
                    <th className="border-b p-2 dark:border-strokedark">
                      Nombre
                    </th>
                    {modulo==="admin" && (
                      <th className="border-b p-2 dark:border-strokedark">
                      Acciones
                    </th>
                    )}
                    
                  </tr>
                </thead>
                <tbody>
                  {marcas.map((marca) => (
                    <tr key={marca.id}>
                      <td className="border-b p-2 dark:border-strokedark">
                        {marca.id}
                      </td>
                      <td className="border-b p-2 dark:border-strokedark">
                        {marca.nombre}
                      </td>
                      {modulo==="admin" &&(
                        <td className="border-b p-2 dark:border-strokedark">
                        <FaEdit
                          onClick={() => handleEditClick('marca', marca)}
                          className="w-5 h-5 text-orange-500 hover:text-orange-700  cursor-pointer"
                        />
                      </td>
                      )}
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay marcas disponibles.</p>
            )}
          </div>
        </div>
        {/* Tabla de Catalogos */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white uppercase">
              Catalogos
            </h3>
          </div>
          <div className="p-7 max-h-[600px] overflow-y-auto">
            {catalogos && catalogos.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2 dark:border-strokedark">ID</th>
                    <th className="border-b p-2 dark:border-strokedark">
                      Nombre
                    </th>
                    {modulo==="admin" && (
                        <th className="border-b p-2 dark:border-strokedark">
                        Acciones
                      </th>
                    )}
                  
                  </tr>
                </thead>
                <tbody>
                  {catalogos.map((catalogo) => (
                    <tr key={catalogo.id}>
                      <td className="border-b p-2 dark:border-strokedark">
                        {catalogo.id}
                      </td>
                      <td className="border-b p-2 dark:border-strokedark">
                        {catalogo.nombre}
                      </td>
                      {modulo==="admin" && (
                      <td className="border-b p-2 dark:border-strokedark">
                        <FaEdit
                          onClick={() => handleEditClick('catalogo', catalogo)}
                          className="w-5 h-5 text-orange-500 hover:text-orange-700  cursor-pointer"
                        />
                      </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay Catalogos disponibles.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal para editar entidades */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
          <form onSubmit={handleGuardarEntidad}>
            <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
              <div className="bg-white rounded-md shadow-lg px-4 py-6">
                <Dialog.Title className="text-lg font-medium text-gray-800 text-center mb-4 uppercase">
                  {entityType === 'categoria' && 'Editar Categoría'}
                  {entityType === 'subCategoria' && 'Editar SubCategoría'}
                  {entityType === 'marca' && 'Editar Marca'}
                </Dialog.Title>

                {errorMsg && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full rounded border p-2"
                      required
                    />
                  </div>

                  {entityType === 'categoria' && (
                    <div className="mb-4">
                      <label className="mb-3 block text-black">
                        Agregar Imagen
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full rounded-md border border-stroke p-3 outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Dialog.Close asChild>
                    <button className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border">
                      Cancelar
                    </button>
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </Dialog.Content>
          </form>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default CategoriasList;
