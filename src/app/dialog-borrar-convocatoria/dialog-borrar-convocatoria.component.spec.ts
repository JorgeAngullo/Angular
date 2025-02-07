import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrarConvocatoriaComponent } from './dialog-borrar-convocatoria.component';

describe('DialogBorrarConvocatoriaComponent', () => {
  let component: DialogBorrarConvocatoriaComponent;
  let fixture: ComponentFixture<DialogBorrarConvocatoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBorrarConvocatoriaComponent]
    });
    fixture = TestBed.createComponent(DialogBorrarConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
