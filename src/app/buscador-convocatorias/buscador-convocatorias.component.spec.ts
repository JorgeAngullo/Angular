import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorConvocatoriasComponent } from './buscador-convocatorias.component';

describe('BuscadorConvocatoriasComponent', () => {
  let component: BuscadorConvocatoriasComponent;
  let fixture: ComponentFixture<BuscadorConvocatoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorConvocatoriasComponent]
    });
    fixture = TestBed.createComponent(BuscadorConvocatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
