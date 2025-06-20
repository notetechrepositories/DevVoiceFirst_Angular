import { Component } from '@angular/core';
import { LocationService } from '../../Services/LocationService/location.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ConfirmationService,MessageService } from 'primeng/api';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userForm! : FormGroup;

user:any;
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

  constructor (private locationservice:LocationService,private fb:FormBuilder,private messageService:MessageService,private confirmationservice:ConfirmationService){}

 
  ngOnInit(): void {
    this.loadUser();       
    this.loadLocations();      
    this.initializeForm();     
  
    // Delay to ensure dropdown data (countries, divisions) are available before patching
    setTimeout(() => {
      this.userForm.patchValue(this.user);
      this.userForm.disable();
  
      this.selectedCountry = this.countries.find(
        c => c.id_t2_1_country === this.user.id_t2_1_country
      );
  
      // Load dropdown options based on existing company data
      this.onCountryChange({ target: { value: this.user.id_t2_1_country } } as any);
      this.onDiv1Change({ target: { value: this.user.id_t2_1_div1 } } as any);
      this.onDiv2Change({ target: { value: this.user.id_t2_1_div2 } } as any);
  
      
    }, 0);
  }
  

  initializeForm() {
    this.userForm = this.fb.group({
      id_T5_users: ['', Validators.required],
      t5_first_name: ['', Validators.required],
      t5_last_name: ['', Validators.required],
      t5_address_1: ['', Validators.required],
      t5_address_2: [''],
      t5_zip_code: ['', Validators.required],
      t5_mobile_no: [''],
      t5_email: ['', [Validators.required, Validators.email]],
      t5_birth_year: ['', Validators.required],
      t5_sex: ['', [Validators.required]],
      id_t2_1_local: [''],
      t2_1_local_name: ['', Validators.required],
      id_t2_1_country: ['', Validators.required],
      id_t2_1_div1: ['', Validators.required],
      id_t2_1_div2: ['', Validators.required],
      id_t2_1_div3 : ['', Validators.required],
      status:[{value:'',disabled:true}],
      user_logo:['']
      
    });
  }

  loadUser(){
    this.user = {
      "id_T5_users": 'U001',
      "t5_first_name": 'John',
      "t5_last_name": 'Doe',
      "t5_address_1": '123 Maple Street',
      "t5_address_2": 'Apt 4B',
      "t5_mobile_no": '+1-555-123-4567',
      "t5_email": 'john.doe@example.com',
      "t5_birth_year": '1990-05-12',
      "t5_sex": 'Male',
      "id_t2_1_local": 'LOC001',
      "t2_1_local_name": 'Downtown City',
      "id_t2_1_country": '3',
      "id_t2_1_div1": 'Ontario',
      "id_t2_1_div2": 'Toronto',
      "id_t2_1_div3": 'Scarborough',
      "t5_zip_code": '62704',
      "status":'Active',
      "user_logo":'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    };
    }


  loadLocations(){
    this.countries=this.locationservice.getCountries();
    this.divisionOnes=this.locationservice.getdivisionOne();
    this.divisionTwos=this.locationservice.getdivisionTwo();
    this.divisionThrees=this.locationservice.getdivisionThree();
  }

  onCountryChange(event: Event) {
    const countryId = (event.target as HTMLSelectElement).value;
    this.selectedCountry =
      this.countries.find((c) => c.id_t2_1_country === countryId) || null;
    const countryName = this.selectedCountry?.t2_1_country_name;
  
    // Labels
    this.div1Label = this.selectedCountry?.t2_1_div1_called || 'Division 1';
    this.div2Label = this.selectedCountry?.t2_1_div2_called || 'Division 2';
    this.div3Label = this.selectedCountry?.t2_1_div3_called || 'Division 3';
  
    // Division 1
    this.div1Options = this.divisionOnes
      .filter(d => d.t2_1_country_name === countryName)
      .map(d => d.t2_1_div1_name);
  
    const currentDiv1 = this.userForm.get('id_t2_1_div1')?.value;
    if (!this.div1Options.includes(currentDiv1)) {
      this.userForm.patchValue({ id_t2_1_div1: '', id_t2_1_div2: '', id_t2_1_div3: '' });
      this.div2Options = [];
      this.div3Options = [];
    } else {
      this.onDiv1Change({ target: { value: currentDiv1 } } as any);
    }
  }
  onDiv1Change(event: Event) {
    const div1 = (event.target as HTMLSelectElement).value;
    const countryName = this.selectedCountry?.t2_1_country_name;
  
    this.div2Options = this.divisionTwos
      .filter(d => d.t2_1_country_name === countryName && d.t2_1_div1_name === div1)
      .map(d => d.t2_1_div2_name);
  
    const currentDiv2 = this.userForm.get('id_t2_1_div2')?.value;
    if (!this.div2Options.includes(currentDiv2)) {
      this.userForm.patchValue({ id_t2_1_div2: '', id_t2_1_div3: '' });
      this.div3Options = [];
    } else {
      this.onDiv2Change({ target: { value: currentDiv2 } } as any);
    }
  }

  onDiv2Change(event: Event) {
    const div2 = (event.target as HTMLSelectElement).value;
    const div1 = this.userForm.get('id_t2_1_div1')?.value;
    const countryName = this.selectedCountry?.t2_1_country_name;
  
    this.div3Options = this.divisionThrees
      .filter(d =>
        d.t2_1_country_name === countryName &&
        d.t2_1_div1_name === div1 &&
        d.t2_1_div2_name === div2
      )
      .map(d => d.t2_1_div3_name);
  
    const currentDiv3 = this.userForm.get('id_t2_1_div3')?.value;
    if (!this.div3Options.includes(currentDiv3)) {
      this.userForm.patchValue({ id_t2_1_div3: '' });
    }
  }
  
  isedit:boolean=false;

  saveChanges() {
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      this.isedit = false;
      this.userForm.disable();
  
      // Re-assign selectedCountry
      this.selectedCountry = this.countries.find(
        c => c.id_t2_1_country === this.user.id_t2_1_country
      );
  
      const countryName = this.selectedCountry?.t2_1_country_name;
  
      // Re-assign labels
      this.div1Label = this.selectedCountry?.t2_1_div1_called || 'Division 1';
      this.div2Label = this.selectedCountry?.t2_1_div2_called || 'Division 2';
      this.div3Label = this.selectedCountry?.t2_1_div3_called || 'Division 3';
  
      // Reload options
      this.div1Options = this.divisionOnes
        .filter(d => d.t2_1_country_name === countryName)
        .map(d => d.t2_1_div1_name);
  
      this.div2Options = this.divisionTwos
        .filter(d =>
          d.t2_1_country_name === countryName &&
          d.t2_1_div1_name === this.user.id_t2_1_div1
        )
        .map(d => d.t2_1_div2_name);
  
      this.div3Options = this.divisionThrees
        .filter(d =>
          d.t2_1_country_name === countryName &&
          d.t2_1_div1_name === this.user.id_t2_1_div1 &&
          d.t2_1_div2_name === this.user.id_t2_1_div2
        )
        .map(d => d.t2_1_div3_name);
  
      this.messageService.add({
        severity: 'success',
        summary: 'Profile Updated',
        detail: 'Profile updated successfully!'
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill the required fields.'
      });
    }
  }
  
  previewLogo: string | null = null;

  logoedit:boolean=true;

  onLogoSelected(event: Event): void {
   this.logoedit=false;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        this.previewLogo = reader.result as string; // Temporarily store preview
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  confirmImageUpdate(): void {
    
    if (this.previewLogo) {
      this.userForm.patchValue({ user_logo: this.previewLogo });

      this.user.user_logo = this.previewLogo;
      this.previewLogo = null; // Clear preview
    }
    this.logoedit=true;
  }
  
  cancelImageUpdate(): void {
    this.previewLogo = null;
    this.logoedit=true;
  }

  enableEdit() {
    this.isedit = true;
    this.userForm.enable();
    this.userForm.get('status')?.disable(); 
  }
  
  cancelEdit() {
    this.isedit = false; 
    this.userForm.disable();
    this.selectedCountry = this.countries.find(
      c => c.id_t2_1_country === this.user.id_t2_1_country
    );
  }
}
