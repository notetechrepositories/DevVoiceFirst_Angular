import { Component } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  ngOnInit(){
    console.log(this.authService.isLoggedIn());
    
  }

  
}
