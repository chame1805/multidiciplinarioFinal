import { Component } from '@angular/core';
import { PlacesService } from '../../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent {

  constructor(private placesService: PlacesService, private route:Router){}

  get isUserLocationReady(){
    return this.placesService.isUserLocationReady;
  }


  envio(){
    this.route.navigate(['/horario'])
  }
}
