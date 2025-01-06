import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tableSettings } from './table.model';
import { SelectionModel } from '@angular/cdk/collections';
import { AppService } from '../../../app.service';
import { AlertService } from '../../alert/alert.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();
  @Input() tableSetting!: tableSettings;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  selection = new SelectionModel<any>(true, []);

  constructor(private mainService: AppService, private alertService: AlertService, public commonServices: AppService,) {

  }
  ngOnInit() {
    this.displayedColumns = [...this.tableSetting.columns];
    if (this.tableSetting.showCheckbox) {
      this.displayedColumns.unshift('showCheckbox');
    }
    if (this.tableSetting.action.length > 0) {
      this.displayedColumns.push('actions');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableSetting']) {
      this.displayedColumns = [...this.tableSetting.columns];
      if (this.tableSetting.showCheckbox) {
        this.displayedColumns.unshift('showCheckbox');
      }
      if (this.tableSetting.action.length > 0) {
        this.displayedColumns.push('actions');
      }
      this.dataSource = new MatTableDataSource(this.tableSetting.rows);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.tableSetting.rows);
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableSetting.rows.length;
    return numSelected === numRows;
  }

  someSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected > 0 && numSelected < this.tableSetting.rows.length;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.tableSetting.rows.forEach(row => this.selection.select(row));
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
    console.log(this.selection)
  }

  getActiveInactive(event: any) {
    if (this.tableSetting.showActiveInactive.apiUrl) {
      this.alertService.info('Data is loading..!')
      this.mainService.post(this.tableSetting.showActiveInactive.apiUrl, event.checked).subscribe({
        next: (res: any) => {
          this.dataSource = new MatTableDataSource(res);
        },
        error: (err: any) => {
          this.tableSetting.isActive = false;
          if (err.error) {
            this.alertService.error(err?.error?.error ?? 'Oops! Something went wrong. Please contact support if the issue persists.');
          } else {
            this.commonServices.sendErrorMessage(err.status.toString());
          }
        }
      })
    } else {
      this.tableSetting.isActive = false;
      this.alertService.error('Please provide api Url in your table settings');
    }

  }

}


