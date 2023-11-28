import { HttpParams } from "@angular/common/http";
import { AnalysisFilters } from "./analysis-filters";

export class AnalysisHttpParamsFactory {
   private filtersHttpParams: HttpParams

   constructor(private analysisFilters: AnalysisFilters) { }
   
   create(): HttpParams {
      this.filtersHttpParams = new HttpParams();
      this.setSearchCriteriaParam();
      this.setPostalCodeParam();
      this.setPoolTypesParam();
      this.setProductsParam();
      this.setFromDateParam();
      this.setToDateParam();
      return this.filtersHttpParams;
   }

   private setSearchCriteriaParam(): void {
      if (this.analysisFilters.searchCriteria) {
         this.filtersHttpParams = this.filtersHttpParams
            .set("searchCriteria", this.analysisFilters.searchCriteria);
      }
   }

   private setPostalCodeParam(): void {
      if (this.analysisFilters.postalCode) {
         this.filtersHttpParams = this.filtersHttpParams
            .set("postalCode", this.analysisFilters.postalCode);
      }
   }

   private setPoolTypesParam(): void {
      if (this.analysisFilters.poolTypes && this.analysisFilters.poolTypes.length > 0) {
         this.filtersHttpParams = this.filtersHttpParams
            .append("poolTypes", this.analysisFilters.poolTypes.join(','));
      }
   }

   private setProductsParam(): void {
      if (this.analysisFilters.products && this.analysisFilters.products.length > 0) {
         this.filtersHttpParams = this.filtersHttpParams
            .append("products", this.analysisFilters.products.join(','));
      }
   }

   private setFromDateParam(): void {
      if (this.analysisFilters.from) {
         this.filtersHttpParams = this.filtersHttpParams
            .set("from", this.analysisFilters.from);
      }
   }

   private setToDateParam() {
      if (this.analysisFilters.to) {
         this.filtersHttpParams = this.filtersHttpParams
            .set("to", this.analysisFilters.to);
      }
   }
}