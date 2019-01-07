import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[]= [];
  constructor( private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes =clientes

      // clientes => {
      //   this.clientes = clientes
      // }
      // llaves -> mas de una linea de codigo

      // (clientes) =>  ..
      // ..
      // parentesis cuando tiene mas de un argumento

      // function (clientes) {
      //   this.clientes = clientes
      // }
      // no work?
    );
  }

}
