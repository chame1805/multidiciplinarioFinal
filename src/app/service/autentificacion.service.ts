import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro } from '../interface/registro';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  private datos: BehaviorSubject<Registro | null> = new BehaviorSubject<Registro | null>(null);
  datos$: Observable<Registro | null> = this.datos.asObservable();

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  token$: Observable<string | null> = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', correo);
    formData.append('password', password);

    return this.http.post('http://184.73.190.125:8000/token', formData);
  }

  register(chofer: any): Observable<any> {
    return this.http.post('http://184.73.190.125:8000/register', chofer);
  }

  setToken(token: string): void {
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();
  }

  getUserProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get('http://127.0.0.1:8000/users/profile', { headers });
  }
}
