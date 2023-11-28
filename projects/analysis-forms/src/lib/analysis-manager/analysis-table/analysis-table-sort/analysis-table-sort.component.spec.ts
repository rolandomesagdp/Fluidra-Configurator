import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTableSortComponent } from './analysis-table-sort.component';
import { MatIconModule } from '@angular/material/icon';

describe('AnalysisTableSortComponent', () => {
  let component: AnalysisTableSortComponent;
  let fixture: ComponentFixture<AnalysisTableSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisTableSortComponent],
      imports: [ MatIconModule ]
    });
    fixture = TestBed.createComponent(AnalysisTableSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
