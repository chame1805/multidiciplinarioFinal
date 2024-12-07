import { Injectable } from '@angular/core';
import { LngLat, LngLatBounds, LngLatLike,Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interface/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse,Route} from '../interface/directions';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  get isMapaReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  constructor(private directionsApi: DirectionsApiClient) { }

  flyTo(coords: LngLatLike) {
    if (!this.isMapaReady) throw Error('El mapa no esta inicializado');
    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  createMarkersFromPlaces(places: Feature[]) {
    if (!this.map) throw Error('Mapa no incicializado');
    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${place.text}</h6>
          <span>${place.place_naame}</span>
        `);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;
    if (places.length === 0) return;
    const bounds = new LngLatBounds(
      this.markers[0].getLngLat(),
      this.markers[0].getLngLat()
    );

    this.map.fitBounds(bounds);
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    // Construir la URL completa con el token de acceso
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=740%2015th%20St%20NW%2C%20Washington%2C%20DC%2020005%2C%20United%20States&proximity=ip&language=es&access_token=pk.eyJ1IjoiY2hhbWVzaXRvIiwiYSI6ImNtMzE5OGYxdDB1M2Eya29uaWJtdXFvMGoifQ.7Bn9k5oOgjXNKEtwVBIFXghttps://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/-93.1226,44.9504.json?radius=25&limit=5&dedupe&access_token=pk.eyJ1IjoiY2hhbWVzaXRvIiwiYSI6ImNtMzE5OGYxdDB1M2Eya29uaWJtdXFvMGoifQ.7Bn9k5oOgjXNKEtwVBIFXg`;
  
    this.directionsApi.get<DirectionsResponse>(url).subscribe(
      (resp) => {
        if (resp.routes && resp.routes.length > 0) {
          this.drawPolyline(resp.routes[0]); // Procesar la primera ruta
        } else {
          console.error('No se encontraron rutas.');
        }
      },
      (error) => {
        console.error('Error al obtener la ruta:', error); // Manejo de errores
      }
    );
  }
  drawPolyline(arg0: Route) {
    throw new Error('Method not implemented.');
  }
         
}
