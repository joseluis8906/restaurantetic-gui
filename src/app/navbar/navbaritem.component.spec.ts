import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaritemComponent } from './navbaritem.component';

describe('NavbaritemComponent', () => {
  let component: NavbaritemComponent;
  let fixture: ComponentFixture<NavbaritemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbaritemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbaritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
