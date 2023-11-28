import { Pool } from "configurator-core"
import { AnalysisSelectItem } from "../analysis-select-item"

describe("AnalysisSelectItem", () => {
   it("should be build for the apropriate analysis", () => {
      const analysis: Pool = {
         id: 1000,
         name: 'My first pool',
         email: 'firstCustomer@email.com',
         date: "30/09/2023",
         draft: true,
         phone: '675435467',
         countryCode: 'ES',
         customerName: 'John Stuart',
         characteristics: {
            hasCover: true,
            shelter: true,
            shape: 'rectangular',
            ground: null,
            place: 'First place',
            type: "Outdoor pool",
            heated: null,
            dimension: null,
         }
      }

      const analysisSelectItem: AnalysisSelectItem = AnalysisSelectItem.create(analysis);
      expect(analysisSelectItem.analysis).toEqual(analysis);
   })
   it("should be deselected by default", () => {
      const analysis: Pool = {
         id: 1000,
         name: 'My first pool',
         email: 'firstCustomer@email.com',
         date: "30/09/2023",
         draft: true,
         phone: '675435467',
         countryCode: 'ES',
         customerName: 'John Stuart',
         characteristics: {
            hasCover: true,
            shelter: true,
            shape: 'rectangular',
            ground: null,
            place: 'First place',
            type: "Outdoor pool",
            heated: null,
            dimension: null,
         }
      }

      const analysisSelectItem: AnalysisSelectItem = AnalysisSelectItem.create(analysis);
      expect(analysisSelectItem.selected).toBeFalse();
   });
})