import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';

import { FormContainerComponent } from './form-container.component';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

describe('FormContainerComponent', () => {
  let component: FormContainerComponent;
  let fixture: ComponentFixture<FormContainerComponent>;
  let loader: HarnessLoader;
  let progressBar: MatProgressBarHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [FormContainerComponent],
      imports: [
        MatChipsModule,
        MatProgressBarModule,
        MatCardModule,
        TranslateModule.forRoot(),
      ],
    });
    fixture = TestBed.createComponent(FormContainerComponent);
    component = fixture.componentInstance;

    loader = TestbedHarnessEnvironment.loader(fixture);
    progressBar = await loader.getHarness(MatProgressBarHarness);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the correct title', async () => {
    const title = 'Pool Characteristics';
    component.title = title;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toContain(title);
  });

  it('should display the correct progress bar', async () => {
    component.step = 1;
    component.totalSteps = 2;
    const expectedProgress = (component.step * 100) / component.totalSteps;
    fixture.detectChanges();
    const progressBarValue = await progressBar.getValue();
    expect(progressBarValue).toBe(expectedProgress);
  });
});
