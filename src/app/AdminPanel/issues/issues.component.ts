import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Issue } from '../issues-type/add-issuetype/add-issuetype.component';
import { IssueService } from '../../Services/IssueSevice/issue.service';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  TextRun,
  ExternalHyperlink,
  AlignmentType,
  HeadingLevel
} from 'docx';

export interface MediaItem {
  media_id: string;
  issue_entry_id: string;
  media_type_id: string;
  media_type: string;
  file_path: string;
}

export interface ReporterDetails {
  first_name: string;
  last_name: string;
}

export interface ReportedIssue {
  submited_by_details: ReporterDetails;
  issue_entry_id: string;
  t9_issue_type_id: string;
  t9_issue_name: string;
  submited_date: string;
  current_status: string;
  voice_recording: string;
  issue_text: string;
  t2_company_branch_name:string,
  t3_section_name:string
  media: MediaItem[];
}
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.css'
})
export class IssuesComponent {

  issues: ReportedIssue[] = []; 
  reportedIssues: ReportedIssue[] = []; 
  first: number = 0;
  rows: number = 10;

  addPopupVisible:boolean=false;
  form!: FormGroup;
  isEdit: boolean = false;
  showFeedbackPopup: boolean = false;

  audioUrl: string = '';
  isRecordBtn: boolean = true;
  
  selectedImages1: any[] = [];
  selectedImages2: any[] = [];
  selectedVideos: any[] = [];

  previews1: any[] = [];
  previews2: any[] = [];
  videoPreviews: any[] = [];
  selectedIssue: ReportedIssue | null = null;
  globalFilter: string = '';
  startDate: string | null = null;
  endDate: string | null = null;
  viewPopupVisible: boolean = false;
  statusCycle = ['open', 'in-progress', 'pending', 'resolved', 'review', 'closed'];


  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private issueService:IssueService,

  ) {}

  ngOnInit(){
    this.loadIsssues();
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      check: [false]
    });
  }

  loadIsssues() {

    this.reportedIssues=this.issueService.getReportedIssues();
    console.log(this.reportedIssues);
    this.issues = [...this.reportedIssues];
    
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
    return this.issues ? this.first + this.rows >= this.issues.length : true;
  }

  isFirstPage(): boolean {
    return this.issues ? this.first === 0 : true;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }




  openFeedbackPopup(issue:any) {
    this.showFeedbackPopup = true;
  }

  closeFeedbackPopup() {
    this.showFeedbackPopup = false;
  }

  startRecording() {
    this.isRecordBtn = false;
    // Recording logic here
  }

  stopRecording() {
    this.isRecordBtn = true;
    // Stop recording logic
    this.audioUrl = 'sample_audio_url'; 
  }

  deleteRecording() {
    this.audioUrl = '';
    this.isRecordBtn = true;
  }

  onFileSelected(event: any, type: string) {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'images1') {
          this.selectedImages1.push(file);
          this.previews1.push({ url: e.target.result });
        } else if (type === 'images2') {
          this.selectedImages2.push(file);
          this.previews2.push({ url: e.target.result });
        } else if (type === 'videos') {
          this.selectedVideos.push(file);
          this.videoPreviews.push({ url: e.target.result });
        }
      };
      reader.readAsDataURL(file);
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

  submitForm() {
    console.log('Submitting form...');
  }
  
  toggleStatus(issue: ReportedIssue) {
    issue.current_status = issue.current_status === 'active' ? 'inactive' : 'active';
    this.messageService.add({
      severity: 'info',
      summary: 'Status Changed',
      life: 1000,
    });
  }
  cycleStatus(issue: any) {
    const currentIndex = this.statusCycle.indexOf(issue.current_status);
    const nextIndex = (currentIndex + 1) % this.statusCycle.length;
    issue.current_status = this.statusCycle[nextIndex];
  
    // Optional: Call service to persist change
    console.log(`Status changed to: ${issue.current_status}`);
    // this.issueService.updateIssueStatus(issue.issue_entry_id, issue.current_status);
  }
  
  getStatusSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' {
    switch (status) {
      case 'open':
        return 'danger';
      case 'in-progress':
        return 'warning';
      case 'pending':
        return 'info';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'info'; 
      case 'review':
        return 'warning'; 
      default:
        return 'info';
    }
  }
  

  viewIssue(issue: ReportedIssue): void {
    this.selectedIssue = issue;
    this.viewPopupVisible = true;
  }
  applyGlobalFilter() {
    const keyword = this.globalFilter.toLowerCase();
    
    this.issues = this.reportedIssues.filter(issue => {
      const matchKeyword =
        issue.t9_issue_name.toLowerCase().includes(keyword) ||
        issue.t2_company_branch_name.toLowerCase().includes(keyword) ||
        issue.t3_section_name.toLowerCase().includes(keyword) ||
        issue.current_status.toLowerCase().includes(keyword) ||
        issue.submited_by_details.first_name.toLowerCase().includes(keyword) ||
        issue.submited_by_details.last_name.toLowerCase().includes(keyword) ||
        issue.submited_date.includes(keyword);
  
      const issueDate = new Date(issue.submited_date);
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;
  
      const matchDate =
        (!start || issueDate >= start) &&
        (!end || issueDate <= end);
  
      return matchKeyword && matchDate;
    });
  }
  clearDateFilter() {
    this.startDate = null;
    this.endDate = null;
    this.applyGlobalFilter();  // Reapply filter with dates cleared
  }

