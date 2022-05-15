export default class Hospital {
  // Needed
  private _licence_id: string;
  private _name: string;
  private _description: string;
  private _address: string;
  private _city_name: string;
  private _state_name: string;
  private _geolocation: string;
  private _contact: string;
  private _type: string;
  private _is_24_hr_service: boolean;
  private _opening_time: string;
  private _closing_time: string;
  private _general_fees:string;
  private _last_updated:string;


// Needed to send
  private _grade:string;
  private _no_of_bed:string;
  private _vacant_bed:string;
  private _icu:string;
  private _vacant_icu:string
  private _ccu:string;
  private _vacant_ccu:string;
  private _ventilators:string;
  private _vacant_ventilators:string;
  private _oxygen_cylinders:string;
  private _vacant_oxygen_cylinders:string;
  private _blood_bank:any = {
    a_positive:"0",
    a_negative:"0",
    b_negative:"0",
    b_positive:"0",
    o_positive:"0",
    o_negative:"0",
    ab_positive:"0",
    ab_negative:"0"
  };
  private _x_ray:string;
  private _mri:string;
  private _ecg:string;
  private _ultra_sound:string;
  private _ambulance:string;
  private _vacant_ambulance:string;

  constructor(licence_id: string, name: string, description: string, address: string, city_name: string, state_name: string, geolocation: string, contact: string, type: string, is_24_hr_service: boolean, opening_time: string, closing_time: string, general_fees: string, last_updated: string, grade: string, no_of_bed: string, vacant_bed: string, icu: string, vacant_icu: string, ccu: string, vacant_ccu: string, ventilators: string, vacant_ventilators: string, oxygen_cylinders: string, vacant_oxygen_cylinders: string, blood_bank: any, x_ray: string, mri: string, ecg: string, ultra_sound: string, ambulance: string, vacant_ambulance: string) {
    this._licence_id = licence_id;
    this._name = name;
    this._description = description;
    this._address = address;
    this._city_name = city_name;
    this._state_name = state_name;
    this._geolocation = geolocation;
    this._contact = contact;
    this._type = type;
    this._is_24_hr_service = is_24_hr_service;
    this._opening_time = opening_time;
    this._closing_time = closing_time;
    this._general_fees = general_fees;
    this._last_updated = last_updated;
    this._grade = grade;
    this._no_of_bed = no_of_bed;
    this._vacant_bed = vacant_bed;
    this._icu = icu;
    this._vacant_icu = vacant_icu;
    this._ccu = ccu;
    this._vacant_ccu = vacant_ccu;
    this._ventilators = ventilators;
    this._vacant_ventilators = vacant_ventilators;
    this._oxygen_cylinders = oxygen_cylinders;
    this._vacant_oxygen_cylinders = vacant_oxygen_cylinders;
    this._blood_bank = blood_bank;
    this._x_ray = x_ray;
    this._mri = mri;
    this._ecg = ecg;
    this._ultra_sound = ultra_sound;
    this._ambulance = ambulance;
    this._vacant_ambulance = vacant_ambulance;
  }

  get licence_id(): string {
    return this._licence_id;
  }

  set licence_id(value: string) {
    this._licence_id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get city_name(): string {
    return this._city_name;
  }

  set city_name(value: string) {
    this._city_name = value;
  }

  get state_name(): string {
    return this._state_name;
  }

  set state_name(value: string) {
    this._state_name = value;
  }

  get geolocation(): string {
    return this._geolocation;
  }

  set geolocation(value: string) {
    this._geolocation = value;
  }

  get contact(): string {
    return this._contact;
  }

  set contact(value: string) {
    this._contact = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get is_24_hr_service(): boolean {
    return this._is_24_hr_service;
  }

  set is_24_hr_service(value: boolean) {
    this._is_24_hr_service = value;
  }

  get opening_time(): string {
    return this._opening_time;
  }

  set opening_time(value: string) {
    this._opening_time = value;
  }

  get closing_time(): string {
    return this._closing_time;
  }

  set closing_time(value: string) {
    this._closing_time = value;
  }

  get general_fees(): string {
    return this._general_fees;
  }

  set general_fees(value: string) {
    this._general_fees = value;
  }

  get last_updated(): string {
    return this._last_updated;
  }

  set last_updated(value: string) {
    this._last_updated = value;
  }

  get grade(): string {
    return this._grade;
  }

  set grade(value: string) {
    this._grade = value;
  }

  get no_of_bed(): string {
    return this._no_of_bed;
  }

  set no_of_bed(value: string) {
    this._no_of_bed = value;
  }

  get vacant_bed(): string {
    return this._vacant_bed;
  }

  set vacant_bed(value: string) {
    this._vacant_bed = value;
  }

  get icu(): string {
    return this._icu;
  }

  set icu(value: string) {
    this._icu = value;
  }

  get vacant_icu(): string {
    return this._vacant_icu;
  }

  set vacant_icu(value: string) {
    this._vacant_icu = value;
  }

  get ccu(): string {
    return this._ccu;
  }

  set ccu(value: string) {
    this._ccu = value;
  }

  get vacant_ccu(): string {
    return this._vacant_ccu;
  }

  set vacant_ccu(value: string) {
    this._vacant_ccu = value;
  }

  get ventilators(): string {
    return this._ventilators;
  }

  set ventilators(value: string) {
    this._ventilators = value;
  }

  get vacant_ventilators(): string {
    return this._vacant_ventilators;
  }

  set vacant_ventilators(value: string) {
    this._vacant_ventilators = value;
  }

  get oxygen_cylinders(): string {
    return this._oxygen_cylinders;
  }

  set oxygen_cylinders(value: string) {
    this._oxygen_cylinders = value;
  }

  get vacant_oxygen_cylinders(): string {
    return this._vacant_oxygen_cylinders;
  }

  set vacant_oxygen_cylinders(value: string) {
    this._vacant_oxygen_cylinders = value;
  }

  get blood_bank(): any {
    return this._blood_bank;
  }

  set blood_bank(value: any) {
    this._blood_bank = value;
  }

  get x_ray(): string {
    return this._x_ray;
  }

  set x_ray(value: string) {
    this._x_ray = value;
  }

  get mri(): string {
    return this._mri;
  }

  set mri(value: string) {
    this._mri = value;
  }

  get ecg(): string {
    return this._ecg;
  }

  set ecg(value: string) {
    this._ecg = value;
  }

  get ultra_sound(): string {
    return this._ultra_sound;
  }

  set ultra_sound(value: string) {
    this._ultra_sound = value;
  }

  get ambulance(): string {
    return this._ambulance;
  }

  set ambulance(value: string) {
    this._ambulance = value;
  }

  get vacant_ambulance(): string {
    return this._vacant_ambulance;
  }

  set vacant_ambulance(value: string) {
    this._vacant_ambulance = value;
  }
}
