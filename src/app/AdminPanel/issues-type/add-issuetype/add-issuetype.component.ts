import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import Swal from 'sweetalert2';
import { IssueService } from '../../../Services/IssueSevice/issue.service';

export interface PhotoVideoOfModel {
  photo_video_of: string;
  t12_description:string;
}

export interface MediaRequirementModel {
  media_type: 'photo' | 'video';
  is_mandatory: 'yes' | 'no';
  max: number;
  max_size_mb: number;
  sysIssueTypePhotoVideoRequiredDtoModels: PhotoVideoOfModel[];
}

export interface Issue {
  t1_company_id:string;
  t9_issue_type_id?:string;
  issue_name: string;
  sysIssueTypeMediaRequirementDTOModels: MediaRequirementModel[];
}


@Component({
  selector: 'app-add-issuetype',
  templateUrl: './add-issuetype.component.html',
  styleUrl: './add-issuetype.component.css'
})
export class AddIssuetypeComponent {
  

  photoType: string = '';
  addPopupVisible:boolean=false;
  addPopupphotoVisible:boolean=false;
  form!: FormGroup;
  isEdit: boolean = false;
  issueTypeForm!:FormGroup;
  isPhotoDisabled:boolean=true;
  isVideoDisabled:boolean=true;
  selectedPhotoTypesId: number[] = [];
  selectedVideoTypesId: number[] = [];
  mediaRequirements: any[] = [];
  editingIssueId: string | null = null;
  photoTypeList = [
    { id_12_issue_type_photo_video_of: 1, t12_description: 'Bill' },
    { id_12_issue_type_photo_video_of: 2, t12_description: 'Evidence' },
    { id_12_issue_type_photo_video_of: 3, t12_description: 'Selfie' }
  ];
  
  videoTypeList = [
    { id_12_issue_type_photo_video_of: 1, t12_description: 'Presentation' },
    { id_12_issue_type_photo_video_of: 2, t12_description: 'Demo' },
    { id_12_issue_type_photo_video_of: 3, t12_description: 'Tutorial' }
  ];
  
  constructor(   
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router:Router,
        private fb: FormBuilder,
        private issueService: IssueService,
        private route:ActivatedRoute
      
      ){

  }
  ngOnInit(): void {
    this.initalizeform(); 
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];
      if (mode === 'add') {
        this.clearForm();
      } else {
        this.loadData();  
      }
    });
  }
  clearForm(): void {
    this.issueTypeForm.reset({
      issue_name: '',
      media_type_photo: '',
      photorequirement: '',
      photo_max_size: '',
      photo_max_numbers: '',
      media_type_video: '',
      videorequirement: '',
      video_max_size: '',
      video_max_numbers: ''
    });
  
    this.selectedPhotoTypes = [];
    this.selectedPhotoTypesId = [];
    this.selectedVideoTypes = [];
    this.selectedVideoTypesId = [];
  
    this.isPhotoDisabled = true;
    this.isVideoDisabled = true;
  
    this.editingIssueId = null;
    this.issueService.clearEditingIssue();
  }
  
  initalizeform(){
    this.issueTypeForm = this.fb.group({
      t1_company_id: 'COMPANY001',
      issue_name: ['', [Validators.required]],
      media_type_photo: [''],
      media_type_video: [''],
      photorequirement:[''],
      photo_max_size:[''],
      photo_max_numbers:['',[Validators.max(4)]],
      photoType:[''],
      video_max_size:[''],
      video_max_numbers:[''],
      videoType:[''],
      videorequirement:[''],
      t9_3_description:['']
    });
    this.form = this.fb.group({
      type: ['', [Validators.required]],
    
    });
  }
  
loadData() {
  const editingData = this.issueService.getEditingIssue();
  if (editingData) {
    this.isEdit = true;
    this.editingIssueId = editingData.t9_issue_type_id;
    this.issueTypeForm.patchValue({
      issue_name: editingData.t9_issue_name
    });

    (editingData.media_requirement || []).forEach((media: any) => {
      const mediaType = media.t9_1_media_type;

      if (mediaType === 'photo' || mediaType === 'image') {
        this.issueTypeForm.patchValue({
          media_type_photo: 'y',
          photorequirement: media.t9_1_is_mandatory ? 'mandatory' : 'optional',
          photo_max_size: media.t9_1_max_size_mb,
          photo_max_numbers: media.t9_1_max
        });

        this.isPhotoDisabled = false;

        // ✅ Fix: Populate selectedPhotoTypesId AND photoTypeList
        this.selectedPhotoTypesId = media.photo_video_requirement.map((p: any) =>
          +p.id_t9_3_issue_type_photo_video_of
        );
        this.selectedPhotoTypes = media.photo_video_requirement.map((p: any) =>
          p.t9_3_description
        );
       media.photo_video_requirement.forEach((p: any) => {
      const id = +p.id_t9_3_issue_type_photo_video_of;
      const desc = p.t9_3_description;

      const alreadyExists = this.photoTypeList.some(
        item => item.id_12_issue_type_photo_video_of === id
      );

        if (!alreadyExists) {
          this.photoTypeList.push({
            id_12_issue_type_photo_video_of: id,
            t12_description: desc
          });
        }
     });
        }

      if (mediaType === 'video') {
        this.issueTypeForm.patchValue({
          media_type_video: 'y',
          videorequirement: media.t9_1_is_mandatory ? 'mandatory' : 'optional',
          video_max_size: media.t9_1_max_size_mb,
          video_max_numbers: media.t9_1_max
        });

        this.isVideoDisabled = false;

        this.selectedVideoTypesId = media.photo_video_requirement.map((p: any) =>
          +p.id_t9_3_issue_type_photo_video_of
        );
        this.selectedVideoTypes = media.photo_video_requirement.map((p: any) =>
          p.t9_3_description
        );
        media.photo_video_requirement.forEach((p: any) => {
        const id = +p.id_t9_3_issue_type_photo_video_of;
        const desc = p.t9_3_description;

        const alreadyExists = this.videoTypeList.some(
          item => item.id_12_issue_type_photo_video_of === id
        );

        if (!alreadyExists) {
          this.videoTypeList.push({
            id_12_issue_type_photo_video_of: id,
            t12_description: desc
          });
        }
      });

      }
    });
  }
}

 
  


  onPhotoToggle(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const value = isChecked ? 'y' : 'n';
    this.issueTypeForm.get('media_type_photo')?.setValue(value);
    this.isPhotoDisabled = value === 'n';
  }
  onVideoToggle(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const value = isChecked ? 'y' : 'n';
    this.issueTypeForm.get('media_type_video')?.setValue(value);
    this.isVideoDisabled = value === 'n';
  }

  submit(): void {
    const formValues = this.issueTypeForm.value;
    console.log(formValues);
    
    const mediaRequirements: MediaRequirementModel[] = [];
  
  if (formValues.media_type_photo === 'y') {
  mediaRequirements.push({
    media_type: 'photo',
    is_mandatory: formValues.photorequirement,
    max: formValues.photo_max_numbers,
    max_size_mb: formValues.photo_max_size,
    sysIssueTypePhotoVideoRequiredDtoModels: this.selectedPhotoTypesId.map((id: number) => {
     const matched = this.photoTypeList.find(p => +p.id_12_issue_type_photo_video_of === +id);
      return {
        photo_video_of: id.toString(),
        t12_description: matched?.t12_description || ''
      };
    })
  });
}

if (formValues.media_type_video === 'y') {
  mediaRequirements.push({
    media_type: 'video',
    is_mandatory: formValues.videorequirement,
    max: formValues.video_max_numbers,
    max_size_mb: formValues.video_max_size,
    sysIssueTypePhotoVideoRequiredDtoModels: this.selectedVideoTypesId.map((id: number) => {
      const matched = this.videoTypeList.find(v => v.id_12_issue_type_photo_video_of === id);
      return {
        photo_video_of: id.toString(),
        t12_description: matched?.t12_description || ''
      };
    })
  });
}

  
    const data: Issue = {
      t1_company_id: formValues.t1_company_id,
      issue_name: formValues.issue_name,
      sysIssueTypeMediaRequirementDTOModels: mediaRequirements
    };
  console.log(data);
  
  if (this.editingIssueId) {
    data.t9_issue_type_id = this.editingIssueId;
  
    this.issueService.updateIssueType(data).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Issue type updated' });
        this.issueService.clearEditingIssue();
        this.router.navigate(['/admin/issue-type']);
      },
      error: (err:any) => {
        console.error('Update failed:', err);
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Failed to update issue type' });
      }
    });
  
  } else {
    this.issueService.addIssueType(data).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Issue type added' });
        this.issueService.clearEditingIssue();
        this.router.navigate(['/admin/issue-type']);
      },
      error: (err:any) => {
        console.error('Add failed:', err);
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Failed to add issue type' });
      }
    });
  }
  
  }
  
  

  onSubmit(){
    setTimeout(() => {
      Swal.fire({
        title: "Do you want to add another issue type?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Add another",
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          this.router.navigate(['/company/sys-issuetype']);
        }
      });
    }, 2000);
  }


  // =================Multiselect


  selectedPhotoTypes: string[] = [];
  selectedVideoTypes: string[] = [];


  // Handle checkbox change
