import { Component } from '@angular/core';
import { Feature } from '../../interface/places';
import { MapService, PlacesService } from '../../service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'] // Asegúrate de que sea `styleUrls`, no `styleUrl`
})
export class SearchResultsComponent {

  constructor(private placesService: PlacesService, private mapservice: MapService) {}

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyto(place: Feature) {
    const [lng, lat] = place.center;
    this.mapservice.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {
    // Verifica que useLocation no sea undefined
    if (!this.placesService.useLocation) {
      throw new Error('No hay user Location');
    }
  
    const start: [number, number] = this.placesService.useLocation;
    const end: [number, number] = place.center as [number, number];
  
    // Verificación de coordenadas
    if (!Array.isArray(end) || end.length !== 2) {
      throw new Error('Las coordenadas del destino son inválidas');
    }
  
    // Llamada al servicio de MapService
    this.mapservice.getRouteBetweenPoints(start, end);
  }
    
}
