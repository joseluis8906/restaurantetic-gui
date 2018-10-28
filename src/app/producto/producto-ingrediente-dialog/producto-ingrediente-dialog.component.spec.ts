import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoIngredienteDialogComponent } from './producto-ingrediente-dialog.component';

describe('ProductoIngredienteDialogComponent', () => {
  let component: ProductoIngredienteDialogComponent;
  let fixture: ComponentFixture<ProductoIngredienteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoIngredienteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoIngredienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
