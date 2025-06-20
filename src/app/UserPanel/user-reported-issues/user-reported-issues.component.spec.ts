import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportedIssuesComponent } from './user-reported-issues.component';

describe('UserReportedIssuesComponent', () => {
  let component: UserReportedIssuesComponent;
  let fixture: ComponentFixture<UserReportedIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReportedIssuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReportedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
