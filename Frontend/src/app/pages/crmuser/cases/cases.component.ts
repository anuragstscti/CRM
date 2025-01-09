import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../../app.service';
import { MatPaginator } from '@angular/material/paginator';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.scss'
})
export class CasesComponent {
  displayedColumns: string[] = ['firstName', 'phoneNumber', 'emailAddress', 'accountNumber'];
  dataSource :any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    
  }

  constructor(private readonly commonService:AppService){

  }
  ngOnInit(){
    this.getTableData()
  }

getTableData(){
let id = localStorage.getItem('appUserID');
let url = `api/CustomerProfile/getCustomerProfileList/${id}`;
this.commonService.get(url).subscribe(res=>{
  this.dataSource = res
  this.resultLenght = this.dataSource.length
  this.dataSource.paginator = this.paginator;
})
}
currentPageIndex:number = 0;
currentPage: number = 1;
pageIndex: number = 1;
pageSize: number = 5;
resultLenght = 0;
getDatas(event:any) {
  if(event.pageSize!=this.pageSize){
   this.currentPageIndex=0;
    this.currentPage =this.pageIndex
    this.pageSize=event.pageSize;
    // this.resultsLength=0;
    // this.filterDatas = {
    //   RoleName: this.searchForm.get('RoleName').value
    // }
    
    // this.getHistoryData(this.currentPage, this.pageSize, this.filterDatas);

  }
  else if (event.previousPageIndex < event.pageIndex) {
   this.currentPageIndex=event.pageIndex;
    this.currentPage = event.pageIndex + 1;
    this.pageSize=event.pageSize;

    // this.getHistoryData(this.currentPageIndex, this.pageSize, this.filterDatas);

  }
  else if (event.previousPageIndex > event.pageIndex) {
    this.currentPageIndex=event.pageIndex;
    this.currentPage = event.previousPageIndex-1;
    this.pageSize=event.pageSize;

    // this.getHistoryData(this.currentPageIndex, this.pageSize, this.filterDatas);

  }
  else {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    // this.getHistoryData(this.currentPage, this.pageSize, this.filterDatas);

  }
}

// getHistoryData(currentPage, pageSize, filter?) {
//   let postData = {};
//   postData =
//   {
//     "page": currentPage,
//     "pageSize": pageSize,
//     "totalCount": 0,
//     "isDeleted": false,
//     "userId": this.userdata.id,
//     'RoleName': filter?.RoleName || '',
//     'CreatedName': filter?.CreatedBy || ''
//   }
//   this.auditHistoryService.getAuditHistoryData(postData).subscribe(data => {
//     this.auditdata = data;
//     this.dataSource = this.auditdata.items;
//     this.resultLenght = this.auditdata.totalCount;
//     this.dataSource.paginator = this.paginator;
//   });
// }
}
