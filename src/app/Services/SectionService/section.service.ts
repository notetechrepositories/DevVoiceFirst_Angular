import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor() { }

  section=[
    {
      "t3_section_name": "Main Dining Area",
      "t3_branch_section_id": "BRANCH001",
      "t2_section_type_id": "BT001",
      "t2_section_type": "Restaurant",
      "branch_details": {
        "t2_company_branch_id": "BR001",
        "t2_company_branch_name": "Downtown Branch",
        "t2_branch_type_id": "BT001",
        "t2_branch_type": "Restaurant",
        "t2_address_1": "123 Main Street",
        "t2_address_2": "Suite 400",
        "t2_mobile_no": "+1234567890",
        "t2_phone_no": "+0987654321",
        "t2_email": "downtown@restaurant.com",
        "t2_1_local_id": "LOC001",
        "t2_1_local_name": "Downtown City",
        "country": "United States",
        "division1": "California",
        "division2": "Los Angeles County",
        "division3": "Los Angeles",
        "zip": "90001"
      },
      "company_details": {
        "t1_company": "COMPANY001",
        "t1_company_name": "Gourmet Foods Inc.",
        "id_company_type": "CT001",
        "company_type": "Hospitality",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESsGm92deQDTJR9fiWcHZ8S94NCmFLSkkQg&s"
      }
    },
    {
      "t3_section_name": "Outdoor Patio",
      "t3_branch_section_id": "BRANCH002",
      "t2_section_type_id": "BT001",
      "t2_section_type": "Restaurant",
      "branch_details": {
        "t2_company_branch_id": "BR002",
        "t2_company_branch_name": "Uptown Branch",
        "t2_branch_type_id": "BT001",
        "t2_branch_type": "Restaurant",
        "t2_address_1": "456 Uptown Avenue",
        "t2_address_2": "Floor 2",
        "t2_mobile_no": "+1987654321",
        "t2_phone_no": "+1123456789",
        "t2_email": "uptown@restaurant.com",
        "t2_1_local_id": "LOC002",
        "t2_1_local_name": "Uptown City",
        "country": "United States",
        "division1": "Texas",
        "division2": "Dallas County",
        "division3": "Dallas",
        "zip": "75201"
      },
      "company_details": {
        "t1_company": "COMPANY001",
        "t1_company_name": "Gourmet Foods Inc.",
        "id_company_type": "CT001",
        "company_type": "Hospitality",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESsGm92deQDTJR9fiWcHZ8S94NCmFLSkkQg&s"
      }
    },
    {
      "t3_section_name": "VIP Lounge",
      "t3_branch_section_id": "BRANCH003",
      "t2_section_type_id": "BT001",
      "t2_section_type": "Restaurant",
      "branch_details": {
        "t2_company_branch_id": "BR003",
        "t2_company_branch_name": "City Center Branch",
        "t2_branch_type_id": "BT001",
        "t2_branch_type": "Restaurant",
        "t2_address_1": "789 Central Blvd",
        "t2_address_2": "5th Floor",
        "t2_mobile_no": "+1472583690",
        "t2_phone_no": "+1593574862",
        "t2_email": "citycenter@restaurant.com",
        "t2_1_local_id": "LOC003",
        "t2_1_local_name": "Central City",
        "country": "India",
        "division1": "Maharashtra",
        "division2": "Mumbai",
        "division3": "Andheri",
        "zip": "400001"
      },
      "company_details": {
        "t1_company": "COMPANY001",
        "t1_company_name": "Gourmet Foods Inc.",
        "id_company_type": "CT001",
        "company_type": "Hospitality",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESsGm92deQDTJR9fiWcHZ8S94NCmFLSkkQg&s"
      }
    },
    {
      "t3_section_name": "Main Hall",
      "t3_branch_section_id": "BRANCH004",
      "t2_section_type_id": "BT002",
      "t2_section_type": "Cafe",
      "branch_details": {
        "t2_company_branch_id": "BR004",
        "t2_company_branch_name": "Lakeside Branch",
        "t2_branch_type_id": "BT002",
        "t2_branch_type": "Cafe",
        "t2_address_1": "321 Lake Street",
        "t2_address_2": "Ground Floor",
        "t2_mobile_no": "+1122334455",
        "t2_phone_no": "+5566778899",
        "t2_email": "lakeside@cafe.com",
        "t2_1_local_id": "LOC004",
        "t2_1_local_name": "Lakeside City",
        "country": "Canada",
        "division1": "Ontario",
        "division2": "Toronto District",
        "division3": "Toronto",
        "zip": "M5C 2W1"
      },
      "company_details": {
        "t1_company": "COMPANY002",
        "t1_company_name": "Fresh Eats Ltd.",
        "id_company_type": "CT002",
        "company_type": "Hospitality",
        "company_logo": "https://www.creativefabrica.com/wp-content/uploads/2023/01/29/Restaurant-logo-vector-template-Graphics-59288740-1.jpg"

      }
    }
  ];

  sectionType=[
    {
      "t2_section_type_id": "BT001",
      "t2_section_type": "Restaurant"
    },
    {
      "t2_section_type_id": "BT002",
      "t2_section_type": "Cafe",
    },
  ]

  getSection(){
    return this.section;
  }

  getSectionByBranchSectionId(branchSectionId: string) {
    return this.section.find(section => section.t3_branch_section_id === branchSectionId);
  }
  
  getSectionsByBranchId(branchId: string) {
    return this.section.filter(section => section.branch_details.t2_company_branch_id === branchId);
  }



  getSectionType(){
    return this.sectionType;
  }
  
}
