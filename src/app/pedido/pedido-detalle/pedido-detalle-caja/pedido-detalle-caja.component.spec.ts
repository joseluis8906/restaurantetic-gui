import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetalleCajaComponent } from './pedido-detalle-caja.component';

describe('PedidoDetalleCajaComponent', () => {
  let component: PedidoDetalleCajaComponent;
  let fixture: ComponentFixture<PedidoDetalleCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDetalleCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDetalleCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