onPhotoTypeChange(event: any, type: any) {
  const id = Number(type.id_12_issue_type_photo_video_of);
  const name = type.t12_description;

  if (event.target.checked) {
    if (!this.selectedPhotoTypesId.includes(id)) {
      this.selectedPhotoTypesId.push(id);
      this.selectedPhotoTypes.push(name);
    }
  } else {
    this.selectedPhotoTypesId = this.selectedPhotoTypesId.filter(i => i !== id);
    this.selectedPhotoTypes = this.selectedPhotoTypes.filter(n => n !== name);
  }
}


  

  // Select All
  selectAll() {
    this.selectedPhotoTypes = this.photoTypeList.map(type => type.t12_description);
    this.selectedPhotoTypesId = this.photoTypeList.map(type => type.id_12_issue_type_photo_video_of);
  }  

  // Clear All
  clearAll() {
    this.selectedPhotoTypes = [];
    this.selectedPhotoTypesId=[];
  }

onVideoTypeChange(event: any, type: any) {
  const id = type.id_12_issue_type_photo_video_of;
  const name = type.t12_description;

  if (event.target.checked) {
    if (!this.selectedVideoTypesId.includes(id)) {
      this.selectedVideoTypes.push(name);
      this.selectedVideoTypesId.push(id);
    }
  } else {
    this.selectedVideoTypes = this.selectedVideoTypes.filter(item => item !== name);
    this.selectedVideoTypesId = this.selectedVideoTypesId.filter(item => item !== id);
  }
}

  // Select All
  selectAllVideo() {
    this.selectedVideoTypes = this.videoTypeList.map(type => type.t12_description);
    this.selectedVideoTypesId = this.videoTypeList.map(type => type.id_12_issue_type_photo_video_of);
  }

  // Clear All
  clearAllVideo() {
    this.selectedVideoTypes = [];
    this.selectedVideoTypesId = [];
  }
  // Add custom Type
  addVideoPopup() {
    console.log("working");
    
    this.addPopupVisible = true;
  }
  addPhotoPopup() {
    console.log("working");
    
    this.addPopupphotoVisible = true;
  }
   
  onPhotoSubmit() {
    const newType = this.form.get('type')?.value?.trim();
    if (!newType) return;

    const exists = this.photoTypeList.some(
      (type) => type.t12_description.toLowerCase() === newType.toLowerCase()
    );
    if (exists) {
      alert('This photo type already exists.');
      return;
    }

    const newId =   
      this.photoTypeList.length > 0
        ? Math.max(...this.photoTypeList.map((t) => t.id_12_issue_type_photo_video_of)) + 1
        : 1;

    const newEntry = {
      id_12_issue_type_photo_video_of: newId,
      t12_description: newType
    };

    this.photoTypeList.push(newEntry);
    this.selectedPhotoTypes.push(newType);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Video Type Added Successfully' });
    this.form.reset();
    this.addPopupphotoVisible = false;
  }
  onVideoSubmit() {
    const newType = this.form.get('type')?.value.trim();
    this.form.reset();
  
    if (!newType) return;
  
    const exists = this.videoTypeList.some(
      type => type.t12_description.toLowerCase() === newType.toLowerCase()
    );
    
    if (exists) {
      alert('This video type already exists.');
      return;
    }
  
    const newId = Math.max(...this.videoTypeList.map(t => t.id_12_issue_type_photo_video_of)) + 1;
  
    const newEntry = {
      id_12_issue_type_photo_video_of: newId,
      t12_description: newType
    };
  
    this.videoTypeList.push(newEntry);
    this.selectedVideoTypes.push(newType);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Video Type Added Successfully' });
    this.addPopupVisible = false;
  }
removePhotoType(tag: string) {
  const index = this.selectedPhotoTypes.indexOf(tag);
  if (index !== -1) {
    this.selectedPhotoTypes.splice(index, 1);
    const idToRemove = this.photoTypeList.find(p => p.t12_description === tag)?.id_12_issue_type_photo_video_of;
    if (idToRemove !== undefined) {
      this.selectedPhotoTypesId = this.selectedPhotoTypesId.filter(id => id !== idToRemove);
    }
  }
}

removeVideoType(tag: string) {
  const removed = this.videoTypeList.find(t => t.t12_description === tag);
  if (removed) {
    this.selectedVideoTypes = this.selectedVideoTypes.filter(t => t !== tag);
    this.selectedVideoTypesId = this.selectedVideoTypesId.filter(id => id !== removed.id_12_issue_type_photo_video_of);
  }
}
  onReset() {
    this.issueTypeForm.reset({
      issue_name: '',
      media_type_photo: '',
      photorequirement: '',
      photo_max_size: '',
      photo_max_numbers: '',
      media_type_video: '',
      videorequirement: '',
      video_max_size: '',
      video_max_numbers: ''
    });
  
    this.selectedPhotoTypes = [];
    this.selectedPhotoTypesId = [];
    this.selectedVideoTypes = [];
    this.selectedVideoTypesId = [];
    this.isPhotoDisabled = true;
    this.isVideoDisabled = true;
  }
  
}
