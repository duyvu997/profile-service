import axios, { AxiosRequestConfig } from "axios";
import { IFacebookData } from "./facebook.model";
export class FacebookService {
  
  public getUserInformation = async (accesToken: string): Promise<IFacebookData> => {
    const getUserDataURL = 'https://graph.facebook.com/me';
    const params = {
      fields: 'id,name,picture',
      access_token: accesToken
    } as AxiosRequestConfig;
    const result = await axios.get(getUserDataURL, { params });
    return result.data;
  }
}

export const facebookService = new FacebookService();