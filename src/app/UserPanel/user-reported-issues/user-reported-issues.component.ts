import { Component, ViewChild } from '@angular/core';
import { IssueService } from '../../Services/IssueSevice/issue.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

type Severity = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast';

export interface ReportedIssue {
 
  user_id: string;
  submited_by_details: {
    first_name: string;
    last_name: string;
  };
  issue_entry_id: string;
  t9_issue_type_id: string;
  t9_issue_name: string;
  submited_date: string;
  current_status: string;
  voice_recording: string;
  issue_text: string;
  t2_company_branch_id: string;
  t2_company_branch_name: string;
  t3_section_name: string;
  t3_branch_section_id: string;
  t1_company: string;
  t1_company_name: string;
  media: {
    media_id: string;
    issue_entry_id: string;
    media_type_id: string;
    media_type: string;
    file_path: string;
  }[];
}


@Component({
  selector: 'app-user-reported-issues',
  templateUrl: './user-reported-issues.component.html',
  styleUrl: './user-reported-issues.component.css'
})
export class UserReportedIssuesComponent {
 first: number = 0;
  rows: number = 10;

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
    return this.issues
      ? this.first + this.rows >= this.issues.length
      : true;
  }

  isFirstPage(): boolean {
    return this.issues ? this.first === 0 : true;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  
  issues: ReportedIssue[] = [
    
      {
        "user_id": "USER001",
        "submited_by_details": {
          "first_name": "John",
          "last_name": "Doe"
        },
        "issue_entry_id": "IE001",
        "t9_issue_type_id": "ISSUE001",
        "t9_issue_name": "Damaged Item",
        "submited_date": "06-05-2025",
        "current_status": "open",
        "voice_recording": "/voice/rec1.mp3",
        "issue_text": "Product arrived with damage on packaging",
        "t2_company_branch_id": "BR001",
        "t2_company_branch_name": "Downtown Branch",
        "t3_section_name": "Main Dining Area",
        "t3_branch_section_id": "BRANCH001",
        "t1_company": "COMPANY001",
        "t1_company_name": "Gourmet Foods Inc.",
        "media": [
          {
            "media_id": "M001",
            "issue_entry_id": "IE001",
            "media_type_id": "MT001",
            "media_type": "image",
            "file_path": "https://cdn.prod.website-files.com/660e658d0cfb31720d8934d0/670945c0c0ab44abf0c91301_66bc690dbf62c2412cea75ef_how-to-deal-Damaged-goods.pmg.webp"
          },
          {
            "media_id": "M002",
            "issue_entry_id": "IE001",
            "media_type_id": "MT002",
            "media_type": "image",
            "file_path": "https://media.istockphoto.com/id/1362540875/photo/unhappy-asian-chinese-woman-holding-broken-ceramic-teapot-from-online-shopping-a-living-room.jpg?s=612x612&w=0&k=20&c=gPgj22L1SwGkzz2T4UYlFU0LHd56EQdSRSc4o5eOf94="
          },
          {
            "media_id": "M003",
            "issue_entry_id": "IE001",
            "media_type_id": "MT003",
            "media_type": "video",
            "file_path": "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/BAdjMul4yxm4cqs1gs/1035z-v1-0097-a063-09121906-c098-qcm8ig0ahc__708f9fd73933405852c7798c8407d2d8__P360.mp4"
          },
          {
            "media_id": "M004",
            "issue_entry_id": "IE001",
            "media_type_id": "MT004",
            "media_type": "video",
            "file_path": "assets/videos/BB_a4cb3534-3d05-4b29-a4a6-38e952a6c767_preview.mp4"
          }
        ]
      },
      {
        "user_id": "USER001",
        "submited_by_details": {
          "first_name": "John",
          "last_name": "Doe"
        },
        "issue_entry_id": "IE002",
        "t9_issue_type_id": "ISSUE005",
        "t9_issue_name": "Spoiled Food",
        "submited_date": "06-05-2025",
        "current_status": "in-progress",
        "voice_recording": "/voice/rec2.mp3",
        "issue_text": "The food was spoiled when delivered.",
        "t2_company_branch_id": "BR001",
        "t2_company_branch_name": "Downtown Branch",
        "t3_section_name": "Main Dining Area",
        "t3_branch_section_id": "BRANCH001",
        "t1_company": "COMPANY001",
        "t1_company_name": "Gourmet Foods Inc.",
        "media": [
          {
            "media_id": "M005",
            "issue_entry_id": "IE002",
            "media_type_id": "MT005",
            "media_type": "video",
            "file_path": "/media/video1.mp4"
          }
        ]
      },
      {
        "user_id": "USER001",
        "submited_by_details": {
          "first_name": "John",
          "last_name": "Doe"
        },
        "issue_entry_id": "IE003",
        "t9_issue_type_id": "ISSUE009",
        "t9_issue_name": "Payment Issue",
        "submited_date": "06-05-2025",
        "current_status": "resolved",
        "voice_recording": "/voice/rec3.mp3",
        "issue_text": "Payment failed but amount was debited.",
        "t2_company_branch_id": "BR002",
        "t2_company_branch_name": "Uptown Branch",
        "t3_section_name": "Outdoor Patio",
        "t3_branch_section_id": "BRANCH002",
        "t1_company": "COMPANY001",
        "t1_company_name": "Gourmet Foods Inc.",
        "media": [
          {
            "media_id": "M006",
            "issue_entry_id": "IE003",
            "media_type_id": "MT006",
            "media_type": "image",
            "file_path": "/media/image4.jpg"
          },
          {
            "media_id": "M007",
            "issue_entry_id": "IE003",
            "media_type_id": "MT007",
            "media_type": "image",
            "file_path": "/media/image5.jpg"
          }
        ]
      },
      {
        "user_id": "USER001",
        "submited_by_details": {
          "first_name": "John",
          "last_name": "Doe"
        },
        "issue_entry_id": "IE004",
        "t9_issue_type_id": "ISSUE013",
        "t9_issue_name": "Order Not Confirmed",
        "submited_date": "06-05-2025",
        "current_status": "pending",
        "voice_recording": "/voice/rec4.mp3",
        "issue_text": "Placed an order but never got confirmation.",
        "t2_company_branch_id": "BR002",
        "t2_company_branch_name": "Uptown Branch",
        "t3_section_name": "Outdoor Patio",
        "t3_branch_section_id": "BRANCH002",
        "t1_company": "COMPANY001",
        "t1_company_name": "Gourmet Foods Inc.",
        "media": [
          {
            "media_id": "M008",
            "issue_entry_id": "IE004",
            "media_type_id": "MT008",
            "media_type": "video",
            "file_path": "/media/video2.mov"
          }
        ]
      },
      {
        "user_id": "USER001",
        "submited_by_details": {
          "first_name": "John",
          "last_name": "Doe"
        },
        "issue_entry_id": "IE006",
        "t9_issue_type_id": "ISSUE014",
        "t9_issue_name": "Poor Food Quality",
        "submited_date": "06-05-2025",
        "current_status": "review",
        "voice_recording": "/voice/rec5.mp3",
        "issue_text": "The quality of food was very bad.",
        "t2_company_branch_id": "BR004",
        "t2_company_branch_name": "Lakeside Branch",
        "t3_section_name": "Main Hall",
        "t3_branch_section_id": "BRANCH004",
        "t1_company": "COMPANY002",
        "t1_company_name": "Fresh Eats Ltd.",
        "media": [
          {
            "media_id": "M009",
            "issue_entry_id": "IE006",
            "media_type_id": "MT009",
            "media_type": "image",
            "file_path": "/media/image6.jpg"
          },
          {
            "media_id": "M010",
            "issue_entry_id": "IE006",
            "media_type_id": "MT010",
            "media_type": "image",
            "file_path": "/media/image7.jpg"
          }
        ]
      },
      {
        "user_id": "USER001",
        "submited_by_details": {
          "first_name": "John",
          "last_name": "Doe"
        },
        "issue_entry_id": "IE005",
        "t9_issue_type_id": "ISSUE014",
        "t9_issue_name": "Poor Food Quality",
        "submited_date": "06-05-2025",
        "current_status": "review",
        "voice_recording": "/voice/rec5.mp3",
        "issue_text": "The quality of food was very bad.",
        "t2_company_branch_id": "BR004",
        "t2_company_branch_name": "Lakeside Branch",
        "t3_section_name": "Main Hall",
        "t3_branch_section_id": "BRANCH004",
        "t1_company": "COMPANY002",
        "t1_company_name": "Fresh Eats Ltd.",
        "media": [
          {
            "media_id": "M009",
            "issue_entry_id": "IE005",
            "media_type_id": "MT009",
            "media_type": "image",
            "file_path": "/media/image6.jpg"
          },
          {
            "media_id": "M010",
            "issue_entry_id": "IE005",
            "media_type_id": "MT010",
            "media_type": "image",
            "file_path": "/media/image7.jpg"
          }
        ]
      }
    ];
    
  

  selectedIssue: ReportedIssue | null = null;
  detailDialogVisible = false;

  constructor(private messageService: MessageService,private confirmationService:ConfirmationService){}
@ViewChild('dt2') dt2!: Table;

  getStatusSeverity(status: string): Severity {
    switch (status.toLowerCase()) {
      case 'open': return 'danger';
      case 'in-progress': return 'warning';
      case 'resolved': return 'success';
      case 'pending': return 'secondary';
      case 'review': return 'info';
      default: return 'contrast';
    }
  }

  showIssueDetails(issue: ReportedIssue): void {
    this.selectedIssue = issue;
    this.detailDialogVisible = true;
  }

  onDetailDialogHide(): void {
    this.selectedIssue = null;
  }


  delete(event: Event, issueId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this issue?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        // Create new array reference to trigger change detection
        this.issues = this.issues.filter(issue => issue.issue_entry_id !== issueId);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Issue deleted successfully',
          life: 3000
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info', 
          summary: 'Cancelled',
          detail: 'Deletion cancelled',
          life: 3000
        });
      }
    });
  }
}





