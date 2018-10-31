import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetalleTotalesComponent } from './pedido-detalle-totales.component';

describe('PedidoDetalleTotalesComponent', () => {
  let component: PedidoDetalleTotalesComponent;
  let fixture: ComponentFixture<PedidoDetalleTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDetalleTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDetalleTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
