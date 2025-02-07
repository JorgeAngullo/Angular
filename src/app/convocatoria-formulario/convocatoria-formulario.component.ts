import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { TipoConvocatoria } from 'src/app/Modelo/TipoConvocatoria';
import { Convocatoria } from '../Modelo/Convocatoria';
import { Observable } from 'rxjs/internal/Observable';

class FiltrosBuscador {
  tipoExpediente! : string;
  anyoExpediente! : string;
  numeroExpediente! : string;
  tituloConvocatoria! : string;
  tipoConvocatoria! : string;
  subtipoConvocatoria! : string;
  idConvocatoria! : string;
  idConvocatoriaBDNS! : string;
  fechaCreacionDesde! : Date;
  fechaCreacionHasta! : Date;  
}

@Component({
  selector: 'app-convocatoria-formulario',
  templateUrl: './convocatoria-formulario.component.html',
  styleUrls: ['./convocatoria-formulario.component.css']  
})
export class ConvocatoriaFormularioComponent implements OnInit {

  tipoExpediente : string = "";
  anyoExpediente : string = "";
  numeroExpediente : string = "";
  tituloConvocatoria : string = "";
  tipoConvocatoria : string = "";
  subtipoConvocatoria : string = "";
  idConvocatoria : string = "";
  idConvocatoriaBDNS : string = "";
  fechaCreacionDesde! : Date;
  fechaCreacionHasta! : Date;

  filtrosBuscador : FiltrosBuscador = new FiltrosBuscador();
  

  // conv! : Convocatoria;
  convs : Convocatoria[] = [];

  constructor(private service:ServiceService) {
    // this.service.getTiposConvocatoria().subscribe(data => {this.tiposConvocatoria = data;});
  }
  
  tiposConvocatoria! : TipoConvocatoria[];

  ngOnInit() {
    this.service.getConvocatorias().subscribe(data => {this.convs = data;});
    this.service.getTiposConvocatoria().subscribe(data => {this.tiposConvocatoria = data;});
  }

  ngAfterViewInit(): void {
    // alert("ngAfterViewInit");
    // alert("conv form " + this.convs.length);
  }

  obs! : Observable<Convocatoria[]>;

  buscar() {
    // alert("buscar pulsado" + '\n' +
    // 'tipoExpediente: ' + (this.tipoExpediente != '' ? this.tipoExpediente : '') + '\n' +
    // 'anyoExpediente: ' + (this.anyoExpediente != '' ? this.anyoExpediente : '') + '\n' +
    // 'numeroExpediente: ' + (this.numeroExpediente != '' ? this.numeroExpediente : '') + '\n' +
    // 'tituloConvocatoria: ' + (this.tituloConvocatoria != '' ? this.tituloConvocatoria : '') + '\n' +
    // 'tipoConvocatoria: ' + (this.tipoConvocatoria != '' ? this.tipoConvocatoria : '') + '\n' +
    // 'subtipoConvocatoria: ' + (this.subtipoConvocatoria != '' ? this.subtipoConvocatoria : '') + '\n' +
    // 'idConvocatoria: ' + (this.idConvocatoria != '' ? this.idConvocatoria : '') + '\n' +
    // 'idConvocatoriaBDNS: ' + (this.idConvocatoriaBDNS != '' ? this.idConvocatoriaBDNS : '') + '\n' +
    // 'fechaCreacionDesde: ' + (this.fechaCreacionDesde != null ? this.fechaCreacionDesde.getDate() + '\\' + this.fechaCreacionDesde.getMonth() + '\\' + this.fechaCreacionDesde.getFullYear() : '') + '\n' +
    // 'fechaCreacionHasta: ' + (this.fechaCreacionHasta != null ? this.fechaCreacionHasta.getDate() + '\\' + this.fechaCreacionHasta.getMonth() + '\\' + this.fechaCreacionHasta.getFullYear() : '') + '\n'
    // );
    
    // let filtrosBuscador! : filtrosBuscador;

    this.filtrosBuscador.tipoExpediente = this.tipoExpediente;

    let filtro : Map<string, Object> = new Map<string, Object>();
    filtro.set("tipoExpediente", this.tipoExpediente);
    filtro.set("anyoExpediente", this.anyoExpediente);
    // this.obs = this.service.getConvocatoriasByCriteria(filtro);
    this.obs.forEach(element => {
      console.log(element);
    });
    // this.service.getConvocatoriasByCriteria(filtro).subscribe(data => this.convs = data);
    
  }

  limpiarFormulario() {
    this.tipoExpediente = "";
    this.anyoExpediente = "";
    this.numeroExpediente = "";
    this.tituloConvocatoria = "";
    this.tipoConvocatoria = "";
    this.subtipoConvocatoria = "";
    this.idConvocatoria = "";
    this.idConvocatoriaBDNS = "";
    this.fechaCreacionDesde = null as any;
    this.fechaCreacionHasta = null as any;
  }

  tipoConvocatoriaCambiado(value : string) {
    //this.tipoConvocatoria = value;
  }

  subtipoConvocatoriaCambiado(value : string) {
    //this.subtipoConvocatoria = value;
  }
}