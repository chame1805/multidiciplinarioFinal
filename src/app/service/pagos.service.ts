import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private datos: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dat$=  this.datos.asObservable();


  setDatos(info:any): void{
    this.datos.next(info);
  }

  getDatos (){
    return this.datos.getValue()
  }

  constructor() { }
}
