import { FacturaService } from './services/factura.service';
import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html'
})
export class DetalleFacturaComponent implements OnInit {
  factura: Factura
  titulo: string = 'Factura';
  constructor(private facturaServices: FacturaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.facturaServices.getFactura(id).subscribe(factura => {
        this.factura = factura;
      })
    })
  }

}
