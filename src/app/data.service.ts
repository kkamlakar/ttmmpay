// data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private personsSource = new BehaviorSubject<any[]>([]);
  private dishesSource = new BehaviorSubject<any[]>([]);

  persons$ = this.personsSource.asObservable();
  dishes$ = this.dishesSource.asObservable();

  constructor() {}

  // Method to add a person
  addPerson(person: string) {
    const currentPersons = this.personsSource.value;
    this.personsSource.next([...currentPersons, { name: person, dishes: [] }]);
  }

  // Method to add a dish
  addDish(dish: string, price: number) {
    const currentDishes = this.dishesSource.value;
    this.dishesSource.next([...currentDishes, { name: dish, price, people: [] }]);
  }

  // Method to add a person to a dish
  addPersonToDish(personName: string, dishName: string) {
    const currentPersons = this.personsSource.value;
    const currentDishes = this.dishesSource.value;

    const person = currentPersons.find(p => p.name === personName);
    const dish = currentDishes.find(d => d.name === dishName);

    if (person && dish) {
      // Add the person to the dish's people list
      dish.people.push(personName);

      // Add the dish to the person's list of dishes
      person.dishes.push(dishName);

      // Update the observables
      this.personsSource.next([...currentPersons]);
      this.dishesSource.next([...currentDishes]);
    }
  }
}
