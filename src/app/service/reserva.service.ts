import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = 'http://184.73.190.125:8000/api/reservas';
  private pasajeroApiUrl = 'http://184.73.190.125:8000/api/pasajeros';
  private  colectivo = 'http://184.73.190.125:8000/api/colectivo'

  // BehaviorSubject para compartir datos entre componentes
  private reservaData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // Método para obtener todos los pasajeros
  obtenerTodosLosPasajeros(): Observable<any> {
    return this.http.get(`${this.pasajeroApiUrl}/`);
  }

  // Método para obtener un pasajero por ID
  obtenerPasajeroPorId(id: string): Observable<any> {
    return this.http.get(`${this.pasajeroApiUrl}/one/${id}`);
  }

  // Método para crear un pasajero
  registrarPasajero(pasajero: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Enviando datos del pasajero:', pasajero);
    return this.http.post(`${this.pasajeroApiUrl}/post`, JSON.stringify(pasajero), { headers });
  }

  // Método para actualizar un pasajero por ID
  actualizarPasajero(id: string, pasajero: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(`Actualizando pasajero con ID: ${id}`, pasajero);
    return this.http.put(`${this.pasajeroApiUrl}/update/${id}`, JSON.stringify(pasajero), { headers });
  }

  // Método para eliminar un pasajero por ID
  eliminarPasajero(id: string): Observable<any> {
    console.log(`Eliminando pasajero con ID: ${id}`);
    return this.http.delete(`${this.pasajeroApiUrl}/delete/${id}`);
  }

  // Método para obtener el último pasajero
  obtenerUltimoPasajero(): Observable<any> {
    return this.http.get(`${this.pasajeroApiUrl}/last`);
  }

  // Método para crear una reserva con el ID del pasajero
  registrarReserva(reserva: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Enviando datos de la reserva:', reserva);
    return this.http.post(`${this.apiUrl}/post`, JSON.stringify(reserva), { headers });
  }
  obtenerUltimaReserva(): Observable<any> {
    return this.http.get(`${this.apiUrl}/last`);
  }

  // Método para actualizar solo la cantidad de una reserva
 // En el servicio ReservaService

actualizarReserva(id: string, reserva: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  console.log(`Actualizando reserva con ID: ${id}`, reserva);
  return this.http.put(`${this.apiUrl}/update/${id}`, JSON.stringify(reserva), { headers });
}
actualizarReserva1(id: string, data: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.patch(`${this.colectivo}/asientos/${id}`, JSON.stringify(data), { headers });
}
obtenerColectivoPorPasajero(pasajeroId: string): Observable<any> {
  const url = `${this.pasajeroApiUrl}/colectivo/${pasajeroId}`;
  return this.http.get<any>(url);
}
}
