export  interface IGetAccessToken {
  access_token: string;
  expires_in: string;
}

export interface IZaloUserData {
  uid?:string;
  code?:string;
  scope?:string[];
  birthday: string;
  gender: string;
  name: string;
  id: string; // id of user in zalo system. 
  picture: {
    data: {
      url: string;
    };
  };
}
