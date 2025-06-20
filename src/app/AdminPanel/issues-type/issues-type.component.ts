import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IssueService } from '../../Services/IssueSevice/issue.service';

@Component({
  selector: 'app-issues-type',
  templateUrl: './issues-type.component.html',
  styleUrl: './issues-type.component.css'
})
export class IssuesTypeComponent {
  issuetypes : any[] = []; 
  first: number = 0;
  rows: number = 10;
  form!: FormGroup;
  isEdit: boolean = false;
  issuetype:any;
  issueTypeForm!: FormGroup;
  addPopupVisible:boolean=false;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private issueService: IssueService,
    private router:Router
  ) {}

  ngOnInit(){
    this.loadIssueTypes();
    this.form = this.fb.group({
       issue_name: ['', Validators.required],
      media_type_photo: ['n'],
      media_type_video: ['n'],
      photorequirement: [''],
      photo_max_size: [1],
      photo_max_numbers: [1, [Validators.max(4)]],
      videorequirement: [''],
      video_max_size: [1],
      video_max_numbers: [1]
    });
    
  }
// get-all
  loadIssueTypes() {
    this.issuetypes=this.issueService.getIssueTypeByCompanyId("COMPANY001");
    console.log(this.issuetypes);
    
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
    return this.issuetypes ? this.first + this.rows >= this.issuetypes.length : true;
  }

  isFirstPage(): boolean {
    return this.issuetypes ? this.first === 0 : true;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
// Edit-issue-type
editIssueType(issuetype?: any) {
  this.issueService.setEditingIssue(issuetype); 
  this.router.navigate(['/admin/add-issuetype']);
  }
  ViewIssueType(id:any){
    this.addPopupVisible=true;
    this.issuetype=this.issueService.getIssueTypeById(id);
    console.log(this.issuetypes);
  }
  //add-issue-type

  addIssueType(): void {
    this.router.navigate(['/admin/add-issuetype'], { queryParams: { mode: 'add' } });
  }
  // remove-issue-type
  deleteIssueType(event: Event, issuetype: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.issuetypes = this.issuetypes.filter(item => item.t9_issue_type_id !== issuetype.t9_issue_type_id);
        this.issueService.removeIssueType(issuetype.t9_issue_type_id);
  
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
          life: 3000
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000
        });
      }
    });
  }
  
// onPhotoToggle(event: any): void {
//   const isChecked = event.target.checked;
//   this.isPhotoDisabled = !isChecked;
//   this.issueTypeForm.patchValue({
//     media_type_photo: isChecked ? 'y' : 'n',
//     photorequirement: '',
//     photo_max_size: 1,
//     photo_max_numbers: 1
//   });
//   if (!isChecked) this.selectedPhotoTypes = [];
// }

// onVideoToggle(event: any): void {
//   const isChecked = event.target.checked;
//   this.isVideoDisabled = !isChecked;
//   this.issueTypeForm.patchValue({
//     media_type_video: isChecked ? 'y' : 'n',
//     videorequirement: '',
//     video_max_size: 1,
//     video_max_numbers: 1
//   });
//   if (!isChecked) this.selectedVideoTypes = [];
// }

// onPhotoTypeSelect(event: any): void {
//   this.selectedPhotoTypes = [...event.target.selectedOptions].map((opt: any) => opt.value);
// }

// onVideoTypeSelect(event: any): void {
//   this.selectedVideoTypes = [...event.target.selectedOptions].map((opt: any) => opt.value);
// }

// removePhotoType(type: string): void {
//   this.selectedPhotoTypes = this.selectedPhotoTypes.filter(item => item !== type);
// }

// removeVideoType(type: string): void {
//   this.selectedVideoTypes = this.selectedVideoTypes.filter(item => item !== type);
// }

}
