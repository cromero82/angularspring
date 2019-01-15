import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente()
  private titulo:string = "Crear cliente"

  constructor( private clienteService: ClienteService ,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
            (cliente)=> this.cliente = cliente
        )
      }
    }

    )
  }

// Respuesta forma 2: mapeado con cliente (desde el services angualr)
  create():void{
    console.log("clicked!")
    console.log(this.cliente)
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal('El cliente ',`${cliente.nombre} ha sido creado con exito`,'success')
      }
    )
  }

// respuesta forma 1: con el json devuelto
  update():void{
      this.clienteService.update(this.cliente)
      .subscribe( json => {
        this.router.navigate(['/clientes'])
        swal('Cliente ',`${json.mensaje}: ${json.cliente.nombre}`,'success')
      })
  }

  // delete(cliente: Cliente):void{
  //
  // }
}
