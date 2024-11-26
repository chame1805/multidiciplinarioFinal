import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private cantidadSource = new BehaviorSubject<number>(0);
  cantidad$ = this.cantidadSource.asObservable();

  setCantidad(cantidad: number): void {
    this.cantidadSource.next(cantidad);
  }
}
