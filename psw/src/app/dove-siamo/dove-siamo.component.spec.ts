import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoveSiamoComponent } from './dove-siamo.component';

describe('DoveSiamoComponent', () => {
  let component: DoveSiamoComponent;
  let fixture: ComponentFixture<DoveSiamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoveSiamoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoveSiamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
