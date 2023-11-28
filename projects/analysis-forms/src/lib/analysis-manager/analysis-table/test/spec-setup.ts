import { AnalysisFilters, Pool } from "configurator-core";

export class AnalysisTableSpecSetup {
   static analysis: Pool = {
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
   };
   
   static analyses: Pool[] = [
      {
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
      },
      {
         id: 1500,
         date: "25/10/2023",
         name: 'Pool 2',
         draft: false,
         email: 'secondCustomer@email.com',
         phone: '687986432',
         countryCode: 'ES',
         customerName: 'William Faulkner',
         characteristics: {
            hasCover: true,
            shelter: true,
            shape: 'custom',
            ground: null,
            place: 'First place',
            type: "Indoor pool",
            heated: null,
            dimension: null,
         }
      },
   ];
   
   static analysesSecondPage: Pool[] = [
      {
         id: 2000,
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
      },
      {
         id: 3500,
         date: "25/10/2023",
         name: 'Pool 2',
         draft: false,
         email: 'secondCustomer@email.com',
         phone: '687986432',
         countryCode: 'ES',
         customerName: 'William Faulkner',
         characteristics: {
            hasCover: true,
            shelter: true,
            shape: 'custom',
            ground: null,
            place: 'First place',
            type: "Indoor pool",
            heated: null,
            dimension: null,
         }
      },
   ];

   static analysisFilters: AnalysisFilters = {
      searchCriteria: "1",
      poolTypes: ["1"],
      products: ["1"],
      postalCode: "1",
      from: "1",
      to: "1"
   }
}