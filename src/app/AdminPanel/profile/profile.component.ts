import { Component } from '@angular/core';
import { LocationService } from '../../Services/LocationService/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as QRCode from 'qrcode';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  company :any;
  // addPopupVisible:boolean=false;
  companyForm! : FormGroup;
  
  isedit:boolean=false;
  qrCodeDataUrl: string = '';
  qrCodeVisible:boolean=false;

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
    this.loadCompany();       
    this.loadLocations();      
    this.initializeForm();     
  
    // Delay to ensure dropdown data (countries, divisions) are available before patching
    setTimeout(() => {
      this.companyForm.patchValue(this.company);
      this.companyForm.disable();
  
      this.selectedCountry = this.countries.find(
        c => c.id_t2_1_country === this.company.id_t2_1_country
      );
  
      // Load dropdown options based on existing company data
      this.onCountryChange({ target: { value: this.company.id_t2_1_country } } as any);
      this.onDiv1Change({ target: { value: this.company.id_t2_1_div1 } } as any);
      this.onDiv2Change({ target: { value: this.company.id_t2_1_div2 } } as any);
  
      this.generateQRCode(this.company.t1_company_id);
    }, 0);
  }
  


initializeForm() {
  this.companyForm = this.fb.group({
    t1_company_id: ['', Validators.required],
    t1_company_name: ['', Validators.required],
    id_company_type: ['', Validators.required],
    company_type: ['', Validators.required],
    company_logo: [''],
    t2_address_1: ['', Validators.required],
    t2_address_2: [''],
    t2_mobile_no: ['', Validators.required],
    t2_phone_no: ['', Validators.required],
    t2_email: ['', [Validators.required, Validators.email]],
    t2_1_local_id: [''],
    t2_1_local_name: ['', Validators.required],
    id_t2_1_country: ['', Validators.required],
    id_t2_1_div1: ['', Validators.required],
    id_t2_1_div2: ['', Validators.required],
    id_t2_1_div3: ['', Validators.required],
    zip: ['', Validators.required],
  });
}

loadCompany() {
  this.company = {
    t1_company_id: 'COMPANY001',
    t1_company_name: 'Gourmet Foods Inc.',
    id_company_type: 'CT001',
    company_type: 'Hospitality',
    company_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESsGm92deQDTJR9fiWcHZ8S94NCmFLSkkQg&s',
    t2_address_1: '123 Main Street',
    t2_address_2: 'Suite 400',
    t2_mobile_no: '+1234567890',
    t2_phone_no: '+0987654321',
    t2_email: 'downtown@restaurant.com',
    t2_1_local_id: 'LOC001',
    t2_1_local_name: 'Downtown City',
    id_t2_1_country: "3",
    id_t2_1_div1: "Ontario",
    id_t2_1_div2: "Toronto",
    id_t2_1_div3: "Scarborough",
    zip: '90001',
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

  const currentDiv1 = this.companyForm.get('id_t2_1_div1')?.value;
  if (!this.div1Options.includes(currentDiv1)) {
    this.companyForm.patchValue({ id_t2_1_div1: '', id_t2_1_div2: '', id_t2_1_div3: '' });
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

  const currentDiv2 = this.companyForm.get('id_t2_1_div2')?.value;
  if (!this.div2Options.includes(currentDiv2)) {
    this.companyForm.patchValue({ id_t2_1_div2: '', id_t2_1_div3: '' });
    this.div3Options = [];
  } else {
    this.onDiv2Change({ target: { value: currentDiv2 } } as any);
  }
}



onDiv2Change(event: Event) {
  const div2 = (event.target as HTMLSelectElement).value;
  const div1 = this.companyForm.get('id_t2_1_div1')?.value;
  const countryName = this.selectedCountry?.t2_1_country_name;

  this.div3Options = this.divisionThrees
    .filter(d =>
      d.t2_1_country_name === countryName &&
      d.t2_1_div1_name === div1 &&
      d.t2_1_div2_name === div2
    )
    .map(d => d.t2_1_div3_name);

  const currentDiv3 = this.companyForm.get('id_t2_1_div3')?.value;
  if (!this.div3Options.includes(currentDiv3)) {
    this.companyForm.patchValue({ id_t2_1_div3: '' });
  }
}




enableEdit() {
  this.isedit = true;
  this.companyForm.enable();
}

cancelEdit() {
  this.isedit = false;
  // this.companyForm.patchValue(this.company);  
  this.companyForm.disable();
  this.selectedCountry = this.countries.find(
    c => c.id_t2_1_country === this.company.id_t2_1_country
  );
}



saveChanges() {
  if (this.companyForm.valid) {
    this.company = this.companyForm.value;
    this.isedit = false;
    this.companyForm.disable();

    // Re-assign selectedCountry
    this.selectedCountry = this.countries.find(
      c => c.id_t2_1_country === this.company.id_t2_1_country
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
        d.t2_1_div1_name === this.company.id_t2_1_div1
      )
      .map(d => d.t2_1_div2_name);

    this.div3Options = this.divisionThrees
      .filter(d =>
        d.t2_1_country_name === countryName &&
        d.t2_1_div1_name === this.company.id_t2_1_div1 &&
        d.t2_1_div2_name === this.company.id_t2_1_div2
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


 generateQRCode(id: any) {
      console.log(id);
      this.qrCodeDataUrl='';
      QRCode.toDataURL(id, { errorCorrectionLevel: 'M', width: 500 }, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        this.qrCodeDataUrl = url;
        this.qrCodeVisible = true; // ✅ Move this inside the callback
      });
    }

    downloadQRCode() {
      const link = document.createElement('a');
      link.href = this.qrCodeDataUrl;
      link.download = 'CompanyQr.png'; // or `${id}-qr.png` if dynamic
      link.click();
    }


    // onLogoSelected(event: Event): void {
    //   const input = event.target as HTMLInputElement;
    //   if (input.files && input.files[0]) {
    //     const file = input.files[0];
    //     const reader = new FileReader();
    
    //     reader.onload = () => {
    //       const base64 = reader.result as string;
    //       // Update both the form and company model
    //       this.companyForm.patchValue({ company_logo: base64 });
    //       this.company.company_logo = base64;
    //     };
    
    //     reader.readAsDataURL(file); // Convert file to base64
    //   }
    // }
    
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
        this.companyForm.patchValue({ company_logo: this.previewLogo });
        this.company.company_logo = this.previewLogo;
        this.previewLogo = null; // Clear preview
      }
      this.logoedit=true;
    }
    
    cancelImageUpdate(): void {
      this.previewLogo = null;
      this.logoedit=true;
    }
    
}
