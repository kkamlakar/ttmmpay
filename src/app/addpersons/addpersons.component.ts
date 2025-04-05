import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addpersons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addpersons.component.html',
  styleUrl: './addpersons.component.css'
})
export class AddPersonsComponent {
  personName: string = '';

  constructor(private dataService: DataService) {}

  addPerson() {
    if (this.personName) {
      this.dataService.addPerson(this.personName);
      this.personName = ''; // Reset the input field
    }
  }
}