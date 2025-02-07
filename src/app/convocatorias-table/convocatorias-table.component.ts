import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConvocatoriasTableDataSource } from './convocatorias-table-datasource';
import { Convocatoria } from '../Modelo/Convocatoria';
import { FiltrosBuscador } from '../Modelo/FiltrosBuscador';
import { ServiceService } from '../Service/service.service';
import { Observable, map, startWith } from 'rxjs';
import { TipoConvocatoria } from '../Modelo/TipoConvocatoria';
import { formatDate } from "@angular/common";
import {MatListModule} from '@angular/material/list';
import { EstadoConvocatoria } from '../Modelo/EstadoConvocatoria';
import { OpcionPublicable } from '../Modelo/OpcionesPublicable';
import { UnidadAdministrativa } from '../Modelo/UnidadAdministrativa';
import { FormControl } from '@angular/forms';
import { SubtipoConvocatoria } from '../Modelo/SubtipoConvocatoria';
import { MatDialog } from '@angular/material/dialog';
import { DialogBorrarConvocatoriaComponent } from '../dialog-borrar-convocatoria/dialog-borrar-convocatoria.component';
import { Router } from '@angular/router';



// class FiltrosBuscador {
//   tipoExpediente! : string;
//   anyoExpediente! : string;
//   numeroExpediente! : string;
//   tituloConvocatoria!: string;
//   tipoConvocatoria! : string;
//   subtipoConvocatoria! : string;
//   idConvocatoria! : string;
//   idConvocatoriaBDNS! : string;
//   fechaCreacionDesde! : Date;
//   fechaCreacionHasta! : Date;  
// }


