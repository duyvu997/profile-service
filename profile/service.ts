import { profileRepository } from "./repo";
import { zaloService } from "../gateway/zalo/zalo.service";
import * as jwt from "jsonwebtoken";
import { PROFILE_SECRET_KEY, TOKEN_EXPIRE_CONFIG } from "./constant";
import { zaloUserScope } from "./constant";
import { facebookService } from "../gateway/facebook/facebook.service";

export class ProfileService {
  public async createZaloUser( code: string) {
    const userInfo = await zaloService.getUserInformation(code);
    return profileRepository.saveZaloUser( code, zaloUserScope, userInfo);
  };

  public async createFacebookUser( code: string) {
    const userInfo = await facebookService.getUserInformation(code);
    return profileRepository.saveFacebookUser( code, userInfo);
  };

  public async doesProfileCreated(code: string): Promise<boolean> {
    return (await profileRepository.countByZaloCode(code)) > 0;
  }
  
  public async getByZaloCode(code: string) {
    return profileRepository.getByZaloCode(code);
  }
  
  public async getByFBAccessToken(fbAccessToken: string) {
    return profileRepository.getByFBAccessToken(fbAccessToken);
  }
  public async generateToken(uid: string): Promise<string> {
    const payload = {
      profileId: uid
    }
    return jwt.sign(payload, PROFILE_SECRET_KEY , {expiresIn: TOKEN_EXPIRE_CONFIG} )
  }
  public async getProfileInformation(profileId: string) {
    return profileRepository.getProfileInformation(profileId);
  }
}
export const profileService = new ProfileService();
