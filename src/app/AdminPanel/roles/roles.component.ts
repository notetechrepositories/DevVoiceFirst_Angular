import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RoleService } from '../../Services/RoleService/role.service';

export interface Role {
  id_t5_1_sys_roles: string;
  t8_1_roles_name: string;
  t8_1_all_location_access: string;
  t8_1_all_issues: string;
  role_with_programs?: {
     
      t8_add: boolean;
      t8_view: boolean;
      t8_edit: boolean;
      t8_delete: boolean;
      t8_update_from_excel:boolean;
      t8_download_excel:boolean;
      t8_download_pdf:boolean;
    
  };
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  first: number = 0;
  rows: number = 10;
  loading: boolean = true;

  roles: Role[] = [];
  addPopupVisible:boolean=false;
  roleForm!: FormGroup;
  isEdit: boolean = false;
  editingIndex: number | null = null;
  searchKeyword: string = '';
modules:any;
  // modules = ['employee', 'issue-type', 'branch', 'reported issue'];

  @ViewChild('dt2') dt2!: Table;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private roleService:RoleService
  ) {}

  ngOnInit() {
    this.getRoles();
    this.roleForm = this.fb.group({
      // id_t5_1_company_roles: [''],
      // id_t5_1_sys_roles: [''],
      t8_1_roles_name: ['', [Validators.required]],
      t8_1_all_location_access: [false],
      t8_1_all_issues: [false],
      permissions: this.fb.group({})
    });
  
    this.initPermissions();  // <-- Ensure it's initialized
  }

  initPermissions(role: any = null) {
  const filterRole = { filters: {} };

  this.roleService.getprograms(filterRole).subscribe((res: any) => {
    const permissionsGroup: { [key: string]: FormGroup } = {};
    
    this.modules = res.data?.Items || [];
console.log(this.modules);

    this.modules.forEach((mod:any) => {
         const programKey = mod.t7_program_name; 
      permissionsGroup[mod] = this.fb.group({
        t8_add: [role?.permissions?.[mod]?.create ==='y'],
        t8_view: [role?.permissions?.[mod]?.read ==='y'],
        t8_edit: [role?.permissions?.[mod]?.update ==='y'],
        t8_delete: [role?.permissions?.[mod]?.delete ==='y'],
        t8_update_from_excel: [role?.permissions?.[mod]?.t8_update_from_excel ==='y'],
        t8_download_excel: [role?.permissions?.[mod]?.t8_download_excel ==='y'],
        t8_download_pdf: [role?.permissions?.[mod]?.t8_download_pdf ==='y'],
      });
    });

    this.roleForm.setControl('permissions', this.fb.group(permissionsGroup));
  });
}


  onGlobalFilter(value: string) {
    this.dt2.filterGlobal(value, 'contains');
  }

getRoles() {
  const filterRole = {
      filters: {},
    };
  this.roleService.getAllroles(filterRole).subscribe((res: any) => {
    console.log(res);
    
  this.roles = res.data?.Items || [];
    console.log(this.roles);
    
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
    return this.roles ? this.first + this.rows >= this.roles.length : true;
  }

  isFirstPage(): boolean {
    return this.roles ? this.first === 0 : true;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }


  showDialog(role?: Role) {
    this.addPopupVisible = true;
  
    if (role) {
      this.isEdit = true;
      this.editingIndex = this.roles.findIndex(r => r.id_t5_1_sys_roles === role.id_t5_1_sys_roles);
  
      // Only call once, before patchValue
      this.initPermissions(role);
  
      const data = {
        id_t5_1_company_roles: role.id_t5_1_sys_roles,
        id_t5_1_sys_roles: role.id_t5_1_sys_roles,
        t8_1_roles_name: role.t8_1_roles_name,
        t8_1_all_location_access: role.t8_1_all_location_access === 'y',
        t8_1_all_issues: role.t8_1_all_issues === 'y'
      };
  
      this.roleForm.patchValue(data);
    } else {
      this.isEdit = false;
      this.editingIndex = null;
      this.roleForm.reset();
      this.initPermissions();
    }
  }
  


  onSubmit() {
    const data = this.roleForm.value;
    data.t8_1_all_location_access = data.t8_1_all_location_access ? 'y' : 'n';
    data.t8_1_all_issues = data.t8_1_all_issues ? 'y' : 'n';
   
    const formattedPermissions: any = {};
    this.modules.forEach((mod:any) => {
      const permGroup = data.permissions[mod];
      formattedPermissions[mod] = {
        t8_add: permGroup.create ? 'y' : 'n',
        t8_view: permGroup.read ? 'y' : 'n',
        t8_edit: permGroup.update ? 'y' : 'n',
        t8_delete: permGroup.delete ? 'y' : 'n',
        t8_update_from_excel: permGroup.t8_update_from_excel ? 'y' : 'n',
        t8_download_excel: permGroup.t8_download_excel ? 'y' : 'n',
        t8_download_pdf: permGroup.t8_download_pdf ? 'y' : 'n',
      };
    });
    data.permissions=formattedPermissions;
      console.log(data);
      
      this.roleService.insertRole(data).subscribe((res)=>{

          });
    if (this.isEdit && this.editingIndex !== null) {
      this.roles[this.editingIndex] = {
        ...this.roles[this.editingIndex],
        ...data
      };
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Role updated successfully' });
    } else {
      this.roles.push(data);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Role added successfully' });
    }

    this.addPopupVisible = false;
  }

  delete(event: Event, roleToDelete: Role) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this role?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.roles = this.roles.filter(role => role !== roleToDelete);
        this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Role deleted' });
      },
      reject: () => {}
    });
  }
}
