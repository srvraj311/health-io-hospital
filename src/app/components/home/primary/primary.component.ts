import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {Primary} from "../../../Models/HelperModals";
import {ApiService} from "../../../services/api.service";
import Hospital from "../../../Models/Hospital";
import {UiService} from "../../../services/ui.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-primary',
  templateUrl: './primary.component.html',
  styleUrls: ['./primary.component.css']
})
export class PrimaryComponent implements OnInit {
  constructor(private api: ApiService, private ui: UiService, private router: Router) {
    this.api.getHospital.subscribe(h => {
      if (h) {
        this.hospital = h
        this.setDetails();
      } else {
        this.router.navigate(['home']).then(_ =>
          this.ui.showErrorSnack("Error getting Hospital from Localstorage"))
      }
    });
  }

  setDetails() {
    this.hName = new FormControl(this.hospital.name);
    this.description = new FormControl(this.hospital.description);
    this.address = new FormControl(this.hospital.address);
    this.city_name = new FormControl(this.hospital.city_name);
    this.state_name = new FormControl(this.hospital.state_name);
    this.latitude = new FormControl(this.hospital.geolocation.split(",")[0]);
    this.longitude = new FormControl(this.hospital.geolocation.split(",")[1]);
    this.is_24_hrs_open = this.hospital.is_24_hr_service;
    if(this.hospital.opening_time){
      this.opening_time = this.hospital.opening_time;
    }
    if(this.hospital.closing_time){
      this.opening_time = this.hospital.closing_time;
    }

  }

  ngOnInit(): void {

  }

  // Hospital
  hospital!: Hospital
  // Form Controls
  hName: FormControl = new FormControl("");
  description: FormControl = new FormControl("");
  address: FormControl = new FormControl("");
  city_name: FormControl = new FormControl("");
  state_name: FormControl = new FormControl("");
  latitude: FormControl = new FormControl("");
  longitude: FormControl = new FormControl("");
  is_24_hrs_open: boolean = true;
  opening_time : string = "00:00"
  closing_time :string = "00:00"

  // Days
  task: Task = {
    name: 'All Days',
    completed: true,
    color: 'primary',
    subtasks: [
      {name: 'Monday', completed: false, color: 'primary'},
      {name: 'Tuesday', completed: false, color: 'primary'},
      {name: 'Wednesday', completed: false, color: 'primary'},
      {name: 'Thursday', completed: false, color: 'primary'},
      {name: 'Friday', completed: false, color: 'primary'},
      {name: 'Saturday', completed: false, color: 'primary'},
      {name: 'Sunday', completed: false, color: 'primary'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  toggleAll() {
    this.allComplete = !this.allComplete;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = this.allComplete));
  }


  update() {
    const details: Primary = {
      name: this.hName.value,
      description: this.description.value,
      address: this.address.value,
      geolocation: this.latitude.value.trim() + "," + this.longitude.value.trim(),
      city_name: this.city_name.value,
      state_name: this.state_name.value,
      is_24_hr_service: this.is_24_hrs_open,
      days_open: "",
      licence_id: this.hospital.licence_id,
    }
    if(!this.is_24_hrs_open){
      details.opening_time = this.opening_time;
      details.closing_time = this.closing_time;
    }
    this.api.updatePrimary(details);
  }

  updateCheckbox(task: Task) {
    task.completed = !task.completed;
  }

  set24hr(b: boolean) {
    this.is_24_hrs_open = b;
    console.log(this.is_24_hrs_open);
  }
}

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
