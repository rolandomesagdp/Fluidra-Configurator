import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisSummaryComponent } from './analysis-summary.component';

import { AnalysisManagerModule } from '../analysis-manager.module';
import { ConfirmationResponse } from '../../message';
import { AnalysisEventEmitter } from '../events';
import { ConfiguratorTranslateTestModule } from 'configurator-core';
import { of, tap } from 'rxjs';
import { DialogMessageService } from 'analysis-forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';

describe('AnalysisSummaryComponent', () => {
   let loader: HarnessLoader;
   let dialogMessageServiceMock;
   let component: AnalysisSummaryComponent;
   let fixture: ComponentFixture<AnalysisSummaryComponent>;

   beforeEach(() => {
      dialogMessageServiceMock = jasmine.createSpyObj("ConfirmationDialogService", ["confirm"]);
      dialogMessageServiceMock.confirm.and.returnValue(of(ConfirmationResponse.Accept));

      TestBed.configureTestingModule({
         declarations: [AnalysisSummaryComponent],
         imports: [
            AnalysisManagerModule,
            ConfiguratorTranslateTestModule
         ],
         providers: [
            AnalysisEventEmitter, 
            { provide: DialogMessageService, useValue: dialogMessageServiceMock}
         ]
      });
      fixture = TestBed.createComponent(AnalysisSummaryComponent);
      loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe("Duplicate analysis", async () => {
      let confirmSpy;

      beforeEach(async () => {
         confirmSpy = spyOn(component.confirService, "confirm");
      });

      it("should show a confirmation dialog when a duplication is requested", async () => {
         confirmSpy.and.returnValue(of(ConfirmationResponse.Accept));
         component.duplicateAnalysis();
         
         expect(confirmSpy).toHaveBeenCalled();
      });

      it("should request a duplication if the user confirms", () => {
         confirmSpy.and.returnValue(of(ConfirmationResponse.Accept));
         const requestDuplicationSpy = spyOn(component.summaryEvents, "duplicateAnalysis");
         
         component.duplicateAnalysis();
         
         expect(requestDuplicationSpy).toHaveBeenCalledWith(component.analysis);
      });

      it("should not request a duplication if the user rejects", () => {
         confirmSpy.and.returnValue(of(ConfirmationResponse.Reject));
         const requestDuplicationSpy = spyOn(component.summaryEvents, "duplicateAnalysis");
         
         component.duplicateAnalysis();
         
         expect(requestDuplicationSpy).not.toHaveBeenCalled();
      });
   });

   describe("Delete analysis", () => {
      let confirmSpy;

      beforeEach(async () => {
         confirmSpy = spyOn(component.confirService, "confirm");
      });

      it("should show a confirmation dialog when a deletion is requested", async () => {
         confirmSpy.and.returnValue(of(ConfirmationResponse.Accept));
         component.deleteAnalysis();
         
         expect(confirmSpy).toHaveBeenCalled();
      });

      it("should request a deletion if the user confirms", () => {
         confirmSpy.and.returnValue(of(ConfirmationResponse.Accept));
         const requestDeleteSpy = spyOn(component.summaryEvents, "duplicateAnalysis");
         
         component.duplicateAnalysis();
         
         expect(requestDeleteSpy).toHaveBeenCalledWith(component.analysis);
      });

      it("should not request a deletion if the user rejects", () => {
         confirmSpy.and.returnValue(of(ConfirmationResponse.Reject));
         const requestDeleteSpy = spyOn(component.summaryEvents, "duplicateAnalysis");
         
         component.duplicateAnalysis();
         
         expect(requestDeleteSpy).not.toHaveBeenCalledWith(component.analysis);
      });
   });

   describe("Show quick view", async () => {
      it("should show a dialog when the user clicks on 'Quick view' button", async () => {
         component.showQuickViewDialog();
         const quickViewDialog = await loader.getHarness(MatDialogHarness.with({ selector: "#quick_view_dialog"}));
         expect(quickViewDialog).toBeTruthy();
      });
   });
});
