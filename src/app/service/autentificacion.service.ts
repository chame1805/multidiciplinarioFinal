import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Registro } from '../interface/registro';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  private datos: BehaviorSubject<Registro | null> = new BehaviorSubject<Registro | null>(null);
  datos$: Observable<Registro | null> = this.datos.asObservable();

  actualizarInfo(nuevaInfo: Registro): void {
    this.datos.next(nuevaInfo);
  }

  obtenerInfo(): Registro | null {
    return this.datos.getValue();
  }
}
