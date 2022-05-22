import {Component, Input, OnInit} from '@angular/core';
import {EmergencyCase} from "../../../../Models/HelperModals";
import {EmergencyService} from "../../../../services/emergency.service";

@Component({
  selector: 'app-add-emergency',
  templateUrl: './add-emergency.component.html',
  styleUrls: ['./add-emergency.component.css']
})
export class AddEmergencyComponent implements OnInit {
  show: boolean = true;
  emergency: EmergencyCase = {
    address: "",
    age: "",
    date: "",
    description: "",
    id: "",
    intensity_of_emergency: "",
    name_of_patient: "",
    requirements: "",
    time: "",
    type_of_emergency: ""
  };

  constructor(private emergencyService: EmergencyService) {
    this.emergencyService.getShowAdd.subscribe(
      (show) => {
        this.show = show;
      }
    )
  }

  ngOnInit(): void {
  }

  save() {
    // Add new Emergency to Database
    this.emergencyService.addEmergency(this.emergency);
    this.emergency = {
      address: "",
      age: "",
      date: "",
      description: "",
      id: "",
      intensity_of_emergency: "",
      name_of_patient: "",
      requirements: "",
      time: "",
      type_of_emergency: ""
    };
  }

  toggleShow() {
    this.emergencyService.showAdd.next(!this.show);
  }
}
