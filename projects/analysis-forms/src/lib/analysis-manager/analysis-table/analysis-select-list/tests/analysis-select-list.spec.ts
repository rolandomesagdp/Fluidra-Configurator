import { AnalysisTableSpecSetup } from "../../test/spec-setup";
import { AnalysisFilters } from "configurator-core";
import { AnalysisSelectList } from "../analysis-select-list";
import { AnalysisSelectItem } from "../analysis-select-item";

describe("AnalysisSelectList", () => {
   let analysisSelectList: AnalysisSelectList;

   beforeEach(() => {
      analysisSelectList = new AnalysisSelectList();
   });

   it("should properly initialize list when requested", () => {
      analysisSelectList.initList(AnalysisTableSpecSetup.analyses);
      expect(analysisSelectList.analyses.length).toEqual(AnalysisTableSpecSetup.analyses.length);
   });

   it("should emmit the list value when initialized", doneCallback => {
      analysisSelectList.analyses$.subscribe((list: AnalysisSelectItem[]) => {
         if(list && list.length) {
            expect(list.length).toEqual(AnalysisTableSpecSetup.analyses.length);
            doneCallback();
         }
      });

      analysisSelectList.initList(AnalysisTableSpecSetup.analyses);
   });

   it("should add items to list", () => {
      analysisSelectList.addToList(AnalysisTableSpecSetup.analyses);

      expect(analysisSelectList.analyses.length).toEqual(AnalysisTableSpecSetup.analyses.length);
   });

   it("should emmit the list value when new items are added", doneCallback => {
      analysisSelectList.analyses$.subscribe((list: AnalysisSelectItem[]) => {
         if(list && list.length) {
            expect(list.length).toEqual(AnalysisTableSpecSetup.analyses.length);
            doneCallback();
         }
      });

      analysisSelectList.addToList(AnalysisTableSpecSetup.analyses);
   });

   it("should encrease the list on more items provided", () => {
      // arrange
      analysisSelectList.initList(AnalysisTableSpecSetup.analyses);

      // act
      analysisSelectList.addToList(AnalysisTableSpecSetup.analysesSecondPage);

      expect(analysisSelectList.analyses.length).toEqual(4);
   });

   it("should clear the list if requested", () => {
      analysisSelectList.initList(AnalysisTableSpecSetup.analyses);
      analysisSelectList.clear();
      expect(analysisSelectList.analyses.length).toEqual(0);
   });

   it("should check all elements as selected when requested", () => {
      analysisSelectList.initList(AnalysisTableSpecSetup.analyses);
      analysisSelectList.allSelected = true;
      analysisSelectList.toggleSelection();

      const selectedItems = analysisSelectList.selection;
      expect(selectedItems.length).toEqual(AnalysisTableSpecSetup.analyses.length);
   });

   it("should uncheck all elements as deselected when requested", () => {
      // arrange
      analysisSelectList.initList(AnalysisTableSpecSetup.analyses);
      analysisSelectList.allSelected = true;
      analysisSelectList.toggleSelection();

      // act
      analysisSelectList.allSelected = false;
      analysisSelectList.toggleSelection();

      // assert
      const selectedItems = analysisSelectList.selection;
      expect(selectedItems.length).toEqual(0);
   });

   it("should emmit an updated list on all selection toggled", doneCallback => {
      analysisSelectList.initList(AnalysisTableSpecSetup.analyses)
      analysisSelectList.analyses$.subscribe((list: AnalysisSelectItem[]) => {
         if(list && list.length && analysisSelectList.allSelected) {
            const selectedItemsLength = list.filter(x => x.selected === true).length;
            expect(selectedItemsLength).toEqual(list.length);
            doneCallback();
         }
      });
      analysisSelectList.allSelected = true;
      analysisSelectList.toggleSelection();
   });

   it("should mark all as selected when the user selects the last item", () => {
      // arrange
      analysisSelectList.initList(AnalysisTableSpecSetup.analyses);
      analysisSelectList.allSelected = true;
      analysisSelectList.toggleSelection();
      analysisSelectList.allSelected = false;

      // act
      analysisSelectList.onItemSelectionToggle();

      // assert
      expect(analysisSelectList.allSelected).toBeTrue();
   });

   it("should mark all as unselected when the user unselect the last item", () => {
      // arrange
      analysisSelectList.initList(AnalysisTableSpecSetup.analyses);
      analysisSelectList.allSelected = true;

      // act
      analysisSelectList.onItemSelectionToggle();

      // assert
      expect(analysisSelectList.allSelected).toBeFalse();
   });

   it("should emmit filters when applied", doneCallback => {
      const analysisFilters: AnalysisFilters = AnalysisTableSpecSetup.analysisFilters;
      analysisSelectList.filterEvent$.subscribe((filters: AnalysisFilters) => {
         if(filters) {
            const sameCriteria = filters.searchCriteria === analysisFilters.searchCriteria;
            const samePoolTypes = filters.poolTypes === analysisFilters.poolTypes;
            const sameProducts = filters.products === analysisFilters.products;
            const sameZip = filters.postalCode === analysisFilters.postalCode;
            const sameFrom = filters.from === analysisFilters.from;
            const sameTo = filters.to === analysisFilters.to;
            const areSameFilters = sameCriteria && samePoolTypes && 
               sameProducts && sameZip && sameFrom && sameTo;
            
            expect(areSameFilters).toBeTrue();
            doneCallback();
         }
      });
      analysisSelectList.onFiltersApplied(analysisFilters);
   });

   it("should clear the list when requeste", () => {
      analysisSelectList.initList(AnalysisTableSpecSetup.analyses);
      analysisSelectList.clear();
      expect(analysisSelectList.analyses.length).toEqual(0);
   });
})