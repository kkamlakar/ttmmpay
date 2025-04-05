import { Component } from '@angular/core';
import { AddPersonsComponent } from "./addpersons/addpersons.component";
import { AddDishesComponent } from "./adddishes/adddishes.component";
import { SplitterComponent } from "./splitter/splitter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddPersonsComponent, AddDishesComponent, SplitterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ttmmpay';
}
