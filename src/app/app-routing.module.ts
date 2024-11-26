import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuarioHorarioComponent } from './Usuarios/usuario-horario-component/usuario-horario-component.component';
import { ReservaComponent } from './Usuarios/reserva/reserva.component';
import { HorariosComponent } from './Chofer/horarios/horarios.component';
import { LiberarComponent } from './Chofer/liberar/liberar.component';
import { MetodoComponent } from './Usuarios/metodo/metodo.component';
import { PagoComponent } from './pago/pago.component';
import { PrincipalComponent } from './principal/principal.component';
import { CardHorarioComponent } from './Chofer/card-horarios/card-horarios.component';
import path from 'path';
import { MapScreenComponent } from './mapa/screens/map-screen/map-screen.component';
import { ComprobanteComponent } from './Usuarios/comprobante/comprobante.component';

const routes: Routes = [
  {path: '', component:PrincipalComponent},
  {path: 'inicio', component:LoginComponent},
  {path:'login', component:PrincipalComponent},
  {path :'comprobante', component:ComprobanteComponent},
  {path:'registro', component:RegistroComponent},
  {path: 'horario', component:UsuarioHorarioComponent},
  {path: 'reserva', component:ReservaComponent},
  {path:'rutas', component:HorariosComponent},
  {path: 'liberar', component:LiberarComponent},
  {path:'metodo', component:MetodoComponent},
  {path: 'pago', component:PagoComponent},
  {path: 'mapa', component:MapScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
