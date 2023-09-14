import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormGroupComponent } from './address-form-group.component';

describe('AddressFormGroupComponent', () => {
  let component: AddressFormGroupComponent;
  let fixture: ComponentFixture<AddressFormGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressFormGroupComponent]
    });
    fixture = TestBed.createComponent(AddressFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
