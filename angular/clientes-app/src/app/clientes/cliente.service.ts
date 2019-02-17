import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http'
import {map, catchError, tap} from 'rxjs/operators'
import {Router} from '@angular/router'
import { Region } from './region';

@Injectable()
export class ClienteService {
  private urlEndPoint = 'http://localhost:8081/api/clientes'
  constructor(private http: HttpClient, private router: Router) { }

  getRegiones(): Observable<Region[]>{
     return this.http.get<Region[]>(this.urlEndPoint +'/regiones');
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
    return this.http.post<Cliente>(this.urlEndPoint, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError( e => {

        if (e.status=== 400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        // retorna el error convertido en un observable
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    // alt + 96 comilla sencilla izq
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        // pero si no esta logueado (401), solo redigira si es distinto de autorizado.
        if(e.status !== 401 && e.error.mensaje){
          this.router.navigate(['/clientes'])
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

//
  update(cliente: Cliente): Observable<any> {
    // return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError( e => {

        if (e.status === 400 ){
          return throwError(e);
        }
        this.router.navigate(['/clientes'])
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        // retorna el error convertido en un observable
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {

        this.router.navigate(['/clientes'])
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
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
    return this.http.request(req);
  }

}
