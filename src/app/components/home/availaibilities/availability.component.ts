import { Component, OnInit } from '@angular/core';
import {Availability} from "../../../Models/HelperModals";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import Hospital from "../../../Models/Hospital";

@Component({
  selector: 'app-availaibilities',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  hospital!:Hospital;
  constructor(private userService:UserService, private router : Router,private api:ApiService ) {
    this.api.getHospital.subscribe((h) =>{
      if(h){
        this.hospital = h as Hospital;
        this.setDetails(this.hospital);
      }else{
        this.api.getHospitalFromLocal();
      }
    })
  }

  ngOnInit(): void {
  }

  // Hooks

  availability : Availability = {
    ccu: "",
    icu: "",
    licence_id: "",
    no_of_bed: "",
    oxygen_cylinders: "",
    vacant_bed: "",
    vacant_ccu: "",
    vacant_icu: "",
    vacant_oxygen_cylinders: "",
    vacant_ventilators: "",
    ventilators: ""
  }

  update() {
    this.api.updateAvailability(this.availability);
  }

  private setDetails(hospital: Hospital) {
    this.availability  = {
      ccu: hospital.ccu,
      icu: hospital.icu,
      licence_id: hospital.licence_id,
      no_of_bed: hospital.no_of_bed,
      oxygen_cylinders: hospital.oxygen_cylinders,
      vacant_bed: hospital.vacant_bed,
      vacant_ccu: hospital.vacant_ccu,
      vacant_icu: hospital.vacant_icu,
      vacant_oxygen_cylinders: hospital.vacant_oxygen_cylinders,
      vacant_ventilators: hospital.vacant_ventilators,
      ventilators : hospital.ventilators
    }
  }
}
