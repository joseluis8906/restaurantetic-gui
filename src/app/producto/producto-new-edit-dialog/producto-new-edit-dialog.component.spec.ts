import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoNewEditDialogComponent } from './producto-new-edit-dialog.component';

describe('ProductoNewEditDialogComponent', () => {
  let component: ProductoNewEditDialogComponent;
  let fixture: ComponentFixture<ProductoNewEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoNewEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoNewEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
