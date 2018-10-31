import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetalleItemComponent } from './pedido-detalle-item.component';

describe('PedidoDetalleItemComponent', () => {
  let component: PedidoDetalleItemComponent;
  let fixture: ComponentFixture<PedidoDetalleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDetalleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDetalleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
