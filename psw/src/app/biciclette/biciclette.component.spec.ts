import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicicletteComponent } from './biciclette.component';

describe('BicicletteComponent', () => {
  let component: BicicletteComponent;
  let fixture: ComponentFixture<BicicletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BicicletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BicicletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
