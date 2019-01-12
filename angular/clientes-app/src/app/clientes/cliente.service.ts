import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import {CLIENTES} from './clientes.json';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import {HttpClient} from '@angular/common/http'
//import {Observable} from ''
import {map} from 'rxjs/operators'

@Injectable()
export class ClienteService {
private urlEndPoint:string = "http://localhost:8081/api/clientes"
  constructor(private http:HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint); // otra forma de hacer "cast" a traves de Map
    // return this.http.get(this.urlEndPoint).pipe(
    //   map(response => response as Cliente[])
    // );
  }
}
