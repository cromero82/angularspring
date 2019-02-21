import { FacturaService } from './services/factura.service';
import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute } from '@angular/router';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, flatMap } from 'rxjs/operators';
import { Producto } from './models/producto';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {
  titulo: string = 'Nueva factura';
  factura: Factura = new Factura();

  constructor(private clienteService: ClienteService,
    private facturaService: FacturaService,
    private activatedRoute: ActivatedRoute) { }

  autocompleteControl = new FormControl();
  productos: string[] = ['One', 'Two', 'Three'];
  productosFiltrados: Observable<Producto[]>;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    })

    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        // convirtiendo a un valor de tipo string
        map( value => typeof value === 'string'?value: value.nombre),
        // Aplanar los datos de un observable dentro de otro observable
        flatMap(value => value ?  this._filter(value):[])
      );

  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarProductos(filterValue);
  }

  // ?: opcional (puede tener parametro producto o null) y puede retornar string o indefinido
  // ? (si existe)
  mostrarNombre(producto?:Producto):string | undefined{
    return producto? producto.nombre: undefined;
  }

}
