import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoViewComponent } from './pedido-view.component';

describe('PedidoViewComponent', () => {
  let component: PedidoViewComponent;
  let fixture: ComponentFixture<PedidoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
