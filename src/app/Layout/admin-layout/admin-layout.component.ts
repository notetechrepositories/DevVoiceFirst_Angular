import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/AuthService/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  isShow = false;
  isSidebarExpanded: boolean = true;
  userRole:any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router:Router,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private authService:AuthService
  ) { }
  async ngOnInit(): Promise<void> {
    this.checkScreenSize();
    this.userRole = localStorage.getItem('usertype');
    
  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

   @HostListener('window:resize', [])
   onWindowResize() {
     this.checkScreenSize();
   }
 
   checkScreenSize() {
     if (window.innerWidth < 768) {
       this.isSidebarExpanded = false;
     } else {
       this.isSidebarExpanded = true;
     }
   }

   logout() {
    console.log("working");
    
    this.confirmationService.confirm({
        header: 'Are you sure?',
        message: 'Please confirm to proceed.',
        accept: () => {
            this.authService.logout();
        },
        reject: () => {
        }
    });
}



}


