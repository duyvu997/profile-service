import { IZaloUserData } from "../gateway/zalo/zalo.model";
import { profileModel, Profile } from "./model";
import { ProfileType } from "./profile.enum";
import { nameof } from "..//common/custom.function"
import { IFacebookData } from "../gateway/facebook/facebook.model";

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

  public async saveFacebookUser( fbAccessToken: string, userInfo: IFacebookData): Promise<any> {
    console.log('userInfo: ', userInfo);
    const profileToBeSaved = {
      profileId: userInfo.id,
      name: userInfo.name,
      pictureUrl: userInfo.picture.data.url,
      fbScope:['id', 'name', 'picture'],
      fbAccessToken: fbAccessToken,
      type: ProfileType.FACEBOOK,
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

  public async getByFBAccessToken(fbAccessToken: string){
    const condition = {
      [nameof<Profile>("fbAccessToken")]: fbAccessToken
    }
    return profileModel.findOne(condition);
  }
  
  public async getProfileInformation(profileId:string){
    return profileModel.findOne({[nameof<Profile>("profileId")]: profileId});
  }

}

export const profileRepository = new HouseRepository();


