import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2'

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

  delete(cliente:Cliente):void{
    swal({
  title: 'Esta seguro?',
  text: `¿Seguro que desea eliminar al cliente ${cliente.nombre}`,
  type: 'warning',
  confirmButtonText: 'Si, eliminar!',
  cancelButtonText: 'No, Cancelar',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33'
}).then((result) => {
  if (result.value) {
    this.clienteService.delete(cliente.id).subscribe(
      response =>{
        // para no mostrar el cliente que acabamos de eliminar
        this.clientes = this.clientes.filter( cli=> cli !== cliente)
        swal(
          'Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        )
      }
    )
  }
})
  }

}
