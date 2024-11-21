import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metodo',
  templateUrl: './metodo.component.html',
  styleUrl: './metodo.component.css'
})
export class MetodoComponent {
  constructor(private router:Router){}
  navigate(){
    this.router.navigate(['pago'])
  }
  
}
