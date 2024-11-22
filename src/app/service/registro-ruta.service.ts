import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horarios } from '../interface/horarios';
@Injectable({
  providedIn: 'root',
})
export class RegistroRutaService {
  private info: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  informacion$ = this.info.asObservable();

  private terminalSeleccionada = new BehaviorSubject<string>('');
  terminalSeleccionada$ = this.terminalSeleccionada.asObservable();

  private apiUrl = 'http://127.0.0.1:8000/api/colectivo'; // Ajusta si es necesario.

  constructor(private http: HttpClient) {}

  // Método para enviar datos a la API
  enviarDatosAPI(data: any) {
    console.log('Enviando datos a la API:', data);
    return this.http.post(this.apiUrl + '/post', data);
  }

  // Método para agregar localmente
  newInfo(nuevo: any): void {
    const valorActual = this.info.getValue();
    const nuevoValor = [...valorActual, nuevo];
    this.info.next(nuevoValor);
    console.log('Información llegada:', nuevoValor);
  }

  updateInfo(index: number, nuevoValor: any): void {
    const datos = this.info.getValue();
    if (index >= 0 && index < datos.length) {
      const datosActualizados = [...datos];
      datosActualizados[index] = nuevoValor;
      this.info.next(datosActualizados);
      console.log('Datos actualizados:', datosActualizados);
    } else {
      console.log('Índice no válido, no se pueden editar los datos.');
    }
  }

  getEnvio(): any[] {
    return this.info.getValue();
  }

  // Método para obtener los horarios desde la API
  obtenerHorarios(): Observable<Horarios[]> {
    return this.http.get<Horarios[]>(this.apiUrl);
  }

  setTerminalSeleccionada(terminal: string): void {
    this.terminalSeleccionada.next(terminal);
  }

  getTerminalSeleccionada(): string {
    return this.terminalSeleccionada.getValue();
  }
}
