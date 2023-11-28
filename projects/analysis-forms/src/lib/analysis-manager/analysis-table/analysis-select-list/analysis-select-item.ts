import { Pool } from "configurator-core";

export class AnalysisSelectItem {
   selected: boolean = false;

   constructor(public analysis: Pool) { }

   static create(analysis: Pool): AnalysisSelectItem {
      return new AnalysisSelectItem(analysis);
   }
}