import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioHorarioComponentComponent } from './usuario-horario-component.component';

describe('UsuarioHorarioComponentComponent', () => {
  let component: UsuarioHorarioComponentComponent;
  let fixture: ComponentFixture<UsuarioHorarioComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioHorarioComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioHorarioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
