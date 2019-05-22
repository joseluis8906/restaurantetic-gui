import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoNewEditComponent } from './producto-new-edit.component';

describe('ProductoNewEditDialogComponent', () => {
  let component: ProductoNewEditComponent;
  let fixture: ComponentFixture<ProductoNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoNewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
