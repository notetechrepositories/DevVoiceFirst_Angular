import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleService } from '../../Services/RoleService/role.service';
import { EmployeeService } from '../../Services/EmployeeService/employee.service';
import { LocationService } from '../../Services/LocationService/location.service';
import { BranchService } from '../../Services/BranchService/branch.service';
import { SectionService } from '../../Services/SectionService/section.service';
import { Table } from 'primeng/table';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: string;
  email: string;
  mobile: string;
  address1: string;
  address2?: string;
  id_t2_1_country: string;
  id_t2_1_div1: string;
  id_t2_1_div2: string;
  id_t2_1_div3: string;
  local: string;
  zipCode: string;
  branchId: string;
  branchName: string;
  sectionId: string;
  sectionName: string;
  id_t5_1_m_user_roles: string[]; // change from string to array
  roleNames: string[];
  status: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  first: number = 0;
  rows: number = 10;

  employees: Employee[] = [];
  addPopupVisible: boolean = false;
  employeeform!: FormGroup;
  isEdit: boolean = false;
  years: number[] = [];


  roles: any[]=[] ;


  branches: any[]=[];

  sections: any[]=[];

  countries: any[]=[];

  divisionOnes: any[]=[];

  divisionTwos: any[]=[];

  divisionThrees: any[]=[];

  filteredSections: any[] = [];
  filteredRoles: any[] = [];
  selectedBranchId: any;
  selectedSectionId: any;

  selectedCountry: any | null = null;

  div1Options: string[] = [];
  div2Options: string[] = [];
  div3Options: string[] = [];

  div1Label = 'Division 1';
  div2Label = 'Division 2';
  div3Label = 'Division 3';

  @ViewChild('dt2') dt2!: Table;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private roleService:RoleService,
    private employeeService:EmployeeService,
    private locationService:LocationService,
    private branchService:BranchService,
    private sectionService:SectionService
  ) {}

  ngOnInit() {


    this.loadEmployees();
    this.loadLocations();
    this.getRoles();
    this.getBranches();
    this.getSections();
    this.getYears();
    this.employeeform = this.fb.group({
      id: [],
      firstName: ['', [Validators.required]],
      lastName: [''],
      birthDate: [''],
      sex: [''],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      address1: [''],
      address2: [''],
      id_t2_1_country: [''],
      id_t2_1_div1: [''],
      id_t2_1_div2: [''],
      id_t2_1_div3: [''],
      local: [''],
      zipCode: [''],
      id_t5_1_m_user_roles: [[]], // array of strings
      roleNames: [[]],
      branchId: [''],
      branchName: [''],
      sectionId: ['',],
      sectionName:[''],
    });
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
    return this.employees
      ? this.first + this.rows >= this.employees.length
      : true;
  }

  isFirstPage(): boolean {
    return this.employees ? this.first === 0 : true;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }


  onCountryChange(event: Event) {
    const countryId = (event.target as HTMLSelectElement).value;
    this.selectedCountry =
      this.countries.find((c) => c.id_t2_1_country === countryId) || null;
    const countryName = this.selectedCountry?.t2_1_country_name;

    // Reset
    this.employeeform.patchValue({ div1: '', div2: '', div3: '' });
    this.div2Options = [];
    this.div3Options = [];

    // Labels
    this.div1Label = this.selectedCountry?.t2_1_div1_called || 'Division 1';
    this.div2Label = this.selectedCountry?.t2_1_div2_called || 'Division 2';
    this.div3Label = this.selectedCountry?.t2_1_div3_called || 'Division 3';

    // Load div1 options
    this.div1Options = this.divisionOnes
      .filter((d) => d.t2_1_country_name === countryName)
      .map((d) => d.t2_1_div1_name);
  }

  onDiv1Change(event: Event) {
    const div1 = (event.target as HTMLSelectElement).value;

    const countryName = this.selectedCountry?.t2_1_country_name;
    this.employeeform.patchValue({ div2: '', div3: '' });
    this.div3Options = [];

    this.div2Options = this.divisionTwos
      .filter(
        (d) => d.t2_1_country_name === countryName && d.t2_1_div1_name === div1
      )
      .map((d) => d.t2_1_div2_name);
  }

  onDiv2Change(event: Event) {
    const div2 = (event.target as HTMLSelectElement).value;
    const countryName = this.selectedCountry?.t2_1_country_name;
    const div1 = this.employeeform.get('div1')?.value;

    this.employeeform.patchValue({ div3: '' });

    this.div3Options = this.divisionThrees
      .filter(
        (d) =>
          d.t2_1_country_name === countryName &&
          d.t2_1_div1_name === div1 &&
          d.t2_1_div2_name === div2
      )
      .map((d) => d.t2_1_div3_name);
  }

  onBranchChange(event:Event) {
    const branchId = (event.target as HTMLSelectElement).value;
    const branch = this.branches.find(b => b.t2_company_branch_id === branchId);
    this.filteredSections = [];
    // patch both the ID and name
  this.employeeform.patchValue({
    branchName: branch?.t2_company_branch_name || '',
    // reset section                    
    sectionId:  '',
    sectionName:''
  });
    
    console.log(this.sections);
    
    this.filteredSections = this.sections.filter(
      (section: any) => section.branch_details.t2_company_branch_id == branchId
    );
  }

  onSectionChange(event:Event) {
    // const sectionId = +(event.target as HTMLSelectElement).value;
    const sectionId: number = this.employeeform.get('sectionId')!.value;
    const section = this.filteredSections.find(s => s.t3_branch_section_id === sectionId);

    this.selectedSectionId = sectionId;
    this.employeeform.patchValue({
      sectionName: section?.t3_section_name || ''
    });
    // this.employeeform.patchValue({ id_t5_1_m_user_roles: '' }); // Reset role when section changes

    const branchId = this.selectedBranchId;
  }

  onRoleCheckboxChange(event: any, role: any) {
    const selectedRoles = this.employeeform.value.id_t5_1_m_user_roles || [];

    if (event.target.checked) {
      selectedRoles.push(role.id_t5_1_sys_roles);
    } else {
      const index = selectedRoles.indexOf(role.id_t5_1_sys_roles);
      if (index >= 0) selectedRoles.splice(index, 1);
    }

    const selectedRoleNames = this.roles
      .filter(r => selectedRoles.includes(r.id_t5_1_sys_roles))
      .map(r => r.t5_1_roles_name);

    this.employeeform.patchValue({
      id_t5_1_m_user_roles: selectedRoles,
      roleNames: selectedRoleNames
    });
  }

  getSelectedRoleNames(): string {
  const selectedRoleIds = this.employeeform.value.id_t5_1_m_user_roles || [];
  if (selectedRoleIds.length === 1) {
    const selectedRole = this.roles.find(role => role.id_t5_1_sys_roles === selectedRoleIds[0]);
    return selectedRole ? selectedRole.t5_1_roles_name : '';
  } else if (selectedRoleIds.length > 1) {
    return `${selectedRoleIds.length} roles selected`;
  } else {
    return '-- Select Roles --';
  }
}


  getRoles(){
    this.roles=this.roleService.getAllroles();
  }

  loadEmployees() {
    this.employees = this.employeeService.getAllEmployees();
  }

  loadLocations(){
    this.countries=this.locationService.getCountries();
    this.divisionOnes=this.locationService.getdivisionOne();
    this.divisionTwos=this.locationService.getdivisionTwo();
    this.divisionThrees=this.locationService.getdivisionThree();
  }

  onGlobalFilter(value: string) {
    this.dt2.filterGlobal(value, 'contains');
  }

  getBranches(){
    this.branches=this.branchService.getBranches();
  }

  getSections(){
    this.sections=this.sectionService.getSection();
  }

  getYears(){
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1950; year--) {
      this.years.push(year);
    }
  }

  showDialog(employee?: any) {
    this.addPopupVisible = true;

    if (employee) {
      this.isEdit = true;
      // this.selectedEmployeeId = employee.id;
      this.employeeform.patchValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        id: employee.id,
        birthDate: employee.birthDate,
        sex: employee.sex,
        email: employee.email,
        mobile: employee.mobile,
        address1: employee.address1,
        address2: employee.address2,
        id_t2_1_country: employee.id_t2_1_country,
        id_t2_1_div1: employee.id_t2_1_div1,
        id_t2_1_div2: employee.id_t2_1_div2,
        id_t2_1_div3: employee.id_t2_1_div3,
        local: employee.local,
        zipCode: employee.zipCode,
        branchId:      employee.branchId,
        branchName:    employee.branchName,
        sectionId:     employee.sectionId,
        sectionName:   employee.sectionName,
        id_t5_1_m_user_roles: employee.id_t5_1_m_user_roles,
        roleNames: employee.roleNames
      
      });
      this.filteredSections = this.sections.filter(
        section => section.branch_details.t2_company_branch_id === employee.branchId
      );
  
      this.employeeform.patchValue({
        sectionId: employee.sectionId,
        sectionName: this.sections.find(s => s.t3_branch_section_id === employee.sectionId)?.t3_section_name || ''
      });
      // this.onBranchChange({ target: { value: employee.branchId } } as any);
      
    } else {
      this.isEdit = false;
      this.employeeform.reset();

      this.filteredSections = [];
      // this.filteredRoles = [];
    }
  }

  onSubmit() {
    console.log(this.employeeform.value);
    
    if (this.employeeform.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill required fields',
      });
      return;
    }

    const formValue = this.employeeform.value;
    // Get the selected branch
    const selectedBranch = this.branches.find(
      (b) => b.t2_company_branch_id === formValue.branchId 
);
    const selectedSection = this.sections.find(
      (s) => s.t3_branch_section_id === formValue.sectionId
    );


    const selectedCountry = this.countries.find(
      (c) => c.id_t2_1_country === formValue.id_t2_1_country
    );

    
    const selectedRoleIds: string[] = formValue.id_t5_1_m_user_roles;
    const selectedRoleNames: string[] = this.roles
      .filter(role => selectedRoleIds.includes(role.id_t5_1_sys_roles))
      .map(role => role.t5_1_roles_name);



    this.employeeform.patchValue({
      country: selectedCountry?.t2_1_country_name,
      branchName: selectedBranch?.t2_company_branch_name || '',
      sectionName: selectedSection?.t3_section_name || '',
      roleNames: selectedRoleNames
    });

    const updatedFormValue = this.employeeform.value;

    if (this.isEdit) {
      const index = this.employees.findIndex(
        (emp) => emp.id === updatedFormValue.id
      );

      if (index !== -1) {
        this.employees[index] = {
          ...this.employees[index],
          ...updatedFormValue,
          // branchName: selectedBranch?.branchName || '',
          // sectionName: selectedSection?.sectionName || '',
          // roleName: selectedRole?.roleName || '',
        };
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee updated successfully',
        });
      }
    } else {
      const newEmployee: Employee = {
        id:
          this.employees.length > 0
            ? Math.max(...this.employees.map((emp) => emp.id)) + 1
            : 1,
        ...updatedFormValue,
        // branchName: selectedBranch?.branchName || '',
        // sectionName: selectedSection?.sectionName || '',
        // roleName: selectedRole?.roleName || '', // Ensure branchName is updated
        status: 'active',
      };
      this.employees.push(newEmployee);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee added successfully',
      });
    }

    this.addPopupVisible = false;
    this.employeeform.reset();
    this.isEdit = false;
  }

  delete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.employees = this.employees.filter(
          (employee) => employee.id !== id
        );

        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
          life: 3000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  toggleStatus(employee: Employee) {
    employee.status = employee.status === 'active' ? 'inactive' : 'active';
    this.messageService.add({
      severity: 'info',
      summary: 'Status Changed',
      life: 1000,
    });
  }
}
