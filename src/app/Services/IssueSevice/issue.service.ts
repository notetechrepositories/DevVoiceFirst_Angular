import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueTypes: any[] = [];
  constructor() { }

  issueType=[
    {
      "t9_issue_type_id": "ISSUE001",
      "t9_issue_name": "Damaged Item",
      "t1_company_id": "COMPANY001",
      "t1_company_name": "Gourmet Foods Inc.",
      "id_company_type": "CT001",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR001",
          "id_t9_issue_type": "ISSUE001",
          "t9_1_media_type": "image",
          "t9_1_is_mandatory": true,
          "t9_1_max": 3,
          "t9_1_max_size_mb": "5.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR001",
              "id_t9_3_issue_type_photo_video_of": "ITEM001",
              "t9_3_description": "Photo of damaged item"
            },
            {
              "id_t9_2_photo_video_required": "PVR011",
              "id_t9_3_issue_type_photo_video_of": "ITEM002",
              "t9_3_description": "Evidence Image"
            }
          ]
        },
        {
          "id_t9_1_issue_type_media_requirement": "MR011",
          "id_t9_issue_type": "ISSUE001",
          "t9_1_media_type": "video",
          "t9_1_is_mandatory": false,
          "t9_1_max": 3,
          "t9_1_max_size_mb": "10.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR002",
              "id_t9_3_issue_type_photo_video_of": "DELIVERY001",
              "t9_3_description": "Delivery arrival video"
            },
            {
              "id_t9_2_photo_video_required": "PVR022",
              "id_t9_3_issue_type_photo_video_of": "DELIVERY002",
              "t9_3_description": "Unboxing Video"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE002",
      "t9_issue_name": "Late Delivery",
      "t1_company_id": "COMPANY002",
      "t1_company_name": "Fresh Eats Ltd.",
      "id_company_type": "CT002",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR002",
          "id_t9_issue_type": "ISSUE002",
          "t9_1_media_type": "video",
          "t9_1_is_mandatory": false,
          "t9_1_max": 1,
          "t9_1_max_size_mb": "10.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR002",
              "id_t9_3_issue_type_photo_video_of": "DELIVERY001",
              "t9_3_description": "Delivery arrival video"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE003",
      "t9_issue_name": "Wrong Item Delivered",
      "t1_company_id": "COMPANY003",
      "t1_company_name": "Tasty Treats Co.",
      "id_company_type": "CT003",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR003",
          "id_t9_issue_type": "ISSUE003",
          "t9_1_media_type": "image",
          "t9_1_is_mandatory": true,
          "t9_1_max": 2,
          "t9_1_max_size_mb": "8.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR003",
              "id_t9_3_issue_type_photo_video_of": "ITEM_WRONG001",
              "t9_3_description": "Photo of wrong item"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE004",
      "t9_issue_name": "Incomplete Order",
      "t1_company_id": "COMPANY004",
      "t1_company_name": "Fine Dining Group",
      "id_company_type": "CT004",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR004",
          "id_t9_issue_type": "ISSUE004",
          "t9_1_media_type": "image",
          "t9_1_is_mandatory": true,
          "t9_1_max": 3,
          "t9_1_max_size_mb": "5.5",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR004",
              "id_t9_3_issue_type_photo_video_of": "ORDER001",
              "t9_3_description": "Missing items photo"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE005",
      "t9_issue_name": "Spoiled Food",
      "t1_company_id": "COMPANY001",
      "t1_company_name": "Gourmet Foods Inc.",
      "id_company_type": "CT001",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR005",
          "id_t9_issue_type": "ISSUE005",
          "t9_1_media_type": "video",
          "t9_1_is_mandatory": true,
          "t9_1_max": 1,
          "t9_1_max_size_mb": "15.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR005",
              "id_t9_3_issue_type_photo_video_of": "FOOD001",
              "t9_3_description": "Video showing spoiled food"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE006",
      "t9_issue_name": "Incorrect Bill",
      "t1_company_id": "COMPANY002",
      "t1_company_name": "Fresh Eats Ltd.",
      "id_company_type": "CT002",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR006",
          "id_t9_issue_type": "ISSUE006",
          "t9_1_media_type": "image",
          "t9_1_is_mandatory": false,
          "t9_1_max": 2,
          "t9_1_max_size_mb": "5.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR006",
              "id_t9_3_issue_type_photo_video_of": "BILL001",
              "t9_3_description": "Photo of incorrect bill"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE007",
      "t9_issue_name": "Bad Packaging",
      "t1_company_id": "COMPANY003",
      "t1_company_name": "Tasty Treats Co.",
      "id_company_type": "CT003",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR007",
          "id_t9_issue_type": "ISSUE007",
          "t9_1_media_type": "image",
          "t9_1_is_mandatory": true,
          "t9_1_max": 4,
          "t9_1_max_size_mb": "7.5",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR007",
              "id_t9_3_issue_type_photo_video_of": "PACK001",
              "t9_3_description": "Bad packaging photo"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE008",
      "t9_issue_name": "Delivery Address Error",
      "t1_company_id": "COMPANY004",
      "t1_company_name": "Fine Dining Group",
      "id_company_type": "CT004",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR008",
          "id_t9_issue_type": "ISSUE008",
          "t9_1_media_type": "video",
          "t9_1_is_mandatory": false,
          "t9_1_max": 1,
          "t9_1_max_size_mb": "12.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR008",
              "id_t9_3_issue_type_photo_video_of": "ADDRESS001",
              "t9_3_description": "Incorrect address video"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE009",
      "t9_issue_name": "Payment Issue",
      "t1_company_id": "COMPANY001",
      "t1_company_name": "Gourmet Foods Inc.",
      "id_company_type": "CT001",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR009",
          "id_t9_issue_type": "ISSUE009",
          "t9_1_media_type": "image",
          "t9_1_is_mandatory": false,
          "t9_1_max": 2,
          "t9_1_max_size_mb": "5.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR009",
              "id_t9_3_issue_type_photo_video_of": "PAYMENT001",
              "t9_3_description": "Screenshot of failed payment"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE010",
      "t9_issue_name": "Staff Behavior Complaint",
      "t1_company_id": "COMPANY002",
      "t1_company_name": "Fresh Eats Ltd.",
      "id_company_type": "CT002",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR010",
          "id_t9_issue_type": "ISSUE010",
          "t9_1_media_type": "video",
          "t9_1_is_mandatory": false,
          "t9_1_max": 1,
          "t9_1_max_size_mb": "20.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR010",
              "id_t9_3_issue_type_photo_video_of": "STAFF001",
              "t9_3_description": "Video describing staff behavior"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE011",
      "t9_issue_name": "Unsanitary Conditions",
      "t1_company_id": "COMPANY003",
      "t1_company_name": "Tasty Treats Co.",
      "id_company_type": "CT003",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR011",
          "id_t9_issue_type": "ISSUE011",
          "t9_1_media_type": "image",
          "t9_1_is_mandatory": true,
          "t9_1_max": 3,
          "t9_1_max_size_mb": "7.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR011",
              "id_t9_3_issue_type_photo_video_of": "CLEAN001",
              "t9_3_description": "Photo of unsanitary area"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE012",
      "t9_issue_name": "Missing Receipt",
      "t1_company_id": "COMPANY004",
      "t1_company_name": "Fine Dining Group",
      "id_company_type": "CT004",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR012",
          "id_t9_issue_type": "ISSUE012",
          "t9_1_media_type": "image",
          "t9_1_is_mandatory": false,
          "t9_1_max": 1,
          "t9_1_max_size_mb": "5.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR012",
              "id_t9_3_issue_type_photo_video_of": "RECEIPT001",
              "t9_3_description": "Request for missing receipt"
            }
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE013",
      "t9_issue_name": "Order Not Confirmed",
      "t1_company_id": "COMPANY001",
      "t1_company_name": "Gourmet Foods Inc.",
      "id_company_type": "CT001",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR013",
          "id_t9_issue_type": "ISSUE013",
          "t9_1_media_type": "video",
          "t9_1_is_mandatory": true,
          "t9_1_max": 1,
          "t9_1_max_size_mb": "8.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR013",
              "id_t9_3_issue_type_photo_video_of": "ORDER002",
              "t9_3_description": "Video explaining unconfirmed order"
            },
            
          ]
        }
      ]
    },
    {
      "t9_issue_type_id": "ISSUE014",
      "t9_issue_name": "Poor Food Quality",
      "t1_company_id": "COMPANY001",
      "t1_company_name": "Fresh Eats Ltd.",
      "id_company_type": "CT002",
      "company_type": "Hospitality",
      "media_requirement": [
        {
          "id_t9_1_issue_type_media_requirement": "MR014",
          "id_t9_issue_type": "ISSUE014",
          "t9_1_media_type": "image",
          "t9_1_is_mandatory": true,
          "t9_1_max": 2,
          "t9_1_max_size_mb": "7.0",
          "photo_video_requirement": [
            {
              "id_t9_2_photo_video_required": "PVR014",
              "id_t9_3_issue_type_photo_video_of": "FOOD002",
              "t9_3_description": "Poor quality food photo"
            }
          ]
        }
      ]
    }
   ]


   getIssueType() {
    return [...this.issueType, ...this.addedIssueTypes];
  }
   
  getIssueTypeById(issueTypeId: string) {
    return [...this.issueType, ...this.addedIssueTypes].find(
      section => section.t9_issue_type_id === issueTypeId
    );
  }
  getIssueTypeByCompanyId(companyId: string): any[] {
    const allIssueTypes = [...this.issueType, ...this.addedIssueTypes];
    return allIssueTypes.filter(section => section.t1_company_id === companyId);
  }  
  
  setIssueTypes(data: any[]) {
    this.issueTypes = data;
  }

  addedIssueTypes: any[] = [];

  addIssueType(newIssue: any): Observable<any> {
    const transformed = this.transformToFullFormat(newIssue);
    this.addedIssueTypes.push(transformed);
    return of(transformed); 
  }

  private transformToFullFormat(data: any) {   

    return {
      t9_issue_type_id: this.generateId(),
      t9_issue_name: data.issue_name,
      t1_company_id: 'COMPANY001',
      t1_company_name: 'Custom',
      id_company_type: 'CT_CUSTOM',
      company_type: 'Hospitality',
      media_requirement: data.sysIssueTypeMediaRequirementDTOModels.map((media: any, idx: number) => ({
        id_t9_1_issue_type_media_requirement: 'MR_CUSTOM_' + idx,
        id_t9_issue_type: 'DYNAMIC',
        t9_1_media_type: media.media_type,
        t9_1_is_mandatory: media.is_mandatory === 'mandatory',
        t9_1_max: media.max,
        t9_1_max_size_mb: media.max_size_mb,
        photo_video_requirement: media.sysIssueTypePhotoVideoRequiredDtoModels.map((pv: any, i: number) => ({
          id_t9_2_photo_video_required: `PVR_CUSTOM_${i}`,
          id_t9_3_issue_type_photo_video_of: pv.photo_video_of,
            t9_3_description: pv.t12_description ?? ''
        }))
      }))
    };
  }

  private generateId(): string {
    return 'ISSUE' + Math.floor(Math.random() * 10000);
  }
  removeIssueType(id: string): void {
  this.addedIssueTypes = this.addedIssueTypes.filter(item => item.t9_issue_type_id !== id);
}
private editingIssue: any = null;
setEditingIssue(issue: any) {
  this.editingIssue = issue;
  
}  
getEditingIssue() {
  return this.editingIssue;
}
editingIndex: number | null = null;
updateIssueType(updated: any): Observable<any> {
  const indexInIssueType = this.issueType.findIndex(
    r => r.t9_issue_type_id === updated.t9_issue_type_id
  );
  const indexInAdded = this.addedIssueTypes.findIndex(
    r => r.t9_issue_type_id === updated.t9_issue_type_id
  );

  const transformed = this.transformToFullFormat(updated);
  transformed.t9_issue_type_id = updated.t9_issue_type_id;

  if (indexInIssueType !== -1) {
    this.issueType[indexInIssueType] = transformed;
    return of({ status: 'updated', data: transformed });
  } else if (indexInAdded !== -1) {
    this.addedIssueTypes[indexInAdded] = transformed;
    return of({ status: 'updated', data: transformed });
  } else {
    return throwError(() => new Error('❌ Update failed: ID not found'));
  }
}



