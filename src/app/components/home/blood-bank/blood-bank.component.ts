import {Component, OnInit} from '@angular/core';
import {BloodBank} from "../../../Models/HelperModals";
import {ApiService} from "../../../services/api.service";
import Hospital from "../../../Models/Hospital";

@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.css']
})
export class BloodBankComponent implements OnInit {

  hospital!: Hospital;

  constructor(private api: ApiService) {
    this.api.getHospital.subscribe((h) => {
      if (h) {
        this.setDetails(h as Hospital);
        this.hospital = h as Hospital;
      } else {
        api.getHospitalFromLocal();
      }
    })
  }
  setDetails(hospital : Hospital){
    this.bloodBank = {
      a_positive : hospital.blood_bank.a_positive,
      b_positive : hospital.blood_bank.b_positive,
      ab_positive : hospital.blood_bank.ab_positive,
      o_positive : hospital.blood_bank.o_positive,
      a_negative : hospital.blood_bank.a_negative,
      b_negative : hospital.blood_bank.b_negative,
      ab_negative : hospital.blood_bank.ab_negative,
      o_negative : hospital.blood_bank.o_negative,
      licence_id : hospital.licence_id
    }
  }

  ngOnInit(): void {
  }

  bloodBank: BloodBank = {
    a_positive : "",
    b_positive : "",
    ab_positive : "",
    o_positive : "",
    a_negative : "",
    b_negative : "",
    ab_negative : "",
    o_negative : "",
    licence_id : "",
  }
  update(){
    this.api.updateBloodBank(this.bloodBank);
  }

}
