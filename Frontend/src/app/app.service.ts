import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map } from 'rxjs';
// import config from './config.json';
import { environment as config } from '../environments/environment';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { AlertService } from './shared/alert/alert.service';
// data.model.ts
export interface DataPayload {
  isToggled: boolean;
  callCare: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private activeTabSubject = new BehaviorSubject<any>(0);
  activeTab$ = this.activeTabSubject.asObservable();

  // Loader observable
  private showLoaderEvt = new Subject<boolean>();
  showLoaderEvt$ = this.showLoaderEvt.asObservable();
  // Change Theme observable
  private changeThemeEvt = new Subject<string>();
  changeTheme$ = this.changeThemeEvt.asObservable();
  // Side navigation toggle observable
  public sideNavToggle = new BehaviorSubject<DataPayload>({ isToggled: false, callCare: '' });
  sideNavToggle$ = this.sideNavToggle.asObservable();

  public sideNavActionBtnSub = new Subject<any>();
  sideNavActionBtnSub$ = this.sideNavActionBtnSub.asObservable();

  public unitStatusData = new BehaviorSubject<any>(null);
  unitStatusData$ = this.unitStatusData.asObservable();

  public cadStatusData = new BehaviorSubject<any>(null);
  cadStatusData$ = this.cadStatusData.asObservable();

  private sessionExpiredSubject = new BehaviorSubject<boolean>(false);
  sessionExpired$ = this.sessionExpiredSubject.asObservable();

  private commonSubject = new BehaviorSubject<Object>(false);
  commonSubject$ = this.commonSubject.asObservable();

  public callSSEStream = new Subject<any>();
  // callSSEStream$ = this.callSSEStream.asObservable();

  public dynamicDataSource = new BehaviorSubject<any>(null);  // Default value is null
  dynamicData$ = this.dynamicDataSource.asObservable();  // Observable to subscribe to

  // private dynamicDataSource = new BehaviorSubject<DataPayload>({ var1: '', var2: 0 });
  // dynamicData$ = this.dynamicDataSource.asObservable();



  updateDynamicData(newData: any): void {
    this.dynamicDataSource.next(newData);  // Push the new data to subscribers
  }

  setActiveTab(tab: any) {
    this.activeTabSubject.next(tab);
  }

  sideNavHashRouting(value: any) {
    this.sideNavActionBtnSub.next(value);
  }

  callCommonObservable(value: Object) {
    this.commonSubject.next(value);
  }
  public baseUrl = config.urls.apiUrl;
  constructor(public http: HttpClient, public location: Location, public router: Router, public zone: NgZone, public alertServices: AlertService) {
  }

