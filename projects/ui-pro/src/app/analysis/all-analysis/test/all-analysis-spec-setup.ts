import { AnalysisFilters } from 'configurator-core';

export class AllAnalysisSpecSetup {
   static analysisFilters: AnalysisFilters = {
      searchCriteria: "1",
      poolTypes: ["1"],
      products: ["1"],
      postalCode: "1",
      from: new Date().toLocaleDateString(),
      to: new Date().toLocaleDateString()
   }
}