import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiciclettePedaliComponent } from './biciclette-pedali.component';

describe('BiciclettePedaliComponent', () => {
  let component: BiciclettePedaliComponent;
  let fixture: ComponentFixture<BiciclettePedaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiciclettePedaliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiciclettePedaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
