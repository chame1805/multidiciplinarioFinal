import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../service/total.service';

@Component({
  selector: 'app-metodo',
  templateUrl: './metodo.component.html',
  styleUrl: './metodo.component.css'
})
export class MetodoComponent {
  totalAmount: number = 0;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.cantidad$.subscribe((cantidad) => {
      this.totalAmount = cantidad * 20; // Multiplica la cantidad por 20
    });
  }
  
}
