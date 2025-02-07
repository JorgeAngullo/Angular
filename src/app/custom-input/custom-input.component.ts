import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {

  @Input() etiqueta!: string;
  @Input() obligatorio!: string;
  
  valor! : String;
  isInputInformed: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.obligatorio == 'S') {
      this.etiqueta = this.etiqueta + " *";
    } 
  }

  onInputBlur() {
    this.isInputInformed = !!this.valor;    
  }

  onInputChange(event: any): void {
    // Convierte el valor del input a mayúsculas
    event.target.value = event.target.value.toUpperCase();
  }
}
