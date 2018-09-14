import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductotableComponent } from './productotable.component';

describe('ProductotableComponent', () => {
  let component: ProductotableComponent;
  let fixture: ComponentFixture<ProductotableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductotableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
