import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'path';
import { Feature, PlacesResponse } from '../interface/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

public  useLocation? : [number,number];
public isLoadingPlaces: boolean = false;
public places: Feature[]= []



get isUserLocationReady(): boolean {
  return !!this.useLocation
}



  constructor(private placesApi: PlacesApiClient , private mapService: MapService) {
    this.getUserLocation();
   }




   public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.navigator && window.navigator.geolocation) {
        // Solo acceder a geolocalización en el navegador
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            this.useLocation = [coords.longitude, coords.latitude];
            resolve(this.useLocation);
          },
          (err) => {
            alert('No se pudo obtener la geolocalizacion');
            console.log(err);
            reject();
          }
        );
      } else {
        // Manejar caso en que la geolocalización no esté disponible
        alert('La geolocalización no está disponible en este entorno');
        reject();
      }
    });
  }
  

  getPlcesByQuery(query: string = '') {
    if (query.trim().length === 0) {
      this.places = []; // Limpia los resultados si no hay consulta
      return;
    }
  
    this.isLoadingPlaces = true;
  
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.useLocation?.join(',') || '', // Verifica que useLocation esté definido
      },
    }).subscribe(
      (resp) => {
        console.log(resp.features); // Depuración de respuesta
        this.isLoadingPlaces = false;
        this.places = resp.features; // Almacena los lugares en la lista
        this.mapService.createMarkersFromPlaces(this.places)
      },
      (error) => {
        console.error('Error al obtener los lugares:', error);
        this.isLoadingPlaces = false; // Finaliza la carga en caso de error
      }
    );
  }
  

}
