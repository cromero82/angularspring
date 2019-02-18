import { Region } from './region';
import { Factura } from '../facturas/models/factura';

export class Cliente{
  id:number;
  apellido:string;
  nombre: string;
  createAt: string;
  email:string;
  foto:string;
  region:Region;
  facturas: Array<Factura> = [];
}
