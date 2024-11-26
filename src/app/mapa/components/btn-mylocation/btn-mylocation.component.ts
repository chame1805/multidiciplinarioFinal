import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../service';



@Component({
  selector: 'app-btn-mylocation',
  templateUrl: './btn-mylocation.component.html',
  styleUrl: './btn-mylocation.component.css'
})
export class BtnMylocationComponent {
constructor(private mapService: MapService ,  private placesService:PlacesService){}

goToMyLocation(){

  if(!this.placesService.isUserLocationReady) throw Error('No hay ubicacion de usuario')
    if(!this.mapService.isMapaReady) throw Error('No hay mapa disponible')

      this.mapService.flyTo(this.placesService.useLocation!)
  
}

}
