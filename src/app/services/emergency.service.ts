import {Injectable} from '@angular/core';
import {UiService} from "./ui.service";
import {ApiService} from "./api.service";
import {UserService} from "./user.service";
import {BehaviorSubject} from "rxjs";
import {EmergencyCase} from "../Models/HelperModals";

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  // Observable
  private emergencyList: BehaviorSubject<EmergencyCase[]> = new BehaviorSubject<EmergencyCase[]>([]);
  getEmergencyList = this.emergencyList.asObservable();
  // Show add emergency Button
  showAdd: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  getShowAdd = this.showAdd.asObservable();
  // Constructor
  constructor(private ui: UiService, private api: ApiService, private user: UserService) {

  }

  updateShowAdd(value: boolean) {
    this.showAdd.next(value);
  }
  updateEmergencyList(emergencyList: EmergencyCase[]) {
    this.emergencyList.next(emergencyList);
  }

  // Functions
  getEmergencyListFromServer() {
    this.ui.showProgressSpinner();
    this.api.getEmergencyList().subscribe(
      (res) => {
        this.ui.hideProgressSpinner();
        if (res) {
          this.updateEmergencyList(res as EmergencyCase[]);
        } else {
          this.ui.showErrorSnack("Error getting emergency list");
        }
      }, (err) => {
        this.ui.hideProgressSpinner();
        this.ui.showErrorSnack("Error getting emergency list");
      }
    )
  }

  updateEmergency(emergency: EmergencyCase) {
    this.ui.showProgressSpinner();
    this.api.updateEmergency(emergency).subscribe(
      (res) => {
        this.ui.hideProgressSpinner();
        if (res) {
          if (res.status == 200) {
            this.ui.showPositiveSnack("Emergency Updated");
            this.getEmergencyListFromServer();
            this.showAdd.next(false);
          } else if (res.status == 300) {
            this.ui.showErrorSnack(res.message);
          } else if (res.status == 400) {
            this.ui.showErrorSnack(res.message);
          } else if (res.status == 301) {
            this.ui.showErrorSnack(res.message);
            this.user.logout();
          } else {
            this.ui.showErrorSnack(res.message);
          }
        } else {
          this.ui.showErrorSnack(res.message);
        }
      }, (err) => {
        this.ui.hideProgressSpinner();
        this.ui.showErrorSnack("Error Updating emergency");
      });
  }

  addEmergency(emergency: EmergencyCase) {
    this.ui.showProgressSpinner();
    this.api.addEmergency(emergency).subscribe(
      (res) => {
        this.ui.hideProgressSpinner();
        if (res) {
          if (res.status == 200) {
            this.ui.showPositiveSnack("Emergency added");
            this.getEmergencyListFromServer();
          } else if (res.status == 300) {
            this.ui.showErrorSnack("Invalid Details Provided for Emergency : 300");
          } else if (res.status == 400) {
            this.ui.showErrorSnack("Invalid Details Provided for Emergency : 400");
          } else if (res.status == 301) {
            this.ui.showErrorSnack("Session Expired or Invalid Session : 301");
            this.user.logout();
          } else {
            this.ui.showErrorSnack("Error adding emergency");
          }
        } else {
          this.ui.showErrorSnack("Error adding emergency");
        }
      }, (err) => {
        this.ui.hideProgressSpinner();
        this.ui.showErrorSnack("Error adding emergency");
      }
    )
  }

  deleteEmergency(emergency: EmergencyCase) {
    this.ui.showProgressSpinner();
    this.api.deleteBooking(emergency).subscribe((res) => {
      if (res) {
        if (res.status == 200) {
          this.ui.showPositiveSnack(res.message);
          this.getEmergencyListFromServer();
        } else if (res.status == 404) {
          this.ui.showErrorSnack(res.message);
        }
      } else {
        this.ui.showErrorSnack("Error deleting emergency");
      }
      this.ui.hideProgressSpinner();
    })
  }
}

