import { Injectable } from '@angular/core';

export interface Branch {
  branchId: number;
  branchName: string;
}

export interface Section {
  branchId: number;
  sectionId: number;
  sectionName: string;
}

export interface Role {
  id_t5_1_m_user_roles: number;
  roleName: string;
}

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

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  countries: Country[] = [
      {
        id_t2_1_country: '1',
        t2_1_country_name: 'India',
        t2_1_div1_called: 'State',
        t2_1_div2_called: 'District',
        t2_1_div3_called: 'City'
      },
      {
        id_t2_1_country: '2',
        t2_1_country_name: 'United States',
        t2_1_div1_called: 'State',
        t2_1_div2_called: 'County',
        t2_1_div3_called: 'City'
      },
      {
        id_t2_1_country: '3',
        t2_1_country_name: 'Canada',
        t2_1_div1_called: 'Province',
        t2_1_div2_called: 'Region',
        t2_1_div3_called: 'City'
      }
    ];
  
    divisionOnes: DivisionImport[] = [
      { t2_1_country_name: 'India', t2_1_div1_name: 'Maharashtra' },
      { t2_1_country_name: 'India', t2_1_div1_name: 'Karnataka' },
      { t2_1_country_name: 'United States', t2_1_div1_name: 'California' },
      { t2_1_country_name: 'United States', t2_1_div1_name: 'Texas' },
      { t2_1_country_name: 'Canada', t2_1_div1_name: 'Ontario' },
      { t2_1_country_name: 'Canada', t2_1_div1_name: 'Quebec' }
    ];
  
    divisionTwos: DivisiontwoImport[] = [
      { t2_1_country_name: 'India', t2_1_div1_name: 'Maharashtra', t2_1_div2_name: 'Pune' },
      { t2_1_country_name: 'India', t2_1_div1_name: 'Maharashtra', t2_1_div2_name: 'Mumbai' },
      { t2_1_country_name: 'India', t2_1_div1_name: 'Karnataka', t2_1_div2_name: 'Bangalore' },
      { t2_1_country_name: 'United States', t2_1_div1_name: 'California', t2_1_div2_name: 'Los Angeles County' },
      { t2_1_country_name: 'United States', t2_1_div1_name: 'Texas', t2_1_div2_name: 'Harris County' },
      { t2_1_country_name: 'Canada', t2_1_div1_name: 'Ontario', t2_1_div2_name: 'Toronto' },
      { t2_1_country_name: 'Canada', t2_1_div1_name: 'Quebec', t2_1_div2_name: 'Montreal' }
    ];
  
    divisionThrees: DivisionthreeImport[] = [
      {
        t2_1_country_name: 'India',
        t2_1_div1_name: 'Maharashtra',
        t2_1_div2_name: 'Pune',
        t2_1_div3_name: 'Shivaji Nagar'
      },
      {
        t2_1_country_name: 'India',
        t2_1_div1_name: 'Maharashtra',
        t2_1_div2_name: 'Pune',
        t2_1_div3_name: 'Hinjewadi'
      },
      {
        t2_1_country_name: 'United States',
        t2_1_div1_name: 'California',
        t2_1_div2_name: 'Los Angeles County',
        t2_1_div3_name: 'Los Angeles'
      },
      {
        t2_1_country_name: 'Canada',
        t2_1_div1_name: 'Ontario',
        t2_1_div2_name: 'Toronto',
        t2_1_div3_name: 'Scarborough'
      }
    ];

  constructor() { }


  getCountries(){
    return this.countries;
  }

  getdivisionOne(){
    return this.divisionOnes;
  }

  getdivisionTwo(){
    return this.divisionTwos;
  }

  getdivisionThree(){
    return this.divisionThrees;
  }
}
