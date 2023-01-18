import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopfieldNetworkComponent } from './hopfield-network.component';

describe('HopfieldNetworkComponent', () => {
  let component: HopfieldNetworkComponent;
  let fixture: ComponentFixture<HopfieldNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HopfieldNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HopfieldNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
