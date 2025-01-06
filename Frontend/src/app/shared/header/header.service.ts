import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class HeaderService {
  // signel strength change observable
  private signalStrength$ = new BehaviorSubject<number>(0);

  // Change Theme  Size observable 
  private changeSizeEvt = new Subject<string>();
  changeSize$: Observable<string> = this.changeSizeEvt.asObservable();
  
  private sendDateData = new BehaviorSubject(null);
  sendDateData$ = this.sendDateData.asObservable();

  sendDateDatas(data: any) {
    this.sendDateData.next(data);
  }

  constructor() {
    // Manage SIgnla strength change observable
    setInterval(() => {
      this.estimateSignalStrength();
      window.addEventListener('online', () => this.estimateSignalStrength());
      window.addEventListener('offline', () => this.signalStrength$.next(0));
    }, 1000)
  }
  // Network Signal Strength Start
  private async estimateSignalStrength() {
    if (!navigator.onLine) {
      this.signalStrength$.next(0);
      return;
    }

    const latency = this.measureLatency();
    const strength = this.calculateSignalStrength(latency);
    this.signalStrength$.next(strength);
  }

  private measureLatency() {
    const startTime = performance.now();
    return performance.now() - startTime

  }

  // private measureLatency(): Promise<number> {
  //   const startTime = performance.now();
  //   return fetch('https://www.google.com/', { method: 'HEAD', mode: 'no-cors' })
  //     .then(() => performance.now() - startTime)
  //     .catch(() => 1000); // fallback to high latency
  // }

  private calculateSignalStrength(latency: number): number {
    if (latency < 100) return 4;
    if (latency < 200) return 3;
    if (latency < 500) return 2;
    return 1;
  }

  getSignalStrength(): Observable<number> {
    return this.signalStrength$.asObservable();
  }
  // Network Signal Strength End


  manageSize(x: string) {
    this.changeSizeEvt.next(x);
  }
}
