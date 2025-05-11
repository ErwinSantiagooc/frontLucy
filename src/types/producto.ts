import { SubCategoria } from "./SubCategoria";


export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  genero: string;
  activo: boolean;
  fechaCreacion: number[];
  imagenes: Imagen[];
  subCategoria: SubCategoria;
  }

