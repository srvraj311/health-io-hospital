import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {BehaviorSubject} from "rxjs";
import {ElectronService} from "./electron.service";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private spinnerVisible : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  spinnerVisibleObservable = this.spinnerVisible.asObservable();
  private navOpen : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  getNavOpen = this.navOpen.asObservable();
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
}
