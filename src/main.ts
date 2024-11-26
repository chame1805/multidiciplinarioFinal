import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbWVzaXRvIiwiYSI6ImNtMzE5OGYxdDB1M2Eya29uaWJtdXFvMGoifQ.7Bn9k5oOgjXNKEtwVBIFXg';




if(!navigator.geolocation){
  alert('error al mostrar la ubicacion')
  throw new Error (' navegador no soporta geolocalizador ')
} 
else{
  console.log('ubicacion obtenida');
  
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
