import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {BehaviorSubject} from "rxjs";
import {ElectronService} from "./electron.service";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // Spinner Overlays on Screens
  private spinnerVisible : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  spinnerVisibleObservable = this.spinnerVisible.asObservable();
  // Navigation Panel
  private navOpen : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  getNavOpen = this.navOpen.asObservable();
  // Spare Observer for other components
  private waiting = new BehaviorSubject<boolean>(false);
  getWaiting = this.waiting.asObservable();
  // View Counts of Hospital
  private views : BehaviorSubject<string> = new BehaviorSubject<string>('0');
  getViews = this.views.asObservable();

  constructor(private snack : MatSnackBar, private electron:ElectronService) {

  }
  toggleSideNav(){
    this.navOpen.next(!this.navOpen.getValue());
  }
  showPositiveSnack(message : string){
    this.snack.open(message, undefined, {
      duration : 3000,
      panelClass : 'green'
    })
  }
  showErrorSnack(message : string){
    this.snack.open(message, undefined, {
      duration : 3000,
      panelClass : 'red'
    })
  }

  showProgressSpinner(){
    this.spinnerVisible.next(true);
  }
  hideProgressSpinner(){
    this.spinnerVisible.next(false);
  }

  isElectron(){
    if (this.electron.isElectron) {
      console.log('Run in electron');
      return true;
    } else {
      console.log('Run in browser');
      return false;
    }
  }

  setWaiting(val : boolean){
    this.waiting.next(val);
  }

  setCount(count : string) {
    this.views.next(count);
  }
}
