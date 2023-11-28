import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AnalysisTableHeaderComponent } from './analysis-table-header.component';
import { AnalysisTableModule } from '../analysis-table.module';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { AnalysisTableSpecSetup } from '../test/spec-setup';

describe('AnalysisTableHeaderComponent', () => {
   let component: AnalysisTableHeaderComponent;
   let fixture: ComponentFixture<AnalysisTableHeaderComponent>;
   let loader: HarnessLoader;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [ AnalysisTableModule ]
      });
      fixture = TestBed.createComponent(AnalysisTableHeaderComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      component = fixture.componentInstance;
      component.analysisList.addToList(AnalysisTableSpecSetup.analyses)
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it("should select all rows if user checks the checkbox", async () => {
      const checkbox = await loader.getHarness(MatCheckboxHarness);
      await checkbox.check();
      fixture.detectChanges();

      expect(component.analysisList.selection.length).toEqual(component.analysisList.analyses.length);
   });

   it("should deselect all rows if user unchecks the checkbox", async () => {
      const checkbox = await loader.getHarness(MatCheckboxHarness);
      await checkbox.check();
      fixture.detectChanges();

      // act
      await checkbox.uncheck();
      fixture.detectChanges();

      expect(component.analysisList.selection.length).toEqual(0);
   });
});
