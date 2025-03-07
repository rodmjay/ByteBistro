import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryTlbSimulationComponent } from './memory-tlb-simulation.component';

describe('MemoryTlbSimulationComponent', () => {
  let component: MemoryTlbSimulationComponent;
  let fixture: ComponentFixture<MemoryTlbSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryTlbSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryTlbSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
