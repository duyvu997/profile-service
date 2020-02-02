import { profileModel, Profile } from "./model";
const nameof = <T>(name: keyof T) => name;


export class ProfileRepository {
  public async countProfile(username: string): Promise<number> {
    const conditions = {
      [nameof<Profile>("username")]: username
    }
    return profileModel.countDocuments(conditions)
  }
  public async getHouseById(id: string): Promise<any> {
    return profileModel.find({ _id: id });
  }

  public async createProfile(profile: Profile): Promise<any> {
    return profileModel.create(profile);
  }
}
export const profileRepository = new ProfileRepository();
