import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoItemViewComponent } from './pedido-item-view.component';

describe('PedidoItemViewComponent', () => {
  let component: PedidoItemViewComponent;
  let fixture: ComponentFixture<PedidoItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
