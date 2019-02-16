import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(private clienteService: ClienteService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute, private authService:AuthService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      // (+) convierte el string en number
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3 ');
            (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        })
    }
    );

    // Se suscribe al notificador (de modal service) luego de actualizarse la foto. el cliente
    // (dentro del suscribe) ya tiene la foto actuaizada,
    this.modalService.notificarUpload.subscribe( cliente =>{
      // ahora se debe recorrer la lista de clientes y actualizar el cliente que ha cambiado la foto
      this.clientes.map( clienteOriginal => {
        if(cliente.id === clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        // No es necesario (si se quita igual funciona)
        return clienteOriginal;
      })
    })
  }

  delete(cliente: Cliente): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
