import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLayoutComponent } from './admin-layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // ✅ Import HttpClientTestingModule
import { provideRouter } from '@angular/router';  // ✅ Import provideRouter for router support (if needed)

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLayoutComponent],
      imports: [HttpClientTestingModule], // ✅ Add HttpClientTestingModule here
      providers: [
        provideRouter([])  // ✅ Use provideRouter to mock routing (if needed)
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