clearEditingIssue() {
  this.editingIssue = null;
}
reportedIssues=[
  {
    "submited_by_details": {
      "first_name": "John",
      "last_name": "Doe"
    },
    "issue_entry_id": "IE001",
    "t9_issue_type_id": "ISSUE001",
    "t9_issue_name": "Damaged Item",
    "submited_date": "06-03-2025",
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
        "media_id": "M003",
        "issue_entry_id": "IE001",
        "media_type_id": "MT003",
        "media_type": "video",
        "file_path": "assets/videos/BB_a4cb3534-3d05-4b29-a4a6-38e952a6c767_preview.mp4"
      }
    ]
  },
  {
    "submited_by_details": {
      "first_name": "Jane",
      "last_name": "Smith"
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
        "media_id": "M004",
        "issue_entry_id": "IE002",
        "media_type_id": "MT004",
        "media_type": "video",
        "file_path": "/media/video1.mp4"
      }
    ]
  },
  {
    "submited_by_details": {
      "first_name": "Alice",
      "last_name": "Brown"
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
        "media_id": "M005",
        "issue_entry_id": "IE003",
        "media_type_id": "MT005",
        "media_type": "image",
        "file_path": "/media/image4.jpg"
      },
      {
        "media_id": "M006",
        "issue_entry_id": "IE003",
        "media_type_id": "MT006",
        "media_type": "image",
        "file_path": "/media/image5.jpg"
      }
    ]
  },
  {
    "submited_by_details": {
      "first_name": "David",
      "last_name": "Nguyen"
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
        "media_id": "M007",
        "issue_entry_id": "IE004",
        "media_type_id": "MT007",
        "media_type": "video",
        "file_path": "/media/video2.mov"
      }
    ]
  },
  {
    "submited_by_details": {
      "first_name": "Emily",
      "last_name": "Clark"
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
        "media_id": "M008",
        "issue_entry_id": "IE005",
        "media_type_id": "MT008",
        "media_type": "image",
        "file_path": "/media/image6.jpg"
      },
      {
        "media_id": "M009",
        "issue_entry_id": "IE005",
        "media_type_id": "MT009",
        "media_type": "image",
        "file_path": "/media/image7.jpg"
      }
    ]
  }
]
getReportedIssues() {
  return [...this.reportedIssues];
}
getIssueByEntryId(id: string) {
  return this.reportedIssues.find(issue => issue.issue_entry_id === id);
}
}
