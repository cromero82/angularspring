import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import {CLIENTES} from './clientes.json';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
//import {Observable} from ''
import {map, catchError} from 'rxjs/operators'
import swal from 'sweetalert2'
import {Router} from '@angular/router'

@Injectable()
export class ClienteService {
  private urlEndPoint:string = "http://localhost:8081/api/clientes"
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient, private router:Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint); // otra forma de hacer "cast" a traves de Map
    // return this.http.get(this.urlEndPoint).pipe(
    //   map(response => response as Cliente[])
    // );
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }

  getCliente(id): Observable<Cliente>{
    // alt + 96 comilla sencilla izq
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e=> {
        this.router.navigate(['/clientes'])
        swal('Error al editar',e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente:Cliente): Observable<Cliente>{
    //return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
