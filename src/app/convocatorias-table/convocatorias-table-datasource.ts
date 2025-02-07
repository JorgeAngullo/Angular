import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Convocatoria } from '../Modelo/Convocatoria';
import { ServiceService } from '../Service/service.service';
import { Inject, Injectable, Input } from '@angular/core';

// TODO: Replace this with your own data model type
interface ConvocatoriasTableItem {
  Id : number;
  Título : string;
  Tipo : string;
  Subtipo : string;
  Publicable : string;
  FechaCreacion : Date;
  AnyoExpediente : string;
}

//let convocatorias! : Convocatoria[];

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: ConvocatoriasTableItem[] = [
//   {Id: 1,  Título: 'Hydrogen', Tipo: 'CD', Subtipo: 'GE'}
//   // {Id: 2,  Título: 'Helium'},
//   // {Id: 3,  Título: 'Lithium'},
//   // {Id: 4,  Título: 'Beryllium'},
//   // {Id: 5,  Título: 'Boron'},
//   // {Id: 6,  Título: 'Carbon'},
//   // {Id: 7,  Título: 'Nitrogen'},
//   // {Id: 8,  Título: 'Oxygen'},
//   // {Id: 9,  Título: 'Fluorine'},
//   // {Id: 10, Título: 'Neon'},
//   // {Id: 11, Título: 'Sodium'},
//   // {Id: 12, Título: 'Magnesium'},
//   // {Id: 13, Título: 'Aluminum'},
//   // {Id: 14, Título: 'Silicon'},
//   // {Id: 15, Título: 'Phosphorus'},
//   // {Id: 16, Título: 'Sulfur'},
//   // {Id: 17, Título: 'Chlorine'},
//   // {Id: 18, Título: 'Argon'},
//   // {Id: 19, Título: 'Potassium'},
//   // {Id: 20, Título: 'Calcium'},
// ];

/**
 * Data source for the ConvocatoriasTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
// export class ConvocatoriasTableDataSource extends DataSource<ConvocatoriasTableItem> {
  //@Injectable()
export class ConvocatoriasTableDataSource extends DataSource<Convocatoria>{
[x: string]: any;
  // data: ConvocatoriasTableItem[] = EXAMPLE_DATA;
  // conv: Convocatoria = new Convocatoria();
  convocatorias : Convocatoria[] = [];
  
  data : Convocatoria[] = [];
  // data! : ConvocatoriasTableItem[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  
  // service! : ServiceService
  // constructor(private service : ServiceService/*, private variasconvs : Convocatoria[]*/) {
  constructor(private variasconvs : Convocatoria[]) {
    super();
    this.data = this.variasconvs;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  // connect(): Observable<ConvocatoriasTableItem[]> {
  connect(): Observable<Convocatoria[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(data: ConvocatoriasTableItem[]): ConvocatoriasTableItem[] {
  private getPagedData(data: Convocatoria[]): Convocatoria[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getSortedData(data: ConvocatoriasTableItem[]): ConvocatoriasTableItem[] {
  private getSortedData(data: Convocatoria[]): Convocatoria[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'Id': return compare(a.conIde, b.conIde, isAsc);
        case 'Título': return compare(+a.conTitulo, +b.conTitulo, isAsc);
        case 'Tipo': return compare(+a.conTipo, +b.conTipo, isAsc);
        case 'Subtipo': return compare(+a.conSubtipo, +b.conSubtipo, isAsc);
        case 'Publicable': return compare(+a.conPublicable, +b.conPublicable, isAsc);
        case 'FechaCreacion': return compare(+a.conFechaCreacion, +b.conFechaCreacion, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

