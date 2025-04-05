import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adddishes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adddishes.component.html',
  styleUrl: './adddishes.component.css'
})
export class AddDishesComponent {
  dishName: string = '';
  dishPrice: number | null = null;

  constructor(private dataService: DataService) {}

  addDish() {
    if (this.dishName && this.dishPrice !== null) {
      this.dataService.addDish(this.dishName, this.dishPrice);
      this.dishName = '';
      this.dishPrice = null;
    }
  }
}