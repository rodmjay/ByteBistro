import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcpSimulationComponent } from './tcp-simulation.component';

describe('TcpSimulationComponent', () => {
  let component: TcpSimulationComponent;
  let fixture: ComponentFixture<TcpSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TcpSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcpSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
