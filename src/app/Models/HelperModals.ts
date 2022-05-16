export interface LoginReq {
  email : string;
  password : string;
  licence_id : string;
}

export interface User {
  f_name : string,
  l_name : string,
  mobile_num : string,
  email : string,
  token : string,
  licence_id : string
}

export interface Primary {
  licence_id : string,
  email? : string,
  token? : string,
  name : string,
  description : string,
  address : string,
  city_name : string,
  state_name : string,
  geolocation : string,
  is_24_hr_service : boolean,
  days_open : string,
  opening_time? : string,
  closing_time? : string,
}
export interface Availability{
  email? : string,
  token? : string,
  licence_id : string,
  no_of_bed : string,
  vacant_bed : string,
  icu : string,
  vacant_icu : string,
  ccu: string,
  vacant_ccu : string,
  vacant_ventilators : string,
  ventilators : string,
  vacant_oxygen_cylinders : string,
  oxygen_cylinders : string,
}

export interface Facility {
  email? : string,
  token? : string,
  licence_id : string,
  xray: string,
  mri : string,
  ecg : string,
  ultrasound : string,
  ambulance : string,
}

export interface BloodBank{
  email? : string,
  token? : string,
  licence_id : string,
  a_positive : string,
  b_positive : string,
  ab_positive : string,
  o_positive : string,
  a_negative : string,
  b_negative : string,
  ab_negative : string,
  o_negative : string,
}
