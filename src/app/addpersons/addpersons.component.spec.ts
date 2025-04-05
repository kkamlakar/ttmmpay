import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpersonsComponent } from './addpersons.component';

describe('AddpersonsComponent', () => {
  let component: AddpersonsComponent;
  let fixture: ComponentFixture<AddpersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpersonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
