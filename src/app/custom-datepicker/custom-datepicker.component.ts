import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.css']
})
export class CustomDatepickerComponent implements OnInit {

  @Input() etiqueta!: string;
  @Input() obligatorio!: string;

  ngOnInit(): void {
    if (this.obligatorio == 'S') {
      this.etiqueta = "* " + this.etiqueta;
    } 
  }

}
