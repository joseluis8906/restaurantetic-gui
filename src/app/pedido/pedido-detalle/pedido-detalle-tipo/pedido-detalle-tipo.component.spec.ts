import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetalleTipoComponent } from './pedido-detalle-tipo.component';

describe('PedidoDetalleTipoComponent', () => {
  let component: PedidoDetalleTipoComponent;
  let fixture: ComponentFixture<PedidoDetalleTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDetalleTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDetalleTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
