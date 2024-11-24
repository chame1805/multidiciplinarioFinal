import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = 'http://127.0.0.1:8000/api/reservas';
  private pasajeroApiUrl = 'http://127.0.0.1:8000/api/pasajeros';  // URL base para los pasajeros

  // BehaviorSubject para compartir datos entre componentes
  private reservaData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // Método para crear un pasajero
  registrarPasajero(pasajero: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Enviando datos del pasajero:', pasajero); // Esto te ayudará a ver los datos que estás enviando
    return this.http.post(`${this.pasajeroApiUrl}/post`, JSON.stringify(pasajero), { headers });
  }

  // Método para crear una reserva con el ID del pasajero
  registrarReserva(reserva: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Enviando datos de la reserva:', reserva); // Esto te ayudará a ver los datos de la reserva
    return this.http.post(`${this.apiUrl}/post`, JSON.stringify(reserva), { headers });
  }
  obtenerUltimoPasajero(): Observable<any> {
    return this.http.get('/api/pasajeros/ultimo'); // Ajusta la URL según tu backend
  }
  
}
