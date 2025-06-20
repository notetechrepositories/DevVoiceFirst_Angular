import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SectionService } from '../../Services/SectionService/section.service';
import { ActivatedRoute } from '@angular/router';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css',
})
export class SectionComponent {
  first: number = 0;
  rows: number = 10;
  loading: boolean = true;

  sections: any[] = [];
  sectionType: any[] = [];
  branchDetails: any;
  companyDetails: any;
  sectionId: string = '';
  addPopupVisible: boolean = false;
  sectionForm!: FormGroup;
  isEdit: boolean = false;
  editingIndex: number | null = null;
  searchKeyword: string = '';

  branchId:any;
  qrCodeDataUrl: string = '';
  qrCodeVisible:boolean=false;

  @ViewChild('dt2') dt2!: Table;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private sectionService: SectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    
    this.sectionForm = this.fb.group({
      t3_section_name: [''],
      t2_section_type_id: [''],
    });

    this.branchId = this.route.snapshot.paramMap.get('id');
    if (this.branchId) {
      this.loadSections();
    }
    

  }

  onGlobalFilter(value: string) {
    this.dt2.filterGlobal(value, 'contains');
  }

  loadSections() {
    this.sections = this.sectionService.getSectionsByBranchId(this.branchId);
    this.branchDetails=this.sections[0].branch_details;
    this.companyDetails=this.sections[0].company_details;
    console.log(this.branchDetails);
    console.log(this.companyDetails);
    
    
    this.sectionType = this.sectionService.getSectionType();
    this.loading = false;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.sections
      ? this.first + this.rows >= this.sections.length
      : true;
  }

  isFirstPage(): boolean {
    return this.sections ? this.first === 0 : true;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  showDialog(section?: any) {
    console.log(section);
    this.addPopupVisible = true;
    if (section) {
      this.isEdit = true;
      this.editingIndex = this.sections.findIndex(
        (r) => r.t3_branch_section_id === section.t3_branch_section_id
      );
      this.sectionForm.patchValue(section);
    } else {
      this.isEdit = false;
      this.sectionForm.reset();
    }
  }

  onSubmit() {
    const data = this.sectionForm.value;
    const sectiontype = this.sectionType.find(
      (item) => item.t2_section_type_id === data.t2_section_type_id
    )?.t2_section_type;
    const sectionData = {
      t3_section_name: data.t3_section_name,
      t3_branch_section_id: this.generateBranchId(),
      t2_section_type_id: data.t2_section_type_id,
      t2_section_type: sectiontype,
      branch_details: this.branchDetails,
      company_details: this.companyDetails,
    };

    console.log(sectionData);
    if (this.isEdit && this.editingIndex !== null) {
      this.sections[this.editingIndex] = {
        ...this.sections[this.editingIndex],
        ...data
      };
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Updated Succesfully',
      });
    } else {
      this.sections.push(sectionData)
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Added Succesfully',
      });
    }
    this.addPopupVisible = false;
  }

  delete(event: Event, sectionToDelete: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.sections = this.sections.filter(section => section !== sectionToDelete);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
          life: 3000,
        });
      },
      reject: () => {},
    });
  }

  generateBranchId(): string {
    const prefix = 'BRANCH';
    const randomNumber = Math.floor(Math.random() * 1000); // 0–999
    const paddedNumber = randomNumber.toString().padStart(3, '0');
    return `${prefix}${paddedNumber}`;
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
      link.download = 'section-qr.png'; // or `${id}-qr.png` if dynamic
      link.click();
    }
}
