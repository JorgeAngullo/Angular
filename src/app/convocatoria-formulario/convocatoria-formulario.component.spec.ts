import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import { ConvocatoriaFormularioComponent } from './convocatoria-formulario.component';

describe('ConvocatoriaFormularioComponent', () => {
  let component: ConvocatoriaFormularioComponent;
  let fixture: ComponentFixture<ConvocatoriaFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvocatoriaFormularioComponent]
    });
    fixture = TestBed.createComponent(ConvocatoriaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
