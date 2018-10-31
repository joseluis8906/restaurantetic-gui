import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetalleCajaItemComponent } from './pedido-detalle-caja-item.component';

describe('PedidoDetalleCajaItemComponent', () => {
  let component: PedidoDetalleCajaItemComponent;
  let fixture: ComponentFixture<PedidoDetalleCajaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDetalleCajaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDetalleCajaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
