import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoViewMiniComponent } from './producto-view-mini.component';

describe('ProductoViewMiniComponent', () => {
  let component: ProductoViewMiniComponent;
  let fixture: ComponentFixture<ProductoViewMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoViewMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoViewMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
