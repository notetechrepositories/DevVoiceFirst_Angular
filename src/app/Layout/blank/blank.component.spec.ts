import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlankComponent } from './blank.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('BlankComponent', () => {
  let component: BlankComponent;
  let fixture: ComponentFixture<BlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlankComponent],
      imports: [HttpClientTestingModule], // ✅ Add HttpClientTestingModule here
      providers: [
        provideRouter([]) // ✅ Provide an empty router if no routes are used
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
