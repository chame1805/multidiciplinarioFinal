import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadInicioComponent } from './head-inicio.component';

describe('HeadInicioComponent', () => {
  let component: HeadInicioComponent;
  let fixture: ComponentFixture<HeadInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
