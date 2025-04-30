import React, { useMemo } from "react";
import { Producto } from "../../../../types/producto";

interface ProductoFactura {
  id: number;
  nombre: string;
  cantidad: number;
  producto:Producto
}

interface Factura {
  productos: ProductoFactura[];
}

interface TopProductosProps {
  facturas: Factura[];
}

const TopProductos: React.FC<TopProductosProps> = ({ facturas }) => {
  // Calcular productos más vendidos
  const productSales = useMemo(() => {
    const sales: Record<string, number> = {};

    facturas.forEach((factura) => {
      factura.productos.forEach((producto) => {
        const productName = producto.producto.nombre;
        const cantidad = producto.cantidad;

        if (sales[productName]) {
          sales[productName] += cantidad;
        } else {
          sales[productName] = cantidad;
        }
      });
    });

    return Object.entries(sales)
      .map(([name, cantidad]) => ({ name, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad); // Orden de mayor a menor
  }, [facturas]);

  return (
    <div className="p-4 bg-white mb-3 dark:bg-boxdark">
      <h2 className="text-xl font-bold text-black mb-4">Productos Más Vendidos</h2>

      {/* Tabla de productos más vendidos */}
      <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300  shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cantidad Vendida
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {productSales.map((product) => (
            <tr key={product.name}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                {product.cantidad}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductos;
