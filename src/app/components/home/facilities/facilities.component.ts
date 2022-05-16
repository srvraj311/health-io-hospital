import { Component, OnInit } from '@angular/core';
import {Facility} from "../../../Models/HelperModals";
import {ApiService} from "../../../services/api.service";
import Hospital from "../../../Models/Hospital";

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  hospital!:Hospital;
  facility: Facility = {
    licence_id : "",
    xray : "",
    mri : "",
    ultrasound : "",
    ambulance : "",
    ecg : "",
  };

  constructor(private api : ApiService) {
    this.api.getHospital.subscribe(h => {
      if(h){
        this.hospital = h as Hospital;
        this.setDetails(h as Hospital);
      }else{
        api.getHospitalFromLocal();
      }
    })
  }
  setDetails(hospital : Hospital){
    this.facility = {
      licence_id : hospital.licence_id,
      xray : hospital.x_ray,
      mri : hospital.mri,
      ultrasound : hospital.ultra_sound,
      ambulance : hospital.vacant_ambulance,
      ecg : hospital.ecg,
    };
  }

  ngOnInit(): void {

  }

  update() {
    this.api.updateFacility(this.facility);
  }
}
