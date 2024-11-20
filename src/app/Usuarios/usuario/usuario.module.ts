import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioHorarioComponent } from '../usuario-horario-component/usuario-horario-component.component';
import { FormsModule } from '@angular/forms';
import { AutentificacionModule } from "../../autentificacion/autentificacion.module";
import { ReservaComponent } from '../reserva/reserva.component';



@NgModule({
  declarations: [
    UsuarioHorarioComponent,
    ReservaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutentificacionModule,
    
    
],

  exports:[
    UsuarioHorarioComponent
  ]
})
export class UsuarioModule { }
