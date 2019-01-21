import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service'
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  titulo: string = "Detalle del cliente";
  private fotoSeleccionada: File;
  // Inyecta el clienteServices (acceso a servicios) y activatedRoute cuando cambia el id (dentro del item de la tabla)
  constructor( private clienteService:ClienteService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Vamos a suscribir cuando cambia el parametro del id.
    this.activatedRoute.paramMap.subscribe( params => {
      let id:number = + params.get('id');
      if(id){
        this.clienteService.getCliente(id).subscribe( cliente => {
          this.cliente = cliente;
        })
      }
    })
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    if(this.fotoSeleccionada.type.indexOf("image") < 0 ){
      swal("Error:", 'Debe seleccionar un archivo de tipo imagen','error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada ){
      swal("Error:", 'Debe seleccionar una foto','error');
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe( cliente => {
        this.cliente = cliente;
        swal('La foto ha subido completamente!',`La foto se ha subido con exito: ${this.cliente.foto} ` ,'success' )
        this.fotoSeleccionada= null;
      });
    }
  }

}
