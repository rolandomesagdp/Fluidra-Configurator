import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlContainerComponent } from './form-control-container.component';

describe('FormControlContainerComponent', () => {
  let component: FormControlContainerComponent;
  let fixture: ComponentFixture<FormControlContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormControlContainerComponent]
    });
    fixture = TestBed.createComponent(FormControlContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
