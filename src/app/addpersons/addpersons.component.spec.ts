import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonsComponent } from './addpersons.component';

describe('AddpersonsComponent', () => {
  let component: AddPersonsComponent;
  let fixture: ComponentFixture<AddPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPersonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
