export class HttpPaths{
  public static feederLogin:string = "feeder/login/"
  public static feederLogout:string = "feeder/logout/"
  public static getHospital:string = "admin/hospitals/getHospital/"
  public static updatePrimary:string = "admin/hospitals/updatePrimary/"
  public static updateAvailability:string = "admin/hospitals/updateAvailability/"
  public static updateFacility:string = "admin/hospitals/updateFacility/"
  public static updateBloodBank:string = "admin/hospitals/updateBloodBank/"
  public static getBookings:string = "api/booking/getByLicenceId/"
  public static dischargeBooking:string = "api/booking/dischargeBooking/"
  public static cancelBooking:string = "api/booking/cancelBooking/"
  public static getViewCounts: string = "admin/hospitals/views/"
  public static getEmergencyList: string = "hospitals/emergency/"
  public static addEmergency: string = "hospitals/emergency/add/"
  public static updateEmergency: string = "hospitals/emergency/update/"
  public static deleteEmergency: string = "hospitals/emergency/delete/"
}
