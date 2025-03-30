import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { FiltrosBuscador } from '../Modelo/FiltrosBuscador';
import { TipoConvocatoria } from '../Modelo/TipoConvocatoria';

@Component({
  selector: 'app-buscador-convocatorias',
  templateUrl: './buscador-convocatorias.component.html',
  styleUrls: ['./buscador-convocatorias.component.css']
})
export class BuscadorConvocatoriasComponent implements OnInit {
  constructor(private service:ServiceService, private router:Router) {}

  tiposConvocatoria : TipoConvocatoria[] = [];
  valor! : String;

  ngOnInit() {
    this.service.getTiposConvocatoria().subscribe(data => {this.tiposConvocatoria = data; console.table(data)});
  }

  filtrosBuscador : FiltrosBuscador = new FiltrosBuscador();

  opciones = [
    {valor: '1', nombre: 'Uno'},
    {valor: '2', nombre: 'Dos'}
  ]; 

  inicio() {
    console.log("inicio");
    this.router.navigate(['inicio']);
  }

}
