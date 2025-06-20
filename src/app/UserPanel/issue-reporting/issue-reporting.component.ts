import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioService } from '../../Services/AudioService/audio.service';
import { SectionService } from '../../Services/SectionService/section.service';
import { IssueService } from '../../Services/IssueSevice/issue.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-issue-reporting',
  templateUrl: './issue-reporting.component.html',
  styleUrl: './issue-reporting.component.css',
})
export class IssueReportingComponent {
  selectedImages1: File[] = [];
  previews1: { url: string }[] = [];

  selectedImages2: File[] = [];
  previews2: { url: string }[] = [];

  selectedVideos: File[] = [];
  videoPreviews: { url: string }[] = [];

  sectionDetails: any;
  sectionId: any;

  issueText: string = '';
  selectedIssueType: any;

  issueTypes: any[] = [];

  constructor(
    private audioService: AudioService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private sectionService: SectionService,
    private issueService: IssueService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private messageService:MessageService
  ) {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false; // Only final results
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }

        this.ngZone.run(() => {
          this.finalTranscriptBuffer += finalTranscript;
        });
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        this.stopListening();
      };

      this.recognition.onend = () => {
        // On stop, append buffer to message
        this.ngZone.run(() => {
          this.message += this.finalTranscriptBuffer.trim();
          this.finalTranscriptBuffer = '';
          this.isListening = false;
        });
      };
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  }

  onFileSelected(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const filesArray = Array.from(input.files);

    if (type === 'images1') {
      if (this.selectedImages1.length + filesArray.length > 4) {
        alert('You can only upload a maximum of 4 Bill Images.');
        return;
      }

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const filePreview = { url: e.target!.result as string };
          this.selectedImages1.push(file);
          this.previews1.push(filePreview);
        };
        reader.readAsDataURL(file);
      });
    } else if (type === 'images2') {
      if (this.selectedImages2.length + filesArray.length > 2) {
        alert('You can only upload a maximum of 2 Evidence Images.');
        return;
      }

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const filePreview = { url: e.target!.result as string };
          this.selectedImages2.push(file);
          this.previews2.push(filePreview);
        };
        reader.readAsDataURL(file);
      });
    } else if (type === 'videos') {
      if (this.selectedVideos.length + filesArray.length > 4) {
        alert('You can only upload a maximum of 4 Videos.');
        return;
      }

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const filePreview = { url: e.target!.result as string };
          this.selectedVideos.push(file);
          this.videoPreviews.push(filePreview);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeFile(index: number, type: string) {
    if (type === 'images1') {
      this.selectedImages1.splice(index, 1);
      this.previews1.splice(index, 1);
    } else if (type === 'images2') {
      this.selectedImages2.splice(index, 1);
      this.previews2.splice(index, 1);
    } else if (type === 'videos') {
      this.selectedVideos.splice(index, 1);
      this.videoPreviews.splice(index, 1);
    }
  }

  isRecording: boolean = false;
  isRecordBtn: boolean = true;
  audioUrl: any = null;
  audioBlob: Blob | null = null;

  async startRecording() {
    this.isRecording = true;
    this.audioUrl = null;
    this.isRecordBtn = false;
    await this.audioService.startRecording();
  }

  async stopRecording() {
    this.isRecording = false;

    this.isRecordBtn = true;
    this.audioBlob = await this.audioService.stopRecording();

    if (this.audioBlob) {
      this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.audioBlob)
      );

      const file = new File([this.audioBlob], 'audio_recording.wav', {
        type: 'audio/wav',
      });
      // this.audioForm.patchValue({ audioFile: file });
    }
  }

  deleteRecording() {
    this.audioUrl = null;
    this.audioBlob = null;
    // this.audioForm.patchValue({ audioFile: null });
  }

  ngOnInit(): void {
    this.sectionId = this.route.snapshot.paramMap.get('id');
    if (this.sectionId) {
      this.getSectionDetails(this.sectionId);
    }
    this.getAllIssueType();
  }

  submitForm() {
    const formData = new FormData();

    formData.append('id_t2_company_branch', this.sectionId || '');
    formData.append('t11_issue_text', this.issueText || '');

    // Audio file (always append something)
    if (this.audioBlob) {
      const audioFile = new File([this.audioBlob], 'recorded_audio.wav', {
        type: 'audio/wav',
      });
      formData.append('t11_issue_voice', audioFile);
    } else {
      formData.append('t11_issue_voice', '');
    }

    // Bill Images - always append 4
    for (let i = 0; i < 4; i++) {
      if (this.selectedImages1[i]) {
        console.log(this.selectedImages1[i]);

        formData.append(`t11_issue_image${i + 1}`, this.selectedImages1[i]);
        console.log(formData);
      } else {
        formData.append(`t11_issue_image${i + 1}`, '');
      }
    }

    // Evidence Images - always append 4
    for (let i = 0; i < 2; i++) {
      if (this.selectedImages2[i]) {
        formData.append(`t11_evidence_image${i + 1}`, this.selectedImages2[i]);
      } else {
        formData.append(`t11_evidence_image${i + 1}`, '');
      }
    }

    // Videos - always append 4
    for (let i = 0; i < 4; i++) {
      if (this.selectedVideos[i]) {
        formData.append(`t11_issue_video${i + 1}`, this.selectedVideos[i]);
      } else {
        formData.append(`t11_issue_video${i + 1}`, '');
      }
    }

    console.log('--- FormData Contents ---');
    for (const pair of (formData as any).entries()) {
      console.log(`${pair[0]}:`, pair[1]);

      if (pair[1] instanceof File) {
        console.log(`  - File name: ${pair[1].name}`);
        console.log(`  - File type: ${pair[1].type}`);
        console.log(`  - File size: ${pair[1].size} bytes`);
      } else {
        console.log(`  - Value: ${pair[1]}`);
      }
    }

    if (formData) {
      console.log('Form Submitted');
    } else {
      console.log('Form not Submitted');
    }
  }

  resetForm() {
    this.issueText = '';
    this.message='';
    this.audioBlob = null;
    this.audioUrl = null;
    this.selectedImages1 = [];
    this.previews1 = [];
    this.selectedImages2 = [];
    this.previews2 = [];
    this.selectedVideos = [];
    this.videoPreviews = [];
    this.selectedIssueType="";
  }

  getSectionDetails(id: string) {
    this.sectionDetails = this.sectionService.getSectionByBranchSectionId(id);
    if (this.sectionDetails) {
      console.log('Section details:', this.sectionDetails);
    } else {
      console.log('Section not found');
    }
  }

  getAllIssueType() {
    this.issueTypes = this.issueService.getIssueType();
  }

  onChangeIssuetype(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const Id = selectElement.value;
    this.selectedIssueType = this.issueService.getIssueTypeById(Id);
    console.log(this.selectedIssueType);
  }

  selectedFiles: { [key: string]: File[] } = {};
  previews: { [key: string]: { url: string }[] } = {};

  onDynamicFileSelected(event: Event, key: string, maxFiles: number) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const filesArray = Array.from(input.files);
    if (!this.selectedFiles[key]) {
      this.selectedFiles[key] = [];
      this.previews[key] = [];
    }
    const totalSelected = this.selectedFiles[key].length + filesArray.length;

    if (totalSelected > maxFiles) {
      alert(
        `You can only upload a maximum of ${maxFiles} files for this field.`
      );
      return;
    }
    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const filePreview = { url: e.target!.result as string };
        this.selectedFiles[key].push(file);
        this.previews[key].push(filePreview);
      };
      reader.readAsDataURL(file);
    });
  }

  removeDynamicFile(index: number, key: string) {
    this.selectedFiles[key]?.splice(index, 1);
    this.previews[key]?.splice(index, 1);
  }

  message: string = '';
  isListening: boolean = false;
  recognition: any;
  finalTranscriptBuffer: string = '';

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening() {
    this.isListening = true;
    this.finalTranscriptBuffer = '';
    this.recognition.start();
  }

  stopListening() {
    this.recognition.stop();
  }

  submitIssue(){
    if(this.selectedIssueType && this.message){
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Issue Submitted', life: 3000 });
      this.resetForm();

    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Please fill required fields', life: 3000 });
    }
  }


}
