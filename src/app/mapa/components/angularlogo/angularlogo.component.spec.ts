import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularlogoComponent } from './angularlogo.component';

describe('AngularlogoComponent', () => {
  let component: AngularlogoComponent;
  let fixture: ComponentFixture<AngularlogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularlogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularlogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
