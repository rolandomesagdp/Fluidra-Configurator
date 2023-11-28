import { HarnessLoader } from '@angular/cdk/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconHarness } from '@angular/material/icon/testing';

import { MessageComponent } from './message.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('MessageComponent', () => {
	let component: MessageComponent;
	let fixture: ComponentFixture<MessageComponent>;
	let loader: HarnessLoader;
	let icon: MatIconHarness;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [MessageComponent],
			imports: [MatIconModule, TranslateModule.forRoot()],
		});
		fixture = TestBed.createComponent(MessageComponent);
		component = fixture.componentInstance;

		loader = TestbedHarnessEnvironment.loader(fixture);
		icon = await loader.getHarness(MatIconHarness);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show the correct icon', async () => {
		const iconName = 'error';
		component.icon = iconName;
		fixture.detectChanges();
		const iconElement = await icon.getName();
		expect(iconElement).toBe(iconName);
	});

	it('should show the messageTitle when it is set', () => {
		const messageTitle = 'test';
		component.messageTitle = messageTitle;
		fixture.detectChanges();
		const messageTitleElement = fixture.debugElement.query(By.css('h3'));
		expect(messageTitleElement.nativeElement.textContent).toContain(
			messageTitle
		);
	});

	it('should show the description when it is set', () => {
		const description = 'test';
		component.description = description;
		fixture.detectChanges();
		const descriptionElement = fixture.debugElement.query(By.css('p'));
		expect(descriptionElement.nativeElement.textContent).toContain(description);
	});

	it('should not be shown after the close button is clicked', () => {
		const closeButton = fixture.nativeElement.querySelector('.icon_close');
		closeButton.click();
		fixture.detectChanges();
		const messageElement =
			fixture.nativeElement.querySelector('.message_container');
		expect(messageElement).toBeFalsy();
	});
});
