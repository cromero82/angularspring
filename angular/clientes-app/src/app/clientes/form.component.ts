import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente()
  private titulo:string ="Crear cliente"
  constructor() { }

  ngOnInit() {
  }

  create():void{
    console.log("clicked!")
    console.log(this.cliente)

  }

}
