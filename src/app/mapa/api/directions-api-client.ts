export interface DirectionsApiClient {
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { enviroment } from "../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient {
    public baseUrl: string = 'https://api.mapbox.com/search/geocode/v6/forward';

    constructor(handler: HttpHandler) {
        super(handler);
    }

    public override get<T>(url: string) {
        url = this.baseUrl + url;

        return super.get<T>(url, {
            params: {
                alternatives: false,
                geometries: 'geojson',
                language: 'es',
                overview: 'simplified',
                steps: false,
                access_token: enviroment.apikey,
                
            }
        });
    }
}


