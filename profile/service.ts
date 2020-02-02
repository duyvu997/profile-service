import { profileRepository } from "./repo";
import { Profile } from "./model";
import * as jwt from "jsonwebtoken";
import * as brypt from "bcrypt";

export class ProfileService {
  public async doesUsernameExist(username: string): Promise<boolean> {
    return (await profileRepository.countProfile(username)) > 0;
  }

  public async encryptPassword(password: string): Promise<string> {
    return brypt.hash(password, 10);
  }
  
  public async generateToken(_id: string): Promise<string> {
    const jwtSecret = process.env.jwtSecret || "default-secret";
    return jwt.sign({ _id }, jwtSecret, { expiresIn: "168h" });
  }

  public async getHouseById(id: string): Promise<any> {
    return profileRepository.getHouseById(id);
  }

  public async createProfile(profile: Profile) {
    return profileRepository.createProfile(profile);
  }
}
export const profileService = new ProfileService();
