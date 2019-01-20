import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {
  @Input() paginador: any;
  paginas: number[];
  desde: number;
  hasta: number;

  constructor() { }

  ngOnInit() {
    this.initPaginator()
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChange) {
    let paginadorActualizado = changes['paginador'];
    if(paginadorActualizado.previousValue){
      this.initPaginator();
    }
  }

  private initPaginator(): void{
    let limite = 3;
    this.desde = Math.min(Math.max(1, this.paginador.number - limite - 1), this.paginador.totalPages - limite);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + limite - 1), limite + 1);
    if (this.paginador.totalPages > limite) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => {
        return indice + this.desde;
      })
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => {
        return indice + 1;
      })
    }
  }

}
