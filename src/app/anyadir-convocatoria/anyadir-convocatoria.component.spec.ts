import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyadirConvocatoriaComponent } from './anyadir-convocatoria.component';

describe('AnyadirConvocatoriaComponent', () => {
  let component: AnyadirConvocatoriaComponent;
  let fixture: ComponentFixture<AnyadirConvocatoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnyadirConvocatoriaComponent]
    });
    fixture = TestBed.createComponent(AnyadirConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
