import { useProductoContext } from '../../../Context/ProductoContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaInfoCircle, FaEdit } from 'react-icons/fa';
import { useUserContext } from '../../../Context/UserContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CardProducto = () => {
  const { productos, catalogos, categorias, marcas } = useProductoContext();
  const { modulo } = useUserContext();
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedSubCategoria, setSelectedSubCategoria] = useState('');
  const [selectedCatalogo, setSelectedCatalogo] = useState('');
  const [selectedMarca, setSelectedMarca] = useState('');

  const filteredProductos = (productos || []).filter((producto) => {
    return (
      (selectedCategoria === '' ||
        producto.subCategoria.categoria.id === parseInt(selectedCategoria)) &&
      (selectedSubCategoria === '' ||
        producto.subCategoria.id === parseInt(selectedSubCategoria)) &&
      (selectedCatalogo === '' ||
        producto.catalogo.id === parseInt(selectedCatalogo)) &&
      (selectedMarca === '' || producto.marca.id === parseInt(selectedMarca))
    );
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-4 ml-4">
        <select
          value={selectedCategoria}
          onChange={(e) => {
            setSelectedCategoria(e.target.value);
            setSelectedSubCategoria(''); // Reset sub-category when category changes
          }}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">Todas las Categorías</option>
          {categorias?.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        <select
          value={selectedSubCategoria}
          onChange={(e) => setSelectedSubCategoria(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
          disabled={!selectedCategoria}
        >
          <option value="">Todas las Subcategorías</option>
          {selectedCategoria &&
            categorias
              ?.find(
                (categoria) => categoria.id === parseInt(selectedCategoria),
              )
              ?.subCategorias?.map((subCategoria) => (
                <option key={subCategoria.id} value={subCategoria.id}>
                  {subCategoria.nombre}
                </option>
              ))}
        </select>

        <select
          value={selectedCatalogo}
          onChange={(e) => setSelectedCatalogo(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">Todos los Catálogos</option>
          {catalogos?.map((catalogo) => (
            <option key={catalogo.id} value={catalogo.id}>
              {catalogo.nombre}
            </option>
          ))}
        </select>

        <select
          value={selectedMarca}
          onChange={(e) => setSelectedMarca(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">Todas las Marcas</option>
          {marcas?.map((marca) => (
            <option key={marca.id} value={marca.id}>
              {marca.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:flex-wrap gap-3 p-4">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4  shadow-md"
            >
              <div className="flex justify-end items-center ">
                <Link
                  to={`/${modulo}/stock/${item.id}/informacion`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaInfoCircle size={20} />
                </Link>
                {modulo === 'admin' && (
                  <Link
                    to={`/${modulo}/stock/${item.id}/editar`}
                    className="text-orange-500 hover:text-orange-700 ml-4"
                  >
                    <FaEdit size={20} />
                  </Link>
                )}
              </div>
              <Carousel showThumbs={false} infiniteLoop className="w-full h-36">
                {item.imagenes.map((imagen, idx) => (
                  <div key={idx}>
                    <img
                      src={imagen.imagen}
                      alt={`${item.nombre} - ${idx + 1}`}
                      className="w-full h-36 object-cover rounded-md"
                    />
                  </div>
                ))}
              </Carousel>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  {item.nombre.length > 15
                    ? item.nombre.slice(0, 15) + '...'
                    : item.nombre}
                </h3>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Marca:</p>
                  <p className="text-sm text-gray-600">{item.marca.nombre}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Stock:</p>
                  <strong className="text-sm text-gray-600">
                    {item.stock}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Precio de compra:</p>
                  <p className="text-sm text-gray-600">${item.precioCompra}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Precio de venta:</p>
                  <p className="text-sm text-gray-600">${item.precioVenta}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Visible:</p>
                  <p className="text-sm text-gray-600">
                    {item.visible ? 'Sí' : 'No'}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Recomendado:</p>
                  <p className="text-sm text-gray-600">
                    {item.recomendado ? 'Sí' : 'No'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default CardProducto;
