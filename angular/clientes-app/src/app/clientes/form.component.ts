import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  regiones: Region[];
  public cliente: Cliente = new Cliente()
  public titulo:string = "Crear cliente"
  errores: String[];

  constructor( private clienteService: ClienteService ,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarCliente()
    this.clienteService.getRegiones().subscribe( regiones => this.regiones = regiones);
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
    // console.log("clicked!")
    // console.log(this.cliente)
    this.clienteService.create(this.cliente).subscribe(
      // Si todo ok
      cliente => {
        this.router.navigate(['/clientes'])
        swal('El cliente ',`${cliente.nombre} ha sido creado con exito`,'success')
      }
      // Si errores
      , err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend' + err.status);
        console.error(err.error.errors);
      }
    )
  }

// respuesta forma 1: con el json devuelto
  update():void{
      this.clienteService.update(this.cliente)
      .subscribe( json => {
        this.router.navigate(['/clientes'])
        swal('Cliente ',`${json.mensaje}: ${json.cliente.nombre}`,'success')
      }
      // Si errores
      , err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend' + err.status);
        console.error(err.error.errors);
      })
  }

  // Permite seleccionar la region del listado (select -> option) basado en: 1. el cliente podria tener una region definida,
  // 2. el metodo trae el listado de todas las regiones
  // este metodo compara ambos objetos.
  compararRegion (o1:Region, o2:Region){
    return o1 === null || o2 == null? false: o1.id === o2.id;
  }
}