  protected get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage['authToken'] ?? '{}').accessToken,
      'Accept': 'application/json, text/plain, */*',
      'sessionId': JSON.parse(localStorage['authToken'] ?? '{}').sessionId ?? 0,
      'Content-Type': 'application/json'
    });

    return { headers };
  }

  manageLoader(x: any) {
    this.showLoaderEvt.next(x);
  }

  manageTheme(x: string) {
    this.changeThemeEvt.next(x);
  }



  sessionExpirePopUpSubjectFun(state: boolean = false) {
    this.sessionExpiredSubject.next(state);
  }
  get<T>(endpoint: string): Observable<T> {
    this.manageLoader(true);
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, this.requestHeaders)
      .pipe(
        map(response => {
          this.manageLoader(false);
          return response;
        }),
        catchError(error => {
          console.error('Error fetching data', error);
          this.manageLoader(false);
          throw error;
        })
      );
  }

  sendErrorMessage(status: string) {
    switch (status) {
      case '500':
        this.alertServices.error('Internal server error');
        break;
      case '401':
        this.alertServices.error('Session expired');
        break;
      default:
        this.alertServices.error('An unexpected error occurred');
    }
  }




  getMenu<T>(endpoint: string): Observable<T> {
    this.manageLoader(true);
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, this.requestHeaders)
      .pipe(
        map(response => {
          this.manageLoader(false);
          return response;
        }),
        catchError(error => {
          console.error('Error fetching data', error);
          this.manageLoader(false);
          throw error;
        })
      );
  }
  postStack<T>(endpoint: string, data: any): Observable<T> {
    this.manageLoader(true);
    return this.http.post<T>(`${endpoint}`, data, this.requestHeaders)
      .pipe(
        map(response => {
          this.manageLoader(false);
          return response;
        }),
        catchError(error => {
          console.error('Error fetching data', error);
          this.manageLoader(false);
          throw error;
        })
      );
  }
  post<T>(endpoint: string, data: any, showLoader: boolean = true): Observable<T> {
    this.manageLoader(showLoader);
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, this.requestHeaders)
      .pipe(
        map(response => {
          this.manageLoader(false);
          return response;
        }),
        catchError(error => {
          console.error('Error fetching data', error);
          this.manageLoader(false);
          throw error;
        })
      );
  }


  post1<T>(endpoint: string, data: any, showLoader: boolean = true): Observable<T> {
    this.manageLoader(showLoader);
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, this.requestHeaders)
      .pipe(
        map(response => {
          this.manageLoader(false);
          return response;
        }),
        catchError(error => {
          console.error('Error fetching data', error);
          this.manageLoader(false);
          throw error;
        })
      );
  }


  put<T>(endpoint: string, data: any): Observable<T> {
    this.manageLoader(true);
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, this.requestHeaders)
      .pipe(
        map(response => {
          this.manageLoader(false);
          return response;
        }),
        catchError(error => {
          console.error('Error fetching data', error);
          this.manageLoader(false);
          throw error;
        })
      );
  }

  delete<T>(endpoint: string): Observable<T> {
    this.manageLoader(true);
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, this.requestHeaders)
      .pipe(
        map(response => {
          this.manageLoader(false);
          return response;
        }),
        catchError(error => {
          this.manageLoader(false);
          throw error;
        })
      );
  }

  public eventSource!: XMLHttpRequest;

  // callSSE(endpoint: string) {
  //   this.eventSource = new XMLHttpRequest();
  //   this.eventSource.open('GET', `http://GTC-VM-162.GTC.local:9192/${endpoint}`, true);

  //   this.eventSource.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(localStorage['authToken'] ?? '{}').accessToken);
  //   this.eventSource.setRequestHeader('Accept', 'application/json, text/plain, */*');
  //   this.eventSource.setRequestHeader('sessionId', '240000278'); // Replace with your actual session ID
  //   this.eventSource.setRequestHeader('Content-Type', 'application/json');

  //   this.eventSource.responseType = 'text';

  //   this.eventSource.onreadystatechange = () => {
  //     if (this.eventSource.status === 200) {
  //         this.callSSEStream.next(this.eventSource.responseText); // Emit the latest parsed data;
  //     } 
  //   };

  //   this.eventSource.send();
  // }




  callSSE(endpoint: string): Observable<any> {
    return new Observable((observer) => {
      const eventSource = new XMLHttpRequest();
      eventSource.open('GET', `http://GTC-VM-162.GTC.local:9192/${endpoint}`, true);

      eventSource.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(localStorage['authToken'] ?? '{}').accessToken);
      eventSource.setRequestHeader('Accept', 'application/json, text/plain, */*');
      eventSource.setRequestHeader('sessionId', '240000278'); // Replace with your actual session ID
      eventSource.setRequestHeader('Content-Type', 'application/json');

      eventSource.responseType = 'text';

      eventSource.onreadystatechange = () => {
        if (eventSource.readyState === XMLHttpRequest.DONE && eventSource.status === 200) {
          observer.next(eventSource.responseText); // Emit the response text
          observer.complete();
        } else if (eventSource.readyState === XMLHttpRequest.DONE) {
          observer.error(eventSource.statusText || 'Request failed');
        }
      };

      eventSource.onerror = () => {
        observer.error('A network error occurred');
      };

      eventSource.send();
    });
  }


  disconnect() {
    if (this.eventSource) {
      this.eventSource.abort();
    }
  }

  getData(): Observable<any> {
    return this.callSSEStream.asObservable();
  }

  goBack() {
    this.location.back();
  }

  currentModuleName() {
    return this.router.url.toLowerCase().includes('cad')? 'cad': this.router.url.toLowerCase().includes('aes')? 'aes':'';
  }

}
