import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetalleItemsComponent } from './pedido-detalle-items.component';

describe('PedidoDetalleItemsComponent', () => {
  let component: PedidoDetalleItemsComponent;
  let fixture: ComponentFixture<PedidoDetalleItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDetalleItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDetalleItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
