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
