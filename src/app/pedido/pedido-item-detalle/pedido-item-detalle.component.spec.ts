import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoItemDetalleComponent } from './pedido-item-detalle.component';

describe('PedidoItemDetalleComponent', () => {
  let component: PedidoItemDetalleComponent;
  let fixture: ComponentFixture<PedidoItemDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoItemDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoItemDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
