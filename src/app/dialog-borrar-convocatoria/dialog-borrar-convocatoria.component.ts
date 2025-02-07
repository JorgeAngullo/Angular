import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Convocatoria } from '../Modelo/Convocatoria';

@Component({
  selector: 'app-dialog-borrar-convocatoria',
  templateUrl: './dialog-borrar-convocatoria.component.html',
  styleUrls: ['./dialog-borrar-convocatoria.component.css']
})
export class DialogBorrarConvocatoriaComponent implements OnInit {
  
  constructor(public dialogRef : MatDialogRef<DialogBorrarConvocatoriaComponent>, @Inject(MAT_DIALOG_DATA) public data : Convocatoria) {
    
  }
  
  ngOnInit() {
  
  }

  eliminarConvocatoria() {
    this.cancelar();
  }

  cancelar() {
    this.dialogRef.close();
  }

}
