import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetalleMesaComponent } from './pedido-detalle-mesa.component';

describe('PedidoDetalleMesaComponent', () => {
  let component: PedidoDetalleMesaComponent;
  let fixture: ComponentFixture<PedidoDetalleMesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDetalleMesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDetalleMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
