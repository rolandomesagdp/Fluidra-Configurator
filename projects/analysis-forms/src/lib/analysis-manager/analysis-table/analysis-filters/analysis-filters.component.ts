import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RadioButtonOption } from '../../../radio-button-list/radio-button-option.interface';
import { poolTypes } from '../../../pool/pool-characteristics-form/pool-characteristics-constants';
import { AnalysisSelectList } from '../analysis-select-list';
import { AnalysisFilters } from 'configurator-core';

@Component({
  selector: 'fcc-analysis-filters',
  templateUrl: './analysis-filters.component.html',
  styleUrls: ['./analysis-filters.component.scss']
})
export class AnalysisFiltersComponent {
   private _poolTypes: RadioButtonOption[] = [{ key: "all", label:"All"}, ...poolTypes];

   get poolTypes(): RadioButtonOption[] {
      return  this._poolTypes;
   }

   filtersForm: FormGroup = new FormGroup({
      searchCriteria: new FormControl(""),
      postalCode: new FormControl(""),
      poolTypes: new FormControl(""),
      products: new FormControl(""),
      from: new FormControl(""),
      to: new FormControl("")
   });

   constructor(public analysisSelectList: AnalysisSelectList) { }

   applyFilters(): void {
      if(this.filtersForm.dirty) {
         const filters: AnalysisFilters = {
            searchCriteria: this.filtersForm.get("searchCriteria").value as string,
            poolTypes: this.filtersForm.get("poolTypes").value as string[],
            products: this.filtersForm.get("products").value as string[],
            postalCode: this.filtersForm.get("postalCode").value as string,
            from: this.getDate("from"),
            to: this.getDate("to")
         };
         this.analysisSelectList.onFiltersApplied(filters);
      }
      this.filtersForm.markAsPristine();
   }

   private getDate(formControlName: string): string {
      const formDate = this.filtersForm.get(formControlName).value;
      if(formDate)
         return new Date(formDate).toLocaleDateString();
      return "";
   }
}
