import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHorariosComponent } from './card-horarios.component';

describe('CardHorariosComponent', () => {
  let component: CardHorariosComponent;
  let fixture: ComponentFixture<CardHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardHorariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
