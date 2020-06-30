import { profileRepository } from "./repo";
import { zaloService } from "../gateway/zalo/zalo.service";
import * as jwt from "jsonwebtoken";
import { PROFILE_SECRET_KEY, TOKEN_EXPIRE_CONFIG } from "./profile.constanst";
import { zaloUserScope } from "./house.constant";

export class ProfileService {
  public async create( code: string) {
    const userInfo = await zaloService.getUserInformation(code);
    return profileRepository.saveZaloUser( code, zaloUserScope, userInfo);
  };

  public async doesProfileCreated(code: string): Promise<boolean> {
    return (await profileRepository.countByZaloCode(code)) > 0;
  }
  
  public async getByZaloCode(code: string) {
    return profileRepository.getByZaloCode(code);
  }

  public async generateToken(uid: string): Promise<string> {
    const payload = {
      profileId: uid
    }
    return jwt.sign(payload, PROFILE_SECRET_KEY , {expiresIn: TOKEN_EXPIRE_CONFIG} )
  }
}
export const profileService = new ProfileService();
