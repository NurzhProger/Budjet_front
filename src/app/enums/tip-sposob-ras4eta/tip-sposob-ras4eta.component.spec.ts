import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipSposobRas4etaComponent } from './tip-sposob-ras4eta.component';

describe('TipSposobRas4etaComponent', () => {
  let component: TipSposobRas4etaComponent;
  let fixture: ComponentFixture<TipSposobRas4etaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipSposobRas4etaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipSposobRas4etaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