@Component({
  selector: 'app-convocatorias-table',
  templateUrl: './convocatorias-table.component.html',
  styleUrls: ['./convocatorias-table.component.css']
})
export class ConvocatoriasTableComponent implements /*AfterViewInit,*/ OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<ConvocatoriasTableItem>;
  @ViewChild(MatTable) table!: MatTable<Convocatoria>;
  // service! : ServiceService;
  dataSource = new MatTableDataSource<Convocatoria>();
  // emptyData = new MatTableDataSource<Convocatoria>([]);
  
  filasSeleccionadas : Convocatoria[] = [];
  
  tiposConvocatoria! : TipoConvocatoria[];
  subtiposConvocatoria! : SubtipoConvocatoria[];
  
  filtrosBuscador : FiltrosBuscador = new FiltrosBuscador();
  
  clickedRows = new Set<Convocatoria>();
  estadosConvocatoria! : EstadoConvocatoria[];
  // opcionPublicable : OpcionPublicable = new OpcionPublicable();
  // opcionesPublicable! : OpcionPublicable[];
  myControl = new FormControl('');
  unidadesAdministrativas!: UnidadAdministrativa[];
  unidadesAdministrativasSeleccionadas = this.unidadesAdministrativas;
  obsUnidadesAdministrativas!: Observable<UnidadAdministrativa[]>;
  
  // unidadAdministrativaSelect : string | undefined;
  unidadAdministrativaSelect : UnidadAdministrativa = new UnidadAdministrativa();
  
  searchText! : string;
  
  opcionesPublicable = [
    {valor : "S" , descripcion : "Sí"},
    {valor : "N" , descripcion : "No"}
  ];
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [/*'Fila', */'Id', 'Expediente', 'Título', 'Tipo', 'Subtipo', 'Publicable', 'FechaCreacion', 'Estado', 'Acciones'];
  
  
  ngAfterViewInit(): void {
    //   // console.log(this.service == null ? 'service null' : 'service no null');
    //   this.dataSource.sort = this.sort;
    console.log("ngAfterViewInit");
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.service.getUnidadesAdministrativas().subscribe((unidadesAdministrativas : UnidadAdministrativa[]) => this.unidadesAdministrativas = unidadesAdministrativas);
    // this.unidadAdministrativaSelect = new UnidadAdministrativa('00801', 'Informática');
  }
  
  constructor(private service : ServiceService, public dialog: MatDialog, private router : Router) {
  }
  
  ngOnInit(): void {
    this.service.getTiposConvocatoria().subscribe((tiposConv : TipoConvocatoria[]) => this.tiposConvocatoria = tiposConv);
    this.service.getEstadosConvocatoria().subscribe((estadosConv : EstadoConvocatoria[]) => this.estadosConvocatoria = estadosConv);
    console.log("ngOnInit");
    this.buscar();
    
    // unidadAdministrativaSelect
    
  }
  
  findUnidadAdministrativa() {
    // this.unidadAdministrativaSelect.uadIde = '';
    // this.unidadAdministrativaSelect.uadDes = '';
    
    // this.filtrosBuscador.unidadAdministrativa = this.unidadAdministrativaSelect.uadIde;
    
    this.unidadesAdministrativas.forEach(unidad => {
      if (unidad.uadIde === this.filtrosBuscador.unidadAdministrativa) {
        this.unidadAdministrativaSelect = unidad;
          }
        });
    console.log("findUnidadAdministrativa: " + this.unidadAdministrativaSelect.uadIde + " - " + this.unidadAdministrativaSelect.uadDes);
  }
  
  search(value: string) {
    let filter = value.toLowerCase();
    return this.unidadesAdministrativas.filter((option) =>
    option.uadIde.toLowerCase().startsWith(filter)
    );
  }
  
  onKey(eventTarget: any) {
    this.unidadesAdministrativasSeleccionadas = this.search(eventTarget.value);
  }
  
  tipoConvocatoriaCambiado(value : string) {
    //this.tipoConvocatoria = value;
    if (this.filtrosBuscador.tipoConvocatoria) {
      this.service.getSubtiposConvocatoria(this.filtrosBuscador.tipoConvocatoria).subscribe((subtiposConvocatoria : SubtipoConvocatoria[]) => this.subtiposConvocatoria = subtiposConvocatoria);
    }
  }
  
  subtipoConvocatoriaCambiado(value : string) {
    //this.subtipoConvocatoria = value;
  }
  
  buscar() {
    console.log("buscar");
    if (this.filtroBusquedaVacio()) {
      this.service.getConvocatorias().subscribe((data : Convocatoria[]) => this.dataSource.data = data);
    } else {
      this.service.getConvocatoriasByCriteria(this.filtrosBuscador).subscribe((data : Convocatoria[]) => this.dataSource.data = data);
    }
    console.table(this.filtrosBuscador);
    
    console.table(this.obsUnidadesAdministrativas);
    console.table(this.unidadesAdministrativas);
  }
  
  filtroBusquedaVacio() : boolean {
    return  this.filtrosBuscador.anyoExpediente == undefined &&
    this.filtrosBuscador.fechaCreacionDesde == undefined &&
    this.filtrosBuscador.fechaCreacionHasta == undefined &&
    this.filtrosBuscador.fechaModificacionDesde == undefined &&
    this.filtrosBuscador.fechaModificacionHasta == undefined &&
    this.filtrosBuscador.idConvocatoria == undefined &&
    this.filtrosBuscador.idConvocatoriaBDNS == undefined &&
    this.filtrosBuscador.numeroExpediente == undefined &&
    this.filtrosBuscador.subtipoConvocatoria == undefined &&
    this.filtrosBuscador.unidadAdministrativa == undefined &&
    this.filtrosBuscador.publicable == undefined &&
    this.filtrosBuscador.estadoConvocatoria == undefined &&
    this.filtrosBuscador.tipoConvocatoria == undefined &&
    this.filtrosBuscador.tipoExpediente == undefined &&
    this.filtrosBuscador.tituloConvocatoria == undefined
    ;
  }
  
  limpiarFormulario() {
    this.filtrosBuscador.tipoExpediente = undefined;
    this.filtrosBuscador.anyoExpediente = undefined;
    this.filtrosBuscador.numeroExpediente  = undefined;
    this.filtrosBuscador.tituloConvocatoria  = undefined;
    this.filtrosBuscador.tipoConvocatoria  = undefined;
    this.filtrosBuscador.subtipoConvocatoria = undefined;
    this.filtrosBuscador.unidadAdministrativa = undefined;
    this.filtrosBuscador.estadoConvocatoria = undefined;
    this.filtrosBuscador.publicable = undefined;
    this.filtrosBuscador.idConvocatoria = undefined;
    this.filtrosBuscador.idConvocatoriaBDNS = undefined;
    this.filtrosBuscador.fechaCreacionDesde = undefined;
    this.filtrosBuscador.fechaCreacionHasta = undefined;
    this.filtrosBuscador.fechaModificacionDesde = undefined;
    this.filtrosBuscador.fechaModificacionHasta = undefined;
    
    this.subtiposConvocatoria = [];
    
    console.table(Object.keys(this.filtrosBuscador));
    console.table(Object.entries(this.filtrosBuscador));
    
    console.log(Object.keys(this.filtrosBuscador).at(0));
    
    // this.filtrosBuscador = new FiltrosBuscador();
    
    console.log("limpiarFormulario");
    this.buscar();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = 0;
    }
  }
  
  descripcionTipoConvocatoria(tipoConvocatoria : string) : string {
    let descripcion : string = "";
    
    switch (tipoConvocatoria) {
      case "CC": return "Concurrencia competitiva";
      case "CD": return "Convocatoria directa";
      case "NO": return "Convocatoria nominativa";
    }

    return "";
  }
  
  abrirDialogo(convocatoriaEliminar : Convocatoria) {
    const dialogo1 = this.dialog.open(DialogBorrarConvocatoriaComponent, {
      data: convocatoriaEliminar
    });
    
    dialogo1.afterClosed().subscribe(art => {
      // if (art != undefined)
      //   this.agregar(art);
    });
  }
  
  clearFechaCreacionDesde(event : Event) {
    event.stopPropagation();
    this.filtrosBuscador.fechaCreacionDesde = undefined;
  }
  
  numberOnly(event : any): boolean {
    const charCode = event.keyCode;
    console.log(charCode);
    if (Number.parseInt(charCode) > 31 && (Number.parseInt(charCode) < 48 || Number.parseInt(charCode) > 57)) {
      return false;
    }
    return true;
    
  }
  
  inicio() {
    console.log("inicio");
    this.router.navigate(['inicio']);
  }

  anyadir() {
    this.router.navigate(['anyadir']);
  }
  
}