import { Injectable } from '@angular/core';
import {formatDate, /* DatePipe */} from '@angular/common'
import { Cliente} from './cliente';
import {CLIENTES} from './clientes.json';
import { Observable, of, throwError, from } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
// import {Observable} from ''
import {map, catchError} from 'rxjs/operators'
import swal from 'sweetalert2'
import {Router} from '@angular/router'

@Injectable()
export class ClienteService {
  private urlEndPoint = 'http://localhost:8081/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    // return this.http.get<Cliente[]>(this.urlEndPoint); // otra forma de hacer "cast" a traves de Map
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // let datePipe = new DatePipe('en-US')
          // cliente.createAt = datePipe.Transform(cliente.createAt,"dd-MM-yyyy")
          cliente.createAt = formatDate(cliente.createAt,"dd-MM-yyyy",'en-US')
          return cliente;
        });
      }
      )
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError( e => {

        if (e.status=== 400){
          return throwError(e);
        }
        swal(e.error.error, e.error.mensaje, 'error');
        // retorna el error convertido en un observable
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    // alt + 96 comilla sencilla izq
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        if (e.status=== 400){
          return throwError(e);
        }
        this.router.navigate(['/clientes'])
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

//
  update(cliente: Cliente): Observable<any> {
    // return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        this.router.navigate(['/clientes'])
        swal('Error al editar', e.error.mensaje, 'error');
        // retorna el error convertido en un observable
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        this.router.navigate(['/clientes'])
        swal('Error al editar', e.error.mensaje, 'error');
        // retorna el error convertido en un observable
        return throwError(e);
      })
    );
  }

}
