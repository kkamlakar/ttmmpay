import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-addpersons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addpersons.component.html',
  styleUrls: ['./addpersons.component.css'],
})
export class AddPersonsComponent implements OnInit {
  personName: string = '';
  persons: { name: string; dishes: string[] }[] = [];

  constructor(private dataService: DataService) {}
  
  @ViewChild('personInput') personInputRef!: ElementRef;


  ngOnInit() {
    this.dataService.persons$.subscribe((persons) => {
      this.persons = persons;
    });
  }

  addPerson() {
    const name = this.personName.trim();
    if (name) {
      this.dataService.addPerson(name);
      this.personName = '';
      setTimeout(() => {
       this.personInputRef.nativeElement.focus()  ; 
      });
    }
  }
  onRemovePerson(personName: string) {
    if (personName) {
      this.dataService.removePerson(personName);
    }
  }
}
