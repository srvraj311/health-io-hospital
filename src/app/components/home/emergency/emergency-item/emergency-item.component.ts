import {Component, Input, OnInit} from '@angular/core';
import {EmergencyCase} from "../../../../Models/HelperModals";
import {EmergencyService} from "../../../../services/emergency.service";

@Component({
  selector: 'app-emergency-item',
  templateUrl: './emergency-item.component.html',
  styleUrls: ['./emergency-item.component.css']
})
export class EmergencyItemComponent implements OnInit {
  @Input() emergency!: EmergencyCase;
  editMode : boolean = false;
  constructor(private emergencyService : EmergencyService){}

  ngOnInit(): void {
  }

  switchEdit(){
    this.editMode = !this.editMode;
  }

  save() {
    this.emergencyService.updateEmergency(this.emergency);
    this.editMode = !this.editMode;
  }

  deleteEmergency() {
    this.emergencyService.deleteEmergency(this.emergency);
  }
}