generatePdfReport() {
  const doc = new jsPDF();
  let y = 10;

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const generate = async () => {
    doc.setFontSize(16);
    doc.text('Reported Issues Report', 10, y);
    y += 12;

    const cellHeight = 8;
    const col1Width = 40;
    const col2Width = 150;
    const pageHeight = 290;

    for (let i = 0; i < this.issues.length; i++) {
      const issue = this.issues[i];

      // Add new page if too close to bottom
      if (y + cellHeight * 10 > pageHeight) {
        doc.addPage();
        y = 10;
      }

      doc.setFontSize(14);
      doc.text(`Issue #${i + 1}`, 10, y);
      y += 10;

      const fields = [
        ['ID', issue.issue_entry_id],
        ['Type', issue.t9_issue_name],
        ['Submitted By', `${issue.submited_by_details.first_name} ${issue.submited_by_details.last_name}`],
        ['Date', issue.submited_date],
        ['Status', issue.current_status],
        ['Description', issue.issue_text],
      ];


      if (issue.voice_recording) {
        fields.push(['Voice Recording', issue.voice_recording]);
      }

      const videos = issue.media?.filter(m => m.media_type === 'video') || [];
      videos.forEach((video, idx) => {
        fields.push([`Video Link ${idx + 1}`, video.file_path]);
      });

      doc.setFontSize(11);
      doc.setDrawColor(0);
      doc.setFillColor(240, 240, 240);

      for (const [label, value] of fields) {
        if (y + cellHeight > pageHeight) {
          doc.addPage();
          y = 10;
        }

        doc.rect(10, y - cellHeight + 2, col1Width, cellHeight); // Label cell
        doc.rect(10 + col1Width, y - cellHeight + 2, col2Width, cellHeight); // Value cell

        doc.setFillColor(230, 230, 230);
        doc.rect(10, y - cellHeight + 2, col1Width, cellHeight, 'F');

        doc.setTextColor(0, 0, 0);
        doc.text(label, 12, y);

        if (label.startsWith('Video Link')) {
          doc.text(String(value).slice(0, 80), 12 + col1Width, y);
          doc.link(10 + col1Width, y - 6, doc.getTextWidth(String(value).slice(0, 80)), 10, { url: String(value) });
        } else {
          doc.text(String(value).slice(0, 80), 12 + col1Width, y);
        }

        y += cellHeight;
      }

      const images = issue.media?.filter(m => m.media_type === 'image') || [];
      const imgWidth = 50;
      const imgHeight = 30;
      const imagesPerRow = 3;
      let imgXStart = 10;
      let imgY = y;

      for (let idx = 0; idx < images.length; idx++) {
        if (imgY + imgHeight > pageHeight) {
          doc.addPage();
          imgY = 10;
        }

          const imgMedia = images[idx];
          try {
            const img = await loadImage(imgMedia.file_path);
            const col = idx % imagesPerRow;
            const x = imgXStart + col * (imgWidth + 10); 

            if (col === 0 && idx !== 0) {
              imgY += imgHeight + 10; // move down for new row
            }

            doc.addImage(img, 'JPEG', x, imgY, imgWidth, imgHeight);
          } catch (e) {
            // Print error below last image row or new line
            if (idx % imagesPerRow === 0 && idx !== 0) {
              imgY += imgHeight + 10;
            }
            doc.setTextColor(200, 0, 0);
            doc.text(`Image failed to load: ${imgMedia.file_path}`, imgXStart, imgY);
            doc.setTextColor(0, 0, 0);
            imgY += 10;
          }
        }

        y = imgY + imgHeight + 10;
    }

    doc.save('Reported_Issues.pdf');
  };

  generate();
}

  

  
  generatedocReport() {
    const rows: TableRow[] = [];
  
    // Header row with bold text
    rows.push(
      new TableRow({
        children: [
          new TableCell({ children: [this.boldText('No')], width: { size: 5, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [this.boldText('Issue ID')] }),
          new TableCell({ children: [this.boldText('Type')] }),
          new TableCell({ children: [this.boldText('Submitted By')] }),
          new TableCell({ children: [this.boldText('Date')] }),
          new TableCell({ children: [this.boldText('Status')] }),
          new TableCell({ children: [this.boldText('Voice Recording')] }),
          new TableCell({ children: [this.boldText('Image(s)')] }),
          new TableCell({ children: [this.boldText('Video(s)')] }),
        ],
      })
    );
  
    this.issues.forEach((issue, index) => {
      const submittedBy = `${issue.submited_by_details.first_name} ${issue.submited_by_details.last_name}`;
  
      const voicePara = issue.voice_recording
        ? new Paragraph({
            children: [
              new ExternalHyperlink({
                children: [new TextRun({ text: 'Click to listen', style: 'Hyperlink' })],
                link: issue.voice_recording,
              }),
            ],
          })
        : new Paragraph('N/A');
  
      const imageLinks: Paragraph[] = (issue.media || [])
        .filter(m => m.media_type === 'image')
        .map((media, idx) =>
          new Paragraph({
            children: [
              new TextRun({ text: `Image ${idx + 1}: `, bold: true }),
              new ExternalHyperlink({
                children: [new TextRun({ text: 'View', style: 'Hyperlink' })],
                link: media.file_path,
              }),
            ],
          })
        );
  
      const videoLinks: Paragraph[] = (issue.media || [])
        .filter(m => m.media_type === 'video')
        .map((media, idx) =>
          new Paragraph({
            children: [
              new TextRun({ text: `Video ${idx + 1}: `, bold: true }),
              new ExternalHyperlink({
                children: [new TextRun({ text: 'Watch', style: 'Hyperlink' })],
                link: media.file_path,
              }),
            ],
          })
        );
  
      rows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(`${index + 1}`)] }),
            new TableCell({ children: [new Paragraph(issue.issue_entry_id)] }),
            new TableCell({ children: [new Paragraph(issue.t9_issue_name)] }),
            new TableCell({ children: [new Paragraph(submittedBy)] }),
            new TableCell({ children: [new Paragraph(issue.submited_date)] }),
            new TableCell({ children: [new Paragraph(issue.current_status)] }),
            new TableCell({ children: [voicePara] }),
            new TableCell({ children: imageLinks.length ? imageLinks : [new Paragraph('N/A')] }),
            new TableCell({ children: videoLinks.length ? videoLinks : [new Paragraph('N/A')] }),
          ],
        })
      );
    });
  
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: 'Reported Issues Summary',
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 300 },
            }),
            new Table({
              rows,
              width: { size: 100, type: WidthType.PERCENTAGE },
            }),
          ],
        },
      ],
    });
  
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'Reported_Issues_Report.docx');
    });
  }
  
  boldText(label: string): Paragraph {
    return new Paragraph({
      children: [new TextRun({ text: label, bold: true })],
    });
  }
  
}
