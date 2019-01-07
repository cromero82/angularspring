import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import {CLIENTES} from './clientes.json';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
//import {Observable} from ''

@Injectable()
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
