import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocationService } from '../../Services/LocationService/location.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
  isMenuOpen = false;
  isloggedin : boolean=false;
  isloginVisible :boolean=false;
  loginFormVisible :boolean=true;
  isSignInForm:boolean=true;
  isRegisterVisible:boolean=false;
  isEmailFormVisible:boolean=true;

  isForgotVisible:boolean=false;
  usernameFormVisible:boolean=true;
  isOtpFormVisible:boolean=false;
  forgotOtpValue:any;
  encryptedOtp:string='';
  newPassword:any;
  confirmPassword:any;
  userData:string='';

  isSuggestionVisible:boolean=false;
  timeLeft: number = 60; 
  timerInterval: any;
  isOtpDisabled: boolean = false;
  userType:any;
  otpValue : any
  resendOtpClicks: number = -1; 
  username:string='';
  password:string='';
  loading: boolean = false;

  countries: any[]=[];

  divisionOnes: any[]=[];

  divisionTwos: any[]=[];

  divisionThrees: any[]=[];

  selectedCountry: any | null = null;

  div1Options: string[] = [];
  div2Options: string[] = [];
  div3Options: string[] = [];

  div1Label = 'Division 1';
  div2Label = 'Division 2';
  div3Label = 'Division 3';

  userForm!: FormGroup;

  private jwtHelper = new JwtHelperService();
  
    constructor(
      private router:Router,
      private fb: FormBuilder,
      private authService:AuthService,
      private confirmationService:ConfirmationService,
      private messageService:MessageService,
      private locationService:LocationService,
    ){}
  


  async ngOnInit(): Promise<void> {
    this.loadLocations();
    this.checkScreenSize();
    this.googleInit();
    console.log(this.authService.isLoggedIn());
    if(this.authService.isLoggedIn()){
      this.isloggedin=true;
    }
    else{
      this.isloggedin=false;
    }
    
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address1: ['', [Validators.required]],
      address2: [''],
      birthDate: ['', [Validators.required]],
      sex: [''],
      id_t2_1_country: ['', [Validators.required]],
      id_t2_1_div1: [''],
      id_t2_1_div2: [''],
      id_t2_1_div3: [''],
      local: [''],
      zipCode: ['', [Validators.required]],
      role_name: [''],
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    // Disable scrolling when the menu is open
    if (this.isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  onMenuClick(){
    if(this.isMenuOpen){
      this.isMenuOpen=false;
    }
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    if (window.innerWidth > 1490) {
      this.isMenuOpen = false;
      document.body.classList.remove('no-scroll'); // Reset scrolling
    }
  }

  //================ Scrolling=================

  showScroll: boolean = false; 
  scrollThreshold: number = 200; 
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Listen to window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.showScroll = scrollPosition > this.scrollThreshold;
  }


// ============================================================================

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


openLogin(){
  this.isloginVisible=true;
  this.username='';
  this.password='';
}

onClose(){
  this.isloginVisible=false;
}

requetData:any;

onLogin(){
  
  if(this.username&&this.password){
    this.requetData={
      username:this.username,
      password:this.password
    }
  }

  if(this.username && this.otpValue){
    this.requetData={
      username:this.username,
      otp:this.otpValue
    }
  }
 
  console.log(this.requetData);
  
  this.authService.login(this.requetData).subscribe({
    next: (res:any) => {
      if (res.status === 200) {

        localStorage.setItem('token', res.data.token ?? '');
        localStorage.setItem('usertype', res.data.user_type?? '');
        if(res.data.user_type==='company'){
          this.router.navigate(['/admin'])
        }
        else if(res.data.user_type==='public'){
          this.router.navigate(['/user'])
        }
         else if(res.data.user_type==='notetech'){
          this.router.navigate(['/superadmin'])
        }
        else{
          this.router.navigate(['']);
        }
        console.log('Login Success:', res.status);
        
      } 
      else {
        console.warn('Login Failed:', res.message);
        this.messageService.add({
          key: 'bottomCenterToast', 
          severity: 'error',
          summary: 'Invalid Credentials',
          detail: res.message,
          life: 3000,
        });
      }
    },
    error: (err) => {
      console.error('Unexpected error:', err);
    }
  });
  
}

toggleLoginForm(){
  this.loginFormVisible=!this.loginFormVisible;
  this.username='';
}

onSendOtp(){
  if(this.username){
    this.isEmailFormVisible=false;
  }
}
startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.resendOtpClicks === 3 && this.timeLeft === 0) {
      this.isForgotVisible = false;  
    }
      } else {
        this.isOtpDisabled = true;  // Disable OTP input and button when the timer is up
        clearInterval(this.timerInterval);  // Stop the timer
      }
    }, 1000);  // Update every second
  }
onCreateAccount(){
  this.isSuggestionVisible=true;
  this.isloginVisible=false;
}

onRegisterAsUser(){
  this.isloginVisible=false;
  this.isRegisterVisible=true;
  this.isSuggestionVisible=false;
  this.userForm.reset();
}

onRegisterAsBusiness(){
  this.isloginVisible=false;
  this.isRegisterVisible=true;
  this.isSuggestionVisible=false;
  this.userForm.reset();
}

onAlreadyHaveAccount(){
  this.isloginVisible=true;
  this.isRegisterVisible=false;
  this.userForm.reset();
}


