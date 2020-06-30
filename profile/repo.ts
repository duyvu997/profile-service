import { IZaloUserData } from "../gateway/zalo/zalo.model";
import { profileModel, Profile } from "./model";
import { ProfileType } from "./profile.enum";
import { nameof } from "..//common/custom.function"

export class HouseRepository {
  public async saveZaloUser( code: string, scope: string[], userInfo: IZaloUserData): Promise<any> {
    console.log('userInfo: ', userInfo);
    const profileToBeSaved = {
      profileId: userInfo.id,
      zaloCode: code,
      zaloScope: scope,
      birthday: userInfo.birthday,
      gender: userInfo.gender,
      name: userInfo.name,
      pictureUrl: userInfo.picture.data.url,
      type: ProfileType.ZALO,
    } as Profile;
    return profileModel.create(profileToBeSaved);
  };
  public async countByZaloCode(code: string): Promise<number> {
    const condition = {
      [nameof<Profile>("zaloCode")]: code
    }
    return profileModel.count(condition);
  }
  public async getByZaloCode(code: string){
    const condition = {
      [nameof<Profile>("zaloCode")]: code
    }
    return profileModel.findOne(condition);
  }

}

export const profileRepository = new HouseRepository();


