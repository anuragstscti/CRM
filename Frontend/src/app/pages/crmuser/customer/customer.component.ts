import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  mainForm: FormGroup;
  result :any;
  genderList:any;
  PartyList:any
  countries = [
    { code: 'IN', name: 'India' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' }
  ];
  states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' }
  ];
  displayedColumns: string[] = ['firstName', 'phoneNumber', 'emailAddress', 'accountNumber'];
  dataSource:any;
  

  constructor(private readonly fb:FormBuilder,private readonly commonService:AppService){

    this.mainForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      partyType: [],
      accountNumber: [''],
      middleName: [''],
      gender: [],
      dateOfBirth: [''],
      additionalInfo: [''],
      phoneNumber: [''],
      phoneCountry: [''],
      mobilePhoneNumber: [''],
      mobileCountry: [''],
      homePhoneNumber: [''],
      homeCountry: [''],
      businessPhoneNumber: [''],
      businessCountry: [''],
      emailAddress: [''],
      businessEmailAddress: [''],
      personalEmailAddress: [''],
      streetAddress:[''],
      aptSuite:[''],
      postalCode:[''],
      city:[''],
      stateProvince:[''],
      country:['']
    });
  }
  dateOnly:any
  saveUser(){
    
    if(this.mainForm.controls['dateOfBirth'].value){
      const date = new Date(this.mainForm.controls['dateOfBirth'].value);
      this.dateOnly = date.toLocaleDateString('en-CA');    
    }
    let obj=
    {
      "firstName": this.mainForm.controls['firstName'].value,    
      "middleName": this.mainForm.controls['middleName'].value,    
      "lastName": this.mainForm.controls['lastName'].value,    
      "bussinessName": this.mainForm.controls['city'].value,    
      "ctGenderId": this.mainForm.controls['gender'].value,    
      "ctPartyTypeId": this.mainForm.controls['partyType'].value,    
      "birthDate": this.dateOnly || null,    
      "accountNumber": this.mainForm.controls['accountNumber'].value,    
      "additionalInformation": this.mainForm.controls['city'].value,    
      "emailAddress": this.mainForm.controls['emailAddress'].value,    
      "mailingAddress": {    
        "address1": this.mainForm.controls['city'].value,    
        "address2": this.mainForm.controls['city'].value,    
        "country": this.mainForm.controls['country'].value,    
        "postalCode": this.mainForm.controls['postalCode'].value,    
        "province": this.mainForm.controls['city'].value,    
        "city": this.mainForm.controls['city'].value    
      },    
      "phoneNumber": this.mainForm.controls['phoneNumber'].value,    
      "domainName": this.mainForm.controls['city'].value    
    }
    let url = 'api/CustomerProfile/addCustomerProfile'
     this.commonService.post(url,obj).subscribe(res=>{
      this.result = res;
      this.mainForm.reset()
     })
  }

  ngOnInit(){
    this.getTableData()
    this.getGenderTypeList()
    this.getPartyTypeList()
    this.getToken()
  }
    
  getToken() {
    // localStorage.getItem('')
  }

  getGenderTypeList(){
    let url = 'api/CommonType/getGenderList'
    this.commonService.get(url).subscribe(res=>{
      this.genderList = res
    })
  }

  getPartyTypeList(){
  let url = 'api/CommonType/getPartyTypeList'
  this.commonService.get(url).subscribe(res=>{
    this.PartyList = res
  })

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
    
}
