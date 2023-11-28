import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisFiltersComponent } from './analysis-filters.component';
import { AnalysisTableModule } from '../analysis-table.module';
import { AnalysisFilters, ConfiguratorTranslateTestModule } from 'configurator-core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnalysisTableSpecSetup } from '../test/spec-setup';
import * as moment from 'moment';
import { filter, tap } from 'rxjs';

describe('AnalysisFiltersComponent', () => {
   let component: AnalysisFiltersComponent;
   let fixture: ComponentFixture<AnalysisFiltersComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [AnalysisTableModule, ConfiguratorTranslateTestModule, BrowserAnimationsModule]
      });
      fixture = TestBed.createComponent(AnalysisFiltersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it("should call notify about new filters when applied", () => {
      const analysisListFiltersAppliedSpy = spyOn(component.analysisSelectList, "onFiltersApplied")
      component.filtersForm.get("searchCriteria");
      component.filtersForm.markAsDirty();
      component.applyFilters();
      expect(analysisListFiltersAppliedSpy).toHaveBeenCalled();
   });

   it("should send the appropriate filters values on filters applied", () => {
      const filtersAppliedSpy = spyOn(component.analysisSelectList, "onFiltersApplied");
      
      component.filtersForm.get("searchCriteria").setValue("1");
      component.filtersForm.get("poolTypes").setValue(["1"]);
      component.filtersForm.get("products").setValue(["1"]);
      component.filtersForm.get("postalCode").setValue("1");
      component.filtersForm.markAsDirty();

      component.applyFilters();

      const expectedFilters = component.filtersForm.value;

      expect(filtersAppliedSpy).toHaveBeenCalledWith(expectedFilters);
   });

   it("should not the same filters multiple times", () => {
      const filtersAppliedSpy = spyOn(component.analysisSelectList, "onFiltersApplied");
      
      component.filtersForm.get("searchCriteria").setValue("1");
      component.filtersForm.get("poolTypes").setValue(["1"]);
      component.filtersForm.get("products").setValue(["1"]);
      component.filtersForm.get("postalCode").setValue("1");
      component.filtersForm.markAsDirty();

      component.filtersForm.markAsPristine();
      component.applyFilters();

      expect(filtersAppliedSpy).not.toHaveBeenCalled();
   });

   it("should not the same filters multiple times", () => {
      const filtersAppliedSpy = spyOn(component.analysisSelectList, "onFiltersApplied");
      
      component.filtersForm.get("searchCriteria").setValue("1");
      component.filtersForm.get("poolTypes").setValue(["1"]);
      component.filtersForm.get("products").setValue(["1"]);
      component.filtersForm.get("postalCode").setValue("1");
      component.filtersForm.markAsDirty();

      component.filtersForm.markAsPristine();
      component.applyFilters();

      const expectedFilters = component.filtersForm.value;

      expect(filtersAppliedSpy).not.toHaveBeenCalled();
   });

   it("should mark the filters as applied after applied the first time", () => {
      const markAsPristineSpy = spyOn(component.filtersForm, "markAsPristine");
      
      component.filtersForm.get("searchCriteria").setValue("1");
      component.filtersForm.get("poolTypes").setValue(["1"]);
      component.filtersForm.get("products").setValue(["1"]);
      component.filtersForm.get("postalCode").setValue("1");
      component.filtersForm.markAsDirty();

      component.applyFilters();

      expect(markAsPristineSpy).toHaveBeenCalled();
   });

   it("should mark the filters as applied after applied the first time", () => {
      const markAsPristineSpy = spyOn(component.filtersForm, "markAsPristine");
      
      component.filtersForm.get("searchCriteria").setValue("1");
      component.filtersForm.get("poolTypes").setValue(["1"]);
      component.filtersForm.get("products").setValue(["1"]);
      component.filtersForm.get("postalCode").setValue("1");
      component.filtersForm.markAsDirty();

      component.applyFilters();

      expect(markAsPristineSpy).toHaveBeenCalled();
   });

   it("should build the filters with the appropriate date format", doneCallback => {
      const currentDate = new Date();
      const momentDate = moment(currentDate);
      component.filtersForm.get("from").setValue(momentDate);
      component.filtersForm.markAsDirty();

      component.analysisSelectList.filterEvent$.pipe(
         tap((filters: AnalysisFilters) => {
            if(filters) {
               const expectedDate = currentDate.toLocaleDateString();
               expect(filters.from).toEqual(expectedDate);
               doneCallback();
            }
         })
      ).subscribe();

      component.applyFilters();
   });

   it("should send an empty string if no date is selected", doneCallback => {
      component.filtersForm.get("searchCriteria").setValue("1");
      component.filtersForm.markAsDirty();

      component.analysisSelectList.filterEvent$.pipe(
         tap((filters: AnalysisFilters) => {
            if(filters) {
               expect(filters.from).toEqual("");
               doneCallback();
            }
         })
      ).subscribe();

      component.applyFilters();
   })
});
