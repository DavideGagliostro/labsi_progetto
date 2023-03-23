import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BohComponent } from './boh.component';

describe('BohComponent', () => {
  let component: BohComponent;
  let fixture: ComponentFixture<BohComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BohComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
