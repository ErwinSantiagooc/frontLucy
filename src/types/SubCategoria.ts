import { Categoria } from "./Categoria";

export interface SubCategoria {
  id?: number;
  nombre: string;
  categoria: Categoria;
}
