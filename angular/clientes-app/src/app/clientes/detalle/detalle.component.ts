import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service'
import { ModalService } from './modal.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from '../../usuarios/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html'
})

export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  private fotoSeleccionada: File;
  private progreso: Number;

  // Inyecta el clienteServices (acceso a servicios) y activatedRoute cuando cambia el id (dentro del item de la tabla)
  constructor( private clienteService:ClienteService,
    private modalService:ModalService,
    private activatedRoute: ActivatedRoute, private authService:AuthService) { }

  ngOnInit() { }

  seleccionarFoto(event){
    this.progreso = 0;
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
      .subscribe( event => {
        if( event.type === HttpEventType.UploadProgress ){
          this.progreso = Math.round( (event.loaded/ event.total)*100)
        }else if(event.type === HttpEventType.Response ){
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;
          // Emite el evento usando el emitidor para que quienes esten suscritos reciban (invoquen) el evento
          this.modalService.notificarUpload.emit(this.cliente);

          swal('La foto ha subido completamente!',`La foto se ha subido con exito: ${this.cliente.foto} ` ,'success' )
          this.fotoSeleccionada= null;
        }
      });
    }
  }

  cerrarModal(){
    this.fotoSeleccionada= null;
    this.progreso= 0;
    this.modalService.cerrarModal();
  }

}
