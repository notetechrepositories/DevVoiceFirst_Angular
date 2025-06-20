import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from '../../Services/SectionService/section.service';
import { IssueService } from '../../Services/IssueSevice/issue.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  searchQuery: string = '';
  filteredSections: any[] = [];

  sections:any[]=[];


  constructor(
    private router:Router,
    private sectionService:SectionService,

  ){}

  ngOnInit(){
    this.getAllSection();

  }

  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query.length === 0) {
      this.filteredSections = [];
      return;
    }
    this.filteredSections = this.sections.filter(section =>
      section.t3_section_name.toLowerCase().includes(query) ||
      section.branch_details.t2_company_branch_name.toLowerCase().includes(query) ||
      section.company_details.t1_company_name.toLowerCase().includes(query) ||
      section.branch_details.t2_1_local_name.toLowerCase().includes(query) ||
      section.branch_details.division1.toLowerCase().includes(query) ||
      section.branch_details.division2.toLowerCase().includes(query) ||
      section.branch_details.division3.toLowerCase().includes(query) ||
      section.branch_details.country.toLowerCase().includes(query) ||
      section.branch_details.zip.toLowerCase().includes(query)
    );
  }

  navigateToBranch(id:any){
    this.router.navigate(['/user/issue-reporting', id]);
  }



  getAllSection() {
    this.sections = this.sectionService.getSection();
    console.log(this.sections);
  }



}
