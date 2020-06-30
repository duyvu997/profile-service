import axios, { AxiosRequestConfig } from "axios";
import { IGetAccessToken, IZaloUserData } from "./zalo.model";
export class ZaloService {
  
  public getAccessToken = async (userCode: string): Promise<string> => {
    const getAccessTokenURL = 'https://oauth.zaloapp.com/v3/access_token'
    const params = {
      app_id: process.env.zaloAppId || '',
      app_secret: process.env.zaloAppSecret || '',
      code: userCode
    } as AxiosRequestConfig;
    const response = await axios.get(getAccessTokenURL, { params });
    const { access_token = '' } = response.data as IGetAccessToken;
    return access_token;
  }

  public getUserInformation = async (code: string): Promise<IZaloUserData> => {
    const accesToken = await this.getAccessToken(code);
    const getUserDataURL = 'https://graph.zalo.me/v2.0/me';
    const params = {
      fields: 'id,birthday,name,gender,picture',
      access_token: accesToken
    } as AxiosRequestConfig;
    return (await axios.get(getUserDataURL, { params })).data as IZaloUserData;
  }
}

export const zaloService = new ZaloService();