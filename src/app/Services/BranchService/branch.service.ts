import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

branches = [
  {
    "t2_company_branch_id": "BR001",
    "t2_company_branch_name": "Downtown Branch",
    "t2_branch_type_id": "BT001",
    "t2_branch_type": "Restaurant",
    "t2_address_1": "123 Main Street",
    "t2_address_2": "Suite 400",
    "t2_mobile_no": "+1234567890",
    "t2_phone_no": "+0987654321",
    "t2_email": "downtown@restaurant.com",
    "id_t2_1_country": "2",
    "t2_1_local_name": "Downtown City",
    "country": "United States",
    "division1": "California",
    "division2": "Los Angeles County",
    "division3": "Los Angeles",
    "zip": "90001"
  },
  {
    "t2_company_branch_id": "BR002",
    "t2_company_branch_name": "Uptown Branch",
    "t2_branch_type_id": "BT001",
    "t2_branch_type": "Restaurant",
    "t2_address_1": "456 Uptown Avenue",
    "t2_address_2": "Floor 2",
    "t2_mobile_no": "+1987654321",
    "t2_phone_no": "+1123456789",
    "t2_email": "uptown@restaurant.com",
    "id_t2_1_country": "2",
    "t2_1_local_name": "Uptown City",
    "country": "United States",
    "division1": "Texas",
    "division2": "Dallas County",
    "division3": "Dallas",
    "zip": "75201"
  },
  {
    "t2_company_branch_id": "BR003",
    "t2_company_branch_name": "City Center Branch",
    "t2_branch_type_id": "BT001",
    "t2_branch_type": "Restaurant",
    "t2_address_1": "789 Central Blvd",
    "t2_address_2": "5th Floor",
    "t2_mobile_no": "+1472583690",
    "t2_phone_no": "+1593574862",
    "t2_email": "citycenter@restaurant.com",
    "id_t2_1_country": "1",
    "t2_1_local_name": "Central City",
    "country": "India",
    "division1": "Maharashtra",
    "division2": "Mumbai",
    "division3": "Andheri",
    "zip": "400001"
  },
  {
    "t2_company_branch_id": "BR004",
    "t2_company_branch_name": "Lakeside Branch",
    "t2_branch_type_id": "BT002",
    "t2_branch_type": "Cafe",
    "t2_address_1": "321 Lake Street",
    "t2_address_2": "Ground Floor",
    "t2_mobile_no": "+1122334455",
    "t2_phone_no": "+5566778899",
    "t2_email": "lakeside@cafe.com",
    "id_t2_1_country": "3",
    "t2_1_local_name": "Lakeside City",
    "country": "Canada",
    "division1": "Ontario",
    "division2": "Toronto District",
    "division3": "Toronto",
    "zip": "M5C 2W1"
  }
];

  
  constructor() { }

  getBranches(){
    return this.branches;
  }
}
