export interface BaseUser {
  memberId : number;
  name: string;
  email: string;
  nickname: string;
  phone : string;
  fileUrl : string | null;
  description: string | null;
  isAddInfo : boolean;
}

export interface NormalUser extends BaseUser {
  role: 'USER';
}

export interface CaptainUser extends BaseUser {
  role: 'CAPTAIN';
  shipLicenseNumber? : string;
  shipList? : number[];
}

export type User = NormalUser | CaptainUser