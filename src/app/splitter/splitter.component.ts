import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-splitter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.css'],
})
export class SplitterComponent implements OnInit {
  persons: any[] = [];
  dishes: any[] = [];
  selectedPerson: string = '';
  selectedDish: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.persons$.subscribe((persons) => {
      this.persons = persons;
    });

    this.dataService.dishes$.subscribe((dishes) => {
      this.dishes = dishes;
    });
  }

  addPersonToDish(person: string, dish: string) {
    this.dataService.addPersonToDish(person, dish);
  }
  totalBill: number | null = null;  // Store the total calculated bill

  calculateSplitBill() {
    let sum = 0;
  
    for (let dish of this.dishes) {
      if (dish.people.length > 0) { 
        sum += dish.price / dish.people.length;  // Split price among consumers
      }
    }
  
    this.totalBill = sum;  // Update total bill
  }
}
