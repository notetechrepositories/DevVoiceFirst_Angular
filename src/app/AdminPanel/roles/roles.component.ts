import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RoleService } from '../../Services/RoleService/role.service';

export interface Role {
  t8_1_role_id: string;
  t8_1_roles_name: string;
  t8_1_all_location_access: string;
  t8_1_all_issues: string;
  role_programs?: {
    t7_program_id: string;
    t8_2_add: string;
    t8_2_view: string;
    t8_2_edit: string;
    t8_2_delete: string;
    t8_2_update_from_excel: string;
    t8_2_download_excel: string;
    t8_2_download_pdf: string;
  }[];
}
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {
  first: number = 0;
  rows: number = 10;
  loading: boolean = true;

  roles: Role[] = [];
  addPopupVisible: boolean = false;
  roleForm!: FormGroup;
  isEdit: boolean = false;
  editingIndex: number | null = null;
  searchKeyword: string = '';
  modules: any;
  payload:any;
  @ViewChild('dt2') dt2!: Table;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.getRoles();
    this.roleForm = this.fb.group({
      t8_1_roles_name: ['', Validators.required],
      t8_1_all_location_access: [false],
      t8_1_all_issues: [false],
      permissions: this.fb.group({}),
    });

    this.initPermissions(); // load modules initially
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
  initPermissions(role: any = null) {
    const filterRole = { filters: {} };

    this.roleService.getprograms(filterRole).subscribe((res: any) => {
      const permissionsGroup: { [key: string]: FormGroup } = {};

      this.modules = res.data?.Items || [];

      this.modules.forEach((mod: any) => {
        const key = mod.t7_program_id;

        permissionsGroup[key] = this.fb.group({
          t8_2_add: [role?.role_programs?.[key]?.t8_2_add === 'y'],
          t8_2_view: [role?.role_programs?.[key]?.t8_2_view === 'y'],
          t8_2_edit: [role?.role_programs?.[key]?.t8_2_edit === 'y'],
          t8_2_delete: [role?.role_programs?.[key]?.t8_2_delete === 'y'],
          t8_2_update_from_excel: [
            role?.role_programs?.[key]?.t8_2_update_from_excel === 'y',
          ],
          t8_2_download_excel: [
            role?.role_programs?.[key]?.t8_2_download_excel === 'y',
          ],
          t8_2_download_pdf: [role?.role_programs?.[key]?.t8_2_download_pdf === 'y'],
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
      this.roles = res.data?.Items || [];
    });
    console.log(this.roles);
    
  }

  showDialog(role?: Role) {
    this.addPopupVisible = true;
    console.log(this.roles);
    
    if (role) {
      this.isEdit = true;
      this.editingIndex = this.roles.findIndex(
        (r) => r.t8_1_role_id === role.t8_1_role_id
      );
      console.log(role.role_programs);
      if (role && Array.isArray(role.role_programs)) {
        const permissionsFormGroup: { [key: string]: FormGroup } = {};
        console.log(role.role_programs);
        
        for (const program of role.role_programs) {
          permissionsFormGroup[program.t7_program_id] = this.fb.group({
            t8_2_add: [program.t8_2_add === 'y'],
            t8_2_view: [program.t8_2_view === 'y'],
            t8_2_edit: [program.t8_2_edit === 'y'],
            t8_2_delete: [program.t8_2_delete === 'y'],
            t8_2_update_from_excel: [program.t8_2_update_from_excel === 'y'],
            t8_2_download_excel: [program.t8_2_download_excel === 'y'],
            t8_2_download_pdf: [program.t8_2_download_pdf === 'y'],
          });
        }

        console.log(permissionsFormGroup);
        

        this.roleForm.setControl('permissions', this.fb.group(permissionsFormGroup));
      }

      const data = {
        t8_1_roles_name: role.t8_1_roles_name,
        t8_1_all_location_access: role.t8_1_all_location_access === 'y',
        t8_1_all_issues: role.t8_1_all_issues === 'y',
      };

      this.roleForm.patchValue(data);
      console.log(this.roleForm.value);
      
    } else {
      this.isEdit = false;
      this.editingIndex = null;
      this.roleForm.reset();
      this.initPermissions();
    }
  }

  onSubmit() {
    const formValue = this.roleForm.value;

    const t8_1_all_location_access = formValue.t8_1_all_location_access
      ? 'y'
      : 'n';
    const t8_1_all_issues = formValue.t8_1_all_issues ? 'y' : 'n';

    const role_programs = this.modules.map((mod: any) => {
      const key = mod.t7_program_id;
      const permGroup = formValue.permissions[key];

      return {
        t7_program_id: key,
        t8_2_add: permGroup.t8_2_add ? 'y' : 'n',
        t8_2_view: permGroup.t8_2_view ? 'y' : 'n',
        t8_2_edit: permGroup.t8_2_edit ? 'y' : 'n',
        t8_2_delete: permGroup.t8_2_delete ? 'y' : 'n',
        t8_2_update_from_excel: permGroup.t8_2_update_from_excel ? 'y' : 'n',
        t8_2_download_excel: permGroup.t8_2_download_excel ? 'y' : 'n',
        t8_2_download_pdf: permGroup.t8_2_download_pdf ? 'y' : 'n',
      };
    });

    this.payload = {
      t8_1_roles_name: formValue.t8_1_roles_name,
      t8_1_all_location_access,
      t8_1_all_issues,
      role_programs,
    };

    if (this.isEdit && this.editingIndex !== null) {
      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Role updated successfully',
      });
    } else {
      this.roleService.insertRole(this.payload).subscribe({
        next: (res: any) => {
           console.log(res);
          if (res.status == 200) {
           this.roles.push(this.payload);
            this.messageService.add({
              severity: 'success',
              summary: 'Updated',
              detail: 'Role updated successfully',
            });
            this.addPopupVisible = false;
          }
         
          
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to save role',
          });
        },
      });
    }
  }

  delete(event: Event, roleToDelete: Role) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this role?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.roles = this.roles.filter((role) => role !== roleToDelete);
        this.messageService.add({
          severity: 'info',
          summary: 'Deleted',
          detail: 'Role deleted',
        });
      },
      reject: () => {},
    });
  }
}
