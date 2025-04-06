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
  splitBills: { [person: string]: number } = {};

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
    const targetDish = this.dishes.find(d => d.name === dish);
    if (!targetDish) return;
  
    // 💡 Prevent adding the same person twice
    if (targetDish.people.includes(person)) {
      console.log(`{person} is already added to {dish}. Skipping duplicate.`);
      return;
    }
  
    this.dataService.addPersonToDish(person, dish);
  }
  
  calculateSplitBill() {
    this.splitBills = {};

    for (const dish of this.dishes) {
      const people = dish.people;
      if (!people || people.length === 0) continue;

      const splitAmount = dish.price / people.length;

      for (const person of people) {
        if (!this.splitBills[person]) {
          this.splitBills[person] = 0;
        }
        this.splitBills[person] += splitAmount;
      }
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
