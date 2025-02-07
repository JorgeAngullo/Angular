import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

interface Opcion {
  valor: string;
  nombre: string;
}

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})

export class CustomSelectComponent {

  pulsado : boolean = false;

  valor : string = '';

  @Input() opciones : any;
  @Input() titulo! : string;

  data:any[]=[];



  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  check(option:any)
  {
    option.checked=!option.checked;
    this.valor = option.nombre;
    // this.data=this.opciones.filter((x:any)=>x.checked).map(x=>
    //   {
    //     return {id:x.id,label:x.label}
    //   })
    // this.change.emit(this.data);
  }

  toggle() {
    this.pulsado = !this.pulsado;
  }

  ngOnInit(): void {
    // Agrega un event listener al documento para manejar el clic fuera del div
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.pulsado = false; // Asigna false cuando se hace clic fuera del div
      }
    });
  }
}
