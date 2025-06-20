import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LocationService } from '../../Services/LocationService/location.service';
import { BranchService } from '../../Services/BranchService/branch.service';
import * as QRCode from 'qrcode';

// export interface Branch {
//   id: number;
//   branchName: string;
//   email: string;
//   branchType: string;
//   phone: string;
//   address: string;
//   address2?: string;
//   country: string;
//   state: string;
//   district: string;
//   city: string;
//   id_t2_1_country: number;
//   zip: string;
// }

export interface Country {
  id_t2_1_country: string;
  t2_1_country_name: string;
  t2_1_div1_called: string;
  t2_1_div2_called: string;
  t2_1_div3_called: string;
}

export interface DivisionImport {
  t2_1_country_name: string;
  t2_1_div1_name: string;
}
export interface DivisiontwoImport {
  t2_1_country_name: string;
  t2_1_div1_name: string;
  t2_1_div2_name: string;
}
export interface DivisionthreeImport {
  t2_1_country_name: string;
  t2_1_div1_name: string;
  t2_1_div2_name: string;
  t2_1_div3_name: string;
}

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css',
})
export class BranchComponent {
  branches: any[] = [];
  first = 0;
  rows = 10;
  addPopupVisible = false;
  qrCodeVisible = false;
  form!: FormGroup;
  isEdit = false;

  branchTypes = [
    { label: 'Head Office', value: 'head' },
    { label: 'Regional', value: 'regional' },
    { label: 'Local', value: 'local' },
  ];

  countries: any[] = [];

  divisionOnes: any[] = [];

  divisionTwos: any[] = [];

  divisionThrees: any[] = [];

  selectedCountry: Country | null = null;

  div1Options: string[] = [];
  div2Options: string[] = [];
  div3Options: string[] = [];

  div1Label = 'Division 1';
  div2Label = 'Division 2';
  div3Label = 'Division 3';

  qrCodeDataUrl: string = '';


  @ViewChild('dt2') dt2!: Table;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private locationService: LocationService,
    private branchService: BranchService
  ) {}

  ngOnInit() {
    this.loadBranches();
    this.loadLocations();
    this.form = this.fb.group({
      id: [''],
      t2_company_branch_name: ['', Validators.required],
      branchType: ['', Validators.required],
      t2_email: ['', [Validators.required, Validators.email]],
      t2_phone_no: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      id_t2_1_country: [''],
      country: ['', Validators.required],
      state: [''], // For division level 1
      district: [''], // For division level 2
      city: [''], // For division level 3
      zip: ['', Validators.required],
    });

    

  }

  onCountryChange(event: Event) {
    const countryId = (event.target as HTMLSelectElement).value;
    this.selectedCountry =
      this.countries.find((c) => c.id_t2_1_country === countryId) || null;
    const countryName = this.selectedCountry?.t2_1_country_name;

    // Reset
    this.form.patchValue({ div1: '', div2: '', div3: '' });
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
    this.form.patchValue({ div2: '', div3: '' });
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
    const div1 = this.form.get('div1')?.value;

    this.form.patchValue({ div3: '' });

    this.div3Options = this.divisionThrees
      .filter(
        (d) =>
          d.t2_1_country_name === countryName &&
          d.t2_1_div1_name === div1 &&
          d.t2_1_div2_name === div2
      )
      .map((d) => d.t2_1_div3_name);
  }

  loadBranches() {
    this.branches = this.branchService.getBranches();
    console.log();
    
  }

  loadLocations() {
    this.countries = this.locationService.getCountries();
    this.divisionOnes = this.locationService.getdivisionOne();
    this.divisionTwos = this.locationService.getdivisionTwo();
    this.divisionThrees = this.locationService.getdivisionThree();
  }

  onGlobalFilter(value: string) {
    this.dt2.filterGlobal(value, 'contains');
  }

  next() {
    this.first += this.rows;
  }

  prev() {
    this.first -= this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.branches
      ? this.first + this.rows >= this.branches.length
      : true;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  showDialog(branch?: any) {
    this.addPopupVisible = true;

    if (branch) {
      this.isEdit = true;
      
      this.form.patchValue(branch);
    } else {
      this.isEdit = false;
      this.form.reset();
    }
  }

  onSubmit() {
    // if (this.form.valid) {
    const formValue = this.form.value;
    console.log(formValue);

    if (this.isEdit) {
      const index = this.branches.findIndex((b) => b.id === formValue.id);
      const selectedCountry = this.countries.find(
        (c) => c.id_t2_1_country === formValue.id_t2_1_country.toString()
      );
      this.form.patchValue({
        country: selectedCountry?.t2_1_country_name,
      });
      const formData = this.form.value;
      if (index !== -1) {
        this.branches[index] = { ...formData };
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated Succesfully',
        });
      }
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Added Succesfully',
      });
      const selectedCountry = this.countries.find(
        (c) => c.id_t2_1_country === formValue.id_t2_1_country.toString()
      );

      this.form.patchValue({
        country: selectedCountry?.t2_1_country_name,
      });

      this.branches.push(this.form.value);
    }
    this.addPopupVisible = false;
    //}
  }

deleteBranch(event: Event, id: number) {
  this.confirmationService.confirm({
    target: event.currentTarget as HTMLElement, 
    message: 'Do you want to delete this record?',
    icon: 'pi pi-info-circle',
    acceptButtonStyleClass: 'p-button-danger p-button-sm',
    accept: () => {
      this.branches = this.branches.filter(branch => branch.t2_company_branch_id !== id);
      this.branches = [...this.branches]; 

      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Record deleted',
        life: 3000,
      });
    },
    reject: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'You have rejected',
        life: 3000,
      });
    }
  });
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
      this.qrCodeVisible = true;
    });
  }

  downloadQRCode() {
    const link = document.createElement('a');
    link.href = this.qrCodeDataUrl;
    link.download = 'section-qr.png'; 
    link.click();
  }
}
