import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-adddishes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adddishes.component.html',
  styleUrls: ['./adddishes.component.css'],
})
export class AddDishesComponent implements OnInit, AfterViewInit {
  dishName: string = '';
  dishPrice: number | null = null;
  dishes: { name: string; price: number; people: string[] }[] = [];

  @ViewChild('dishInput', { static: true }) dishInputRef!: ElementRef<HTMLInputElement>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.dishes$.subscribe((dishes) => {
      this.dishes = dishes;
    });
  }

  ngAfterViewInit() {
    console.log('Trying to focus...');
    if (this.dishInputRef) {
      this.dishInputRef.nativeElement.focus();
      console.log('✅ Focused dish input');
    } else {
      console.warn('❌ dishInputRef is still undefined');
    }
  }
  
  addDish() {
    const name = this.dishName.trim();
    if (name && this.dishPrice !== null && this.dishPrice >= 0) {
      this.dataService.addDish(name, this.dishPrice);
      this.dishName = '';
      this.dishPrice = null;

      // Refocus the dish name input after adding
      setTimeout(() => {
        if (this.dishInputRef) {
          this.dishInputRef.nativeElement.focus();
          console.log('✅ Focused dish input after adding');
        }
      });
    }
  }

  onRemoveDish(dishName: string) {
    this.dataService.removeDish(dishName);
  }
}
