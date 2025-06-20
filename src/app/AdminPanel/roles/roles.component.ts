import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RoleService } from '../../Services/RoleService/role.service';

export interface Role {
  id_t5_1_sys_roles: string;
  t5_1_roles_name: string;
  t5_1_all_location_access: string;
  t5_1_all_issues: string;
  permissions?: {
    [module: string]: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
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

  modules = ['employee', 'issue-type', 'branch', 'reported issue'];

  @ViewChild('dt2') dt2!: Table;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private roleService:RoleService
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.roleForm = this.fb.group({
      id_t5_1_company_roles: [''],
      id_t5_1_sys_roles: [''],
      t5_1_roles_name: ['', [Validators.required]],
      t5_1_all_location_access: [false],
      t5_1_all_issues: [false],
      permissions: this.fb.group({})
    });
  
    this.initPermissions();  // <-- Ensure it's initialized
  }

  initPermissions(role: any = null) {
    const permissionsGroup: any = {};
    this.modules.forEach(mod => {
      permissionsGroup[mod] = this.fb.group({
        create: [role?.permissions?.[mod]?.create || false],
        read: [role?.permissions?.[mod]?.read || false],
        update: [role?.permissions?.[mod]?.update || false],
        delete: [role?.permissions?.[mod]?.delete || false],
      });
    });
    this.roleForm.setControl('permissions', this.fb.group(permissionsGroup));
  }

  onGlobalFilter(value: string) {
    this.dt2.filterGlobal(value, 'contains');
  }

  loadRoles() {
    this.roles = this.roleService.getAllroles();
    this.loading = false;
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
        t5_1_roles_name: role.t5_1_roles_name,
        t5_1_all_location_access: role.t5_1_all_location_access === 'y',
        t5_1_all_issues: role.t5_1_all_issues === 'y'
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
    data.t5_1_all_location_access = data.t5_1_all_location_access ? 'y' : 'n';
    data.t5_1_all_issues = data.t5_1_all_issues ? 'y' : 'n';

    const formattedPermissions: any = {};
    this.modules.forEach(mod => {
      formattedPermissions[mod] = data.permissions[mod];
    });
    data.permissions = formattedPermissions;

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
