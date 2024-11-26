import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorariosComponent } from '../horarios/horarios.component';
import { FormsModule } from '@angular/forms';
import { AutentificacionModule } from "../../autentificacion/autentificacion.module";
import { CardHorarioComponent } from '../card-horarios/card-horarios.component';
import { LiberarComponent } from '../liberar/liberar.component';
import { HeaderCComponent } from '../header-c/header-c.component';
import { AppRoutingModule } from '../../app-routing.module';




@NgModule({
  declarations: [
    HorariosComponent,
   CardHorarioComponent,
   LiberarComponent,
   HeaderCComponent
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutentificacionModule,
    AppRoutingModule
],
  exports: [
    HorariosComponent
  ]
})
export class ChoferesModule { }
