import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestFormComponent } from './user-request-form.component';

describe('UserFormComponent', () => {
  let component: UserRequestFormComponent;
  let fixture: ComponentFixture<UserRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRequestFormComponent]
    });
    fixture = TestBed.createComponent(UserRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
