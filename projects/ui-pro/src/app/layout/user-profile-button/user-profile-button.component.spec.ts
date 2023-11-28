import { AppModule } from './../../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileButtonComponent } from './user-profile-button.component';
import { UserProfileButtonModule } from './user-profile-button.module';

describe('UserProfileButtonComponent', () => {
	let component: UserProfileButtonComponent;
	let fixture: ComponentFixture<UserProfileButtonComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [UserProfileButtonComponent],
			imports: [AppModule, UserProfileButtonModule],
		});
		fixture = TestBed.createComponent(UserProfileButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
