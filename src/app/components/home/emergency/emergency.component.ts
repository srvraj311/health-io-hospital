import { Component, OnInit } from '@angular/core';
import {EmergencyService} from "../../../services/emergency.service";
import {EmergencyCase} from "../../../Models/HelperModals";

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent implements OnInit {

  constructor(private emergencyService : EmergencyService) { }
  emergencyList : EmergencyCase[] = [];
  ngOnInit(): void {
    this.emergencyService.getEmergencyListFromServer();
    this.emergencyService.getEmergencyList.subscribe(
      (emergencyList : EmergencyCase[]) => {
        this.emergencyList = emergencyList;
      }
    );
  }

  showAddToggle() {
    this.emergencyService.updateShowAdd(!this.emergencyService.showAdd.getValue());
  }
}
