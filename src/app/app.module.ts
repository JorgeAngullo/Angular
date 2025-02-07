import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from './Service/service.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';
import { ConvocatoriasTableComponent } from './convocatorias-table/convocatorias-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConvocatoriaFormularioComponent } from './convocatoria-formulario/convocatoria-formulario.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { DialogBorrarConvocatoriaComponent } from './dialog-borrar-convocatoria/dialog-borrar-convocatoria.component';
import { FilterPipe } from './filter.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AnyadirConvocatoriaComponent } from './anyadir-convocatoria/anyadir-convocatoria.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { BuscadorConvocatoriasComponent } from './buscador-convocatorias/buscador-convocatorias.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomDatepickerComponent } from './custom-datepicker/custom-datepicker.component';
import { CustomInput2Component } from './custom-input2/custom-input2.component';
import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';

const appRoutes : Routes = [
  {path:'', component:LoginComponent},
  {path:'inicio', component: InicioComponent},
  // {path:'buscadorConvocatorias', component:ConvocatoriasTableComponent},
  {path:'buscadorConvocatorias', component:BuscadorConvocatoriasComponent},
  {path:'anyadir', component: AnyadirConvocatoriaComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ConvocatoriasTableComponent,
    ConvocatoriaFormularioComponent,
    DialogBorrarConvocatoriaComponent,
    FilterPipe,
    LoginComponent,
    InicioComponent,
    AnyadirConvocatoriaComponent,
    CustomInputComponent,
    BuscadorConvocatoriasComponent,
    CustomSelectComponent,
    CustomDatepickerComponent,
    CustomInput2Component,
    ConvocatoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    OverlayModule,
    MatSlideToggleModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServiceService, 
    //muestra la fecha del datepicker con el formato de fecha español
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {/*floatLabel: 'always', appearance:'outline'*/}}
  ],
    bootstrap: [AppComponent],
  
})
export class AppModule { }
