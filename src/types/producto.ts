import { Catalogo } from './Catalogo';
import { Marca } from './Marca';
import { ProductoImagen } from './productoImagen';
import { SubCategoria } from './SubCategoria';

export interface Producto {
  id: number;
  nombre: string;
  subCategoria: SubCategoria;
  marca: Marca;
  catalogo: Catalogo;
  descripcion: string;
  stock: number;
  precioCompra: number;
  precioVenta: number;
  visible: boolean;
  recomendado: boolean;
  imagenes: ProductoImagen[]; // Lista de imágenes asociadas al producto
}
