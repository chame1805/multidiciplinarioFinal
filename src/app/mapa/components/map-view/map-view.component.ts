import { Component,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import  {Map,Popup,Marker} from 'mapbox-gl';
import { MapService, PlacesService } from '../../service';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  MapDivElent!:ElementRef

  constructor(private placesService : PlacesService, private mapService : MapService){}


  ngAfterViewInit(): void{
if(!this.placesService.useLocation) throw Error ('No hay  placesService.userlocartion')

   const map = new Map({
	container: this.MapDivElent.nativeElement,
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: this.placesService.useLocation,
	zoom: 14,
});


const popup = new Popup()
.setHTML(`
  <h6>Aqui estoy</h6>
  <span>Estoy en este lugar del mundo</span>
  `);

  new Marker({color: 'red'})
  .setLngLat(this.placesService.useLocation)
  .setPopup(popup)
  .addTo(map)
  this.mapService.setMap(map)
    
  }
}
