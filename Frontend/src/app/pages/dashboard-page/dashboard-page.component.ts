import { Component } from '@angular/core';
import { tableSettings } from '../../shared/components/table/table.model';
import { AlertService } from '../../shared/alert/alert.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardComponent {  
  data1: any = [];
  data2 = [
    { sno: 1, name: 'Hydrogen', value: 1.0079, state: 'H', isDeleted: true },
    { sno: 2, name: 'Helium', value: 4.0026, state: 'He', isDeleted: false },
    { sno: 3, name: 'Lithium', value: 6.941, state: 'Li', isDeleted: false },
  ]
  tableSetting1: tableSettings = {
    tableheading: 'Example 1',
    columns: ['content', 'createdAt', 'id'],
    rows: this.data1,
    action: [
      { icon: 'edit', label: 'Edit', color: '#0d9488', callBack: () => { }, isDisabled: false, isHidden: false },
      { icon: 'send', label: 'Send', color: '#4f46e5', callBack: () => { }, isDisabled: false, isHidden: false },
      { icon: 'delete', label: 'Delete', color: '#f43f5e', callBack: () => { }, isDisabled: false, isHidden: false },
    ],
    isPagination: true,
    showAddNew: { isAddNew: true, callBack: () => this.openAddNewForm() },
    showActiveInactive: { showActiveBtn: true, apiUrl: '' },
    isShort: false,
    direction: '',
    showCheckbox: true,
  };
  tableSetting2: tableSettings = {
    tableheading: 'Example 2',
    columns: ['sno', 'name', 'value', 'state'],
    rows: this.data2,
    action: [
      { icon: 'delete', label: 'Delete', color: '#f43f5e', callBack: (row: any) => this.deleteFromTable2(row), isDisabled: false, isHidden: false },
    ],
    isPagination: true,
    showAddNew: { isAddNew: true, callBack: () => this.openAddNewForm() },
    showActiveInactive: { showActiveBtn: true, apiUrl: 'manpreeturl' },
    isShort: false,
    direction: '',
    showCheckbox: true,
  };
  summaryItems = [
    { value: 21, label: 'Due Tasks', color: 'primary' },
    { value: 17, label: 'Overdue', color: 'danger' },
    { value: 24, label: 'Issues', color: 'warn' },
    { value: 38, label: 'Features', color: 'info' },
  ];
  userInfo: any;
  constructor(
    public alertService: AlertService,
    public commonServices: AppService,
  ) {
    }


  deleteFromTable2(row: any) {
    let idx = this.data2.findIndex((x: any) => x.sno == row.sno)
    this.data2.splice(idx, 1);
    this.tableSetting2 = { ...this.tableSetting2, rows: [...this.data2] };
    this.alertService.success('Data deleted successfully');
  }

  openAddNewForm() {
    this.alertService.info('Please Create New Form ')
  }
}
