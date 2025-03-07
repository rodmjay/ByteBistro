import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheHierarchySimulationComponent } from './cache-hierarchy-simulation.component';

describe('CacheHierarchySimulationComponent', () => {
  let component: CacheHierarchySimulationComponent;
  let fixture: ComponentFixture<CacheHierarchySimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CacheHierarchySimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CacheHierarchySimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
