import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 private apiUrl = environment.apiUrl;

  token!: string | null;
  userDetails:any;

  constructor(private router: Router, private http: HttpClient) {}

  accessToken = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  insertRole(data: any){
    return this.http.post(`${this.apiUrl}/role/add-role`, data, { headers:this.headers });
  }

  // roles = [
  //   {
  //     "id_t5_1_sys_roles": "1",
  //     "t5_1_roles_name": "Owner",
  //     "t5_1_all_location_access": "y",
  //     "t5_1_all_issues": "y",
  //     "permissions": {
  //       "employee": { "create": true, "read": true, "update": true, "delete": true },
  //       "issue-type": { "create": true, "read": true, "update": true, "delete": true },
  //       "order": { "create": true, "read": true, "update": true, "delete": true },
  //       "menu": { "create": true, "read": true, "update": true, "delete": true }
  //     }
  //   },
  //   {
  //     "id_t5_1_sys_roles": "2",
  //     "t5_1_roles_name": "General Manager",
  //     "t5_1_all_location_access": "y",
  //     "t5_1_all_issues": "y",
  //     "permissions": {
  //       "employee": { "create": true, "read": true, "update": true, "delete": false },
  //       "issue-type": { "create": true, "read": true, "update": false, "delete": false },
  //       "order": { "create": true, "read": true, "update": true, "delete": false },
  //       "menu": { "create": false, "read": true, "update": true, "delete": false }
  //     }
  //   },
  //   {
  //     "id_t5_1_sys_roles": "3",
  //     "t5_1_roles_name": "Kitchen Manager",
  //     "t5_1_all_location_access": "n",
  //     "t5_1_all_issues": "y",
  //     "permissions": {
  //       "employee": { "create": false, "read": true, "update": false, "delete": false },
  //       "issue-type": { "create": false, "read": true, "update": false, "delete": false },
  //       "order": { "create": true, "read": true, "update": true, "delete": false },
  //       "menu": { "create": true, "read": true, "update": false, "delete": false }
  //     }
  //   },
  //   {
  //     "id_t5_1_sys_roles": "4",
  //     "t5_1_roles_name": "Line Cook",
  //     "t5_1_all_location_access": "n",
  //     "t5_1_all_issues": "n",
  //     "permissions": {
  //       "employee": { "create": false, "read": false, "update": false, "delete": false },
  //       "issue-type": { "create": false, "read": true, "update": false, "delete": false },
  //       "order": { "create": false, "read": true, "update": false, "delete": false },
  //       "menu": { "create": false, "read": true, "update": false, "delete": false }
  //     }
  //   }
  // ];

  modules = ['employee', 'issue-type', 'branch', 'reported issue'];



  getAllroles(filter:any){
    return this.http.post(`${this.apiUrl}/role/get-all-role`,filter);
  }
   updateRole(data: any){
    return this.http.post(`${this.apiUrl}/role/update-role`, data);
  }
  deleteRole(id:any){
    return this.http.delete(`${this.apiUrl}/role/role?id=${id}`);
  }

  // Programs

    getprograms(filter:any){
    return this.http.post(`${this.apiUrl}/role/get-program`,filter);
  }
}
