import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularlogoComponent } from '../components/angularlogo/angularlogo.component';
import { BtnMylocationComponent } from '../components/btn-mylocation/btn-mylocation.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { MapViewComponent } from '../components/map-view/map-view.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { SearchResultsComponent } from '../components/search-results/search-results.component';
import { MapScreenComponent } from '../screens/map-screen/map-screen.component';
import { AutentificacionModule } from "../../autentificacion/autentificacion.module";



@NgModule({
  declarations: [
    MapScreenComponent,
    AngularlogoComponent,
    BtnMylocationComponent,
    LoadingComponent,
    MapViewComponent,
    SearchBarComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    AutentificacionModule
],
  exports: [
    MapScreenComponent
  ]
})
export class MapsModule { }
