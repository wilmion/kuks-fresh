import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('puntutacion de Estrellas', () => {

    const deniminador = 10 * 5 + 15*4 + 12*3 + 20*3 + 11 * 2 + 5*1;
    const totalPuntuaciones = 10+15+12+20+11+5;
    
    const puntuation = deniminador/totalPuntuaciones;

    expect(puntuation).toBeLessThanOrEqual(5);
    expect(puntuation).toBeGreaterThanOrEqual(0);
  });
});
