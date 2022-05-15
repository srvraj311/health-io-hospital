import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  spinnerVisible : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  spinnerVisibleObservable = this.spinnerVisible.asObservable();

  constructor(private snack : MatSnackBar) {

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

}
