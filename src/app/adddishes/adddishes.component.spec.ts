import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDishesComponent } from './adddishes.component';

describe('AdddishesComponent', () => {
  let component: AddDishesComponent;
  let fixture: ComponentFixture<AddDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [addEventListener]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
