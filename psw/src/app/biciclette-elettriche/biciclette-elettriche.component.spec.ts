import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicicletteElettricheComponent } from './biciclette-elettriche.component';

describe('BicicletteElettricheComponent', () => {
  let component: BicicletteElettricheComponent;
  let fixture: ComponentFixture<BicicletteElettricheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BicicletteElettricheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BicicletteElettricheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
