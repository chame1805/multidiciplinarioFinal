import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroRutaService {
  private info: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  informacion$ = this.info.asObservable();

  private terminalSeleccionada = new BehaviorSubject<string>('');
  terminalSeleccionada$ = this.terminalSeleccionada.asObservable();

  constructor() {}

  // Método para agregar
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

  setTerminalSeleccionada(terminal: string): void {
    this.terminalSeleccionada.next(terminal);
  }

  getTerminalSeleccionada(): string {
    return this.terminalSeleccionada.getValue();
  }
}
