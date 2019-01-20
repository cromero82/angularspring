import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import {CLIENTES} from './clientes.json';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
// import {Observable} from ''
import {map, catchError, tap} from 'rxjs/operators'
import swal from 'sweetalert2'
import {Router} from '@angular/router'
import { formatDate /* ,DatePipe */ } from '@angular/common';

@Injectable()
export class ClienteService {
  private urlEndPoint = 'http://localhost:8081/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page:number): Observable<Cliente[]> {
    // return this.http.get<Cliente[]>(this.urlEndPoint); // otra forma de hacer "cast" a traves de Map
    return this.http.get(this.urlEndPoint+'/page/'+ page).pipe(
      // Importante el orden el tab obtiene la lista de elementos
      tap((response:any) => {
        console.log("ClienteService: tap1");
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        })
      }),
      // Importante el orden: el map devuelve un objeto de tipo cliente ( por el return)
      map((response:any) => {
        return (response.content  as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // let datePipe = new DatePipe('en-US')
          // cliente.createAt = datePipe.Transform(cliente.createAt,"dd-MM-yyyy")
          // cliente.createAt = formatDate(cliente.createAt,"EEEE, dd, MMMM yyyy",'es')
          return cliente;
        });
        return response;
      }
      ),
      // .. orden: el response ya es de tipo cliente (por el map anterior)
      tap(response => {
        console.log("ClienteService: tap2");
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        })
      })
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
