import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuarioHorarioComponent } from './Usuarios/usuario-horario-component/usuario-horario-component.component';
import { ReservaComponent } from './Usuarios/reserva/reserva.component';
import { HorariosComponent } from './Chofer/horarios/horarios.component';
import { LiberarComponent } from './Chofer/liberar/liberar.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path: 'horario', component:UsuarioHorarioComponent},
  {path: 'reserva', component:ReservaComponent},
  {path:'rutas', component:HorariosComponent},
  {path: 'liberar', component:LiberarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
