import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anyadir-convocatoria',
  templateUrl: './anyadir-convocatoria.component.html',
  styleUrls: ['./anyadir-convocatoria.component.css']
})
export class AnyadirConvocatoriaComponent {

  @Input() etiqueta!: string;
  @Input() obligatorio!: string;
  
  valor! : String;
  isInputInformed: boolean = false;

  constructor(private router : Router) {}

  ngOnInit(): void {
    if (this.obligatorio == 'S') {
      this.etiqueta = "* " + this.etiqueta;
    } 
  }

  onInputBlur() {
    this.isInputInformed = !!this.valor;    
  }


  inicio() {
    console.log("inicio");
    this.router.navigate(['inicio']);
  }

}