loadLocations(){
  this.countries=this.locationService.getCountries();
  this.divisionOnes=this.locationService.getdivisionOne();
  this.divisionTwos=this.locationService.getdivisionTwo();
  this.divisionThrees=this.locationService.getdivisionThree();
}

onCountryChange(event: Event) {
  const countryId = (event.target as HTMLSelectElement).value;
  this.selectedCountry =
    this.countries.find((c) => c.id_t2_1_country === countryId) || null;
  const countryName = this.selectedCountry?.t2_1_country_name;

  // Reset
  this.userForm.patchValue({ div1: '', div2: '', div3: '' });
  this.div2Options = [];
  this.div3Options = [];

  // Labels
  this.div1Label = this.selectedCountry?.t2_1_div1_called || 'Division 1';
  this.div2Label = this.selectedCountry?.t2_1_div2_called || 'Division 2';
  this.div3Label = this.selectedCountry?.t2_1_div3_called || 'Division 3';

  // Load div1 options
  this.div1Options = this.divisionOnes
    .filter((d) => d.t2_1_country_name === countryName)
    .map((d) => d.t2_1_div1_name);
}

onDiv1Change(event: Event) {
  const div1 = (event.target as HTMLSelectElement).value;

  const countryName = this.selectedCountry?.t2_1_country_name;
  this.userForm.patchValue({ div2: '', div3: '' });
  this.div3Options = [];

  this.div2Options = this.divisionTwos
    .filter(
      (d) => d.t2_1_country_name === countryName && d.t2_1_div1_name === div1
    )
    .map((d) => d.t2_1_div2_name);
}

onDiv2Change(event: Event) {
  const div2 = (event.target as HTMLSelectElement).value;
  const countryName = this.selectedCountry?.t2_1_country_name;
  const div1 = this.userForm.get('div1')?.value;

  this.userForm.patchValue({ div3: '' });

  this.div3Options = this.divisionThrees
    .filter(
      (d) =>
        d.t2_1_country_name === countryName &&
        d.t2_1_div1_name === div1 &&
        d.t2_1_div2_name === div2
    )
    .map((d) => d.t2_1_div3_name);
}


onRegister(){
  if(this.userForm.valid){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registeration Success',life: 3000 });
    this.userForm.reset();
    this.isRegisterVisible=false;
  }
  else{
    this.userForm.markAllAsTouched();
  }
}


//---------------------------------------- Forgot Password-----------------------------------



onForgotPassword() {
  this.isForgotVisible = true;
  this.usernameFormVisible = true;
  this.isloginVisible = false;
}

onSendForgotOtp() {
    this.loading = true;  
    this.timeLeft = 60; // Reset timer
    this.resendOtpClicks++;

    if (this.username) {
      this.authService.forgortPassword(this.username).subscribe({
        next: (res: any) => { 
          console.log(res);
          
          if (res.status == 200) {
              this.loading = false;
            this.startTimer();
            this.isOtpFormVisible = true;
            this.usernameFormVisible = false;
            this.forgotOtpValue = '';
            this.encryptedOtp = res.data.encryptedOtp;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
              life: 2000,
            });
          }
        }
    });
  }
}



onVerifyOtp() {
  if (this.encryptedOtp) {
    const data = {
      otp: this.forgotOtpValue,
      encrypted_data: this.encryptedOtp
    };

    this.authService.verifyOtp(data).subscribe({
      next: (res: any) => {
        console.log(res);
        
        if (res.status == 200) {
          this.usernameFormVisible = false;
          this.isOtpFormVisible = false;
          this.userData = res.data.userData;

        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
            life: 2000,
          });
        }
      }
    });
  }
}


onResetPassword() {
  if (this.newPassword && this.confirmPassword) {
    if (this.newPassword === this.confirmPassword) {
      this.isForgotVisible = false;
      this.isOtpFormVisible = false;
      console.log(this.userData);
      
      const data = {
     
        user_deatils: this.userData,
        password: this.confirmPassword,
      }
      this.authService.resetPassword(data).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.isloginVisible = true;
            this.username = '';
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
              life: 3000,
            });
          }
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords do not match',
        life: 3000,
      });
    }
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please fill in all fields',
      life: 3000,
    });
  }
}

// --------------------------- Google SignIn ---------------------------

user = {
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: ''
  };

 googleInit(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Once the script is loaded, initialize Google Sign-In
      window.google.accounts.id.initialize({
        client_id: '1058839439916-ish868v28g5j4fa0jilg5qf4hdbqm7v2.apps.googleusercontent.com', // Replace with your Google Client ID
        callback: this.handleCredentialResponse.bind(this), // Use bind to maintain context
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInBtn'), 
        {
          class: 'g_id_signin',
          theme: 'outline',
          size: 'large',
          shape: 'rectangular',
          text: 'sign_in_with',
          logo_alignment: 'left'
        }
      );
    };
    document.head.appendChild(script);
  }

  // Handle response from Google after sign-in
  handleCredentialResponse(response: any): void {
    const credential = response.credential;

    try {
      const user = this.jwtHelper.decodeToken(credential);  // Decode JWT token
      this.user.firstName = user.given_name;
      this.user.lastName = user.family_name;
      this.user.email = user.email;
      this.user.photoUrl = user.picture;

      console.log('User Info:', this.user);
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  }

  signInWithGoogle(): void {
    window.google.accounts.id.prompt();  // Trigger Google sign-in prompt
  }
  
}
