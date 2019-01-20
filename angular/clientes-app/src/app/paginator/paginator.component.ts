import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {
  @Input() paginador: any;
  paginas: number[]
  constructor() { }

  ngOnInit() {
    this.paginas = new Array( this.paginador.totalPages).fill(0).map((_valor, indice)=> {
      return indice + 1;
    })
  }

}
