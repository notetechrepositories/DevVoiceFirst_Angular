import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  token!: string | null;
  userDetails:any;

  constructor(private router: Router, private http: HttpClient) {}

  login(data: any){
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  isLoggedIn(): boolean {
    this.token = localStorage.getItem('token');
    if (this.token) {
      return !!this.token;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  validateToken(): Promise<void> {
    return new Promise((resolve) => {
      if (this.token) {
        resolve();
      } else {
        resolve();
      }
    });
  }
}
