import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http'
// import {Observable} from ''
import {map, catchError, tap} from 'rxjs/operators'
import swal from 'sweetalert2'
import {Router} from '@angular/router'
import { formatDate /* ,DatePipe */ } from '@angular/common';
import { Region } from './region';

@Injectable()
export class ClienteService {
  private urlEndPoint = 'http://localhost:8081/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  getRegiones(): Observable<Region[]>{
     return this.http.get<Region[]>(this.urlEndPoint +'/regiones')
      // MANEJO DE ERROR
      .pipe(
       catchError (e => {
         this.isNoAutorizado(e);
         return throwError(e);
       })
     );
  }
  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e):boolean{
    if(e.status === 401 || e.status === 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getClientes(page: number): Observable<any> {
  return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
    tap((response: any) => {
      // console.log('ClienteService: tap 1');
      (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
    }),
    map((response: any) => {
      (response.content as Cliente[]).map(cliente => {
        cliente.nombre = cliente.nombre.toUpperCase();
        // let datePipe = new DatePipe('es');
        // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
        // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
        return cliente;
      });
      return response;
    }),
    tap(response => {
      // console.log('ClienteService: tap 2');
      (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
    })
  );
}

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError( e => {

        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

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

        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

        // if (e.status=== 400){
        //   return throwError(e);
        // }
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

        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

        if (e.status === 400 ){
          return throwError(e);
        }

        this.router.navigate(['/clientes'])
        swal('Error al editar ', e.error.mensaje, 'error');
        // retorna el error convertido en un observable
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {

        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

        this.router.navigate(['/clientes'])
        swal('Error al editar', e.error.mensaje, 'error');
        // retorna el error convertido en un observable
        return throwError(e);
      })
    );
  }

  subirFoto(archivo:File, id):Observable<HttpEvent<{}>>{
    // Soporte multiPart: FormData
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    // Utiliza pipe para convertir nuestro observable en tipo <Cliente>
    return this.http.request(req).pipe(
      catchError (e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

}
