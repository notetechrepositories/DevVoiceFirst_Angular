import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIssuetypeComponent } from './add-issuetype.component';

describe('AddIssuetypeComponent', () => {
  let component: AddIssuetypeComponent;
  let fixture: ComponentFixture<AddIssuetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddIssuetypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIssuetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
