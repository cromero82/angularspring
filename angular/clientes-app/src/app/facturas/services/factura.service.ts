import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private urlEndPpoint: string = 'http://localhost:8081/api/facturas';

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPpoint}/${id}`);
  }

  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPpoint}/${id}`);
  }
}
