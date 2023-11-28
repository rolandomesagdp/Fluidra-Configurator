import { AnalysisFilters, Pool } from "configurator-core";
import { Observable, of } from "rxjs";

export class AnalysisServiceMock {

   constructor() { }
   
   getAll(callNumber: number, filters: AnalysisFilters): Observable<Pool[]> {
      if(callNumber === 1)
         return of(this.getFirstPage())
      else
         return of(this.getSecondPage());
	}

   getFirstPage(): Pool[] {
      return [
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
				},
				geolocation: {
					altitude: 50,
					climateZone: null,
					countryCode: null,
					latitude: null,
					locality: null,
					longitude: null,
					wind: 'medium',
					zipCode: null,
				},
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
				},
				geolocation: {
					altitude: 50,
					climateZone: null,
					countryCode: null,
					latitude: null,
					locality: null,
					longitude: null,
					wind: 'medium',
					zipCode: null,
				},
			},
		]
   }

   getSecondPage(): Pool[] {
      return [
			{
				id: 3000,
				name: 'Shermans Pool',
				email: 'robertsherman@email.com',
            date: "20/10/2023",
            draft: true,
				phone: '675435467',
				countryCode: 'ES',
				customerName: 'Robert Sherman',
				characteristics: {
					hasCover: true,
					shelter: true,
					shape: 'rectangular',
					ground: null,
					place: 'First place',
					type: "Outdoor pool",
					heated: null,
					dimension: null,
				},
				geolocation: {
					altitude: 50,
					climateZone: null,
					countryCode: null,
					latitude: null,
					locality: null,
					longitude: null,
					wind: 'medium',
					zipCode: null,
				},
			},
			{
				id: 5500,
            date: "25/01/2023",
				name: 'Tanguys Pool',
            draft: false,
				email: 'yvestanguy@email.com',
				phone: '687986432',
				countryCode: 'ES',
				customerName: 'Yves Tanguy',
				characteristics: {
					hasCover: true,
					shelter: true,
					shape: 'custom',
					ground: null,
					place: 'First place',
					type: "Indoor pool",
					heated: null,
					dimension: null,
				},
				geolocation: {
					altitude: 50,
					climateZone: null,
					countryCode: null,
					latitude: null,
					locality: null,
					longitude: null,
					wind: 'medium',
					zipCode: null,
				},
			},
		]
   }
}