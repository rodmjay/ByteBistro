import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsMergeSimulationComponent } from './rxjs-merge-simulation.component';

describe('RxjsMergeSimulationComponent', () => {
  let component: RxjsMergeSimulationComponent;
  let fixture: ComponentFixture<RxjsMergeSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsMergeSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsMergeSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
