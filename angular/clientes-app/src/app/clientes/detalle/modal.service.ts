import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean= false;
  private _notificarUpload = new EventEmitter<any> ();

  constructor() { }

  // Notificar a los observadores que ha ocurrido un evento
  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }

  abrirModal(){
    this.modal= true;
  }

  cerrarModal(){
    this.modal = false;
  }
}
