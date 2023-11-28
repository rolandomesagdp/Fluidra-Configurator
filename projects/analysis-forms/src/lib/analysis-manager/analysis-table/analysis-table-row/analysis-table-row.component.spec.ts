import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTableRowComponent } from './analysis-table-row.component';
import { AnalysisTableModule } from '../analysis-table.module';
import { AnalysisSelectItem } from '../analysis-select-list';
import { ConfiguratorTranslateTestModule } from 'configurator-core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { AnalysisTableSpecSetup } from '../test/spec-setup';

describe('AnalysisTableRowComponent', () => {
   let component: AnalysisTableRowComponent;
   let fixture: ComponentFixture<AnalysisTableRowComponent>;
   let analysisSelectItem: AnalysisSelectItem;
   let loader: HarnessLoader;

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [AnalysisTableRowComponent],
         imports: [AnalysisTableModule, ConfiguratorTranslateTestModule]
      });
      fixture = TestBed.createComponent(AnalysisTableRowComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      analysisSelectItem = AnalysisSelectItem.create(AnalysisTableSpecSetup.analyses[0]);
      component = fixture.componentInstance;
      component.analysisItem = analysisSelectItem;
      component.analysisList.addToList(AnalysisTableSpecSetup.analyses);
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe("Functional", async () => {
      it("should be a selectable row", async () => {
         const checkbox = await loader.getHarness(MatCheckboxHarness);
         expect(checkbox).toBeTruthy();
      });

      it("should select the item if user checks the checkbox", async () => {
         const checkbox = await loader.getHarness(MatCheckboxHarness);

         await checkbox.check();
         fixture.detectChanges();
         
         expect(component.analysisItem.selected).toBeTrue();
      });

      it("should not print button text for screens lower than 1920px with", () => {
         spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1919);

         const buttonText = component.printButtonText("Delete");
         expect(buttonText).toEqual("");
      });

      it("should print button text for screens larger than 1920px with", () => {
         spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1921);

         const buttonText = component.printButtonText("Delete");
         expect(buttonText).toEqual("Delete");
      })
   });

   describe("Layout", async () => {
      it("should be highlighted if user checks the checkbox", async () => {
         const checkbox = await loader.getHarness(MatCheckboxHarness);

         await checkbox.check();
         fixture.detectChanges();
         
         const rowHighlightClasses = component.getRowClasses();
         expect(rowHighlightClasses).toEqual("row_selected");
      });

      it("should remove the highlight if user uncheck the checkbox", async () => {
         // arrange
         const checkbox = await loader.getHarness(MatCheckboxHarness);
         await checkbox.check();
         fixture.detectChanges();

         // act
         await checkbox.uncheck();
         fixture.detectChanges();
         
         const rowHighlightClasses = component.getRowClasses();
         expect(rowHighlightClasses).toEqual("row_not_selected");
      });
   })
});