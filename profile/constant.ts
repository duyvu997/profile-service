export const zaloUserScope = ['access_profile','access_friends_list']
export const PROFILE_SECRET_KEY = process.env.profileSecretConfig || 'RANDOM-SECRET-KEY';
export const TOKEN_EXPIRE_CONFIG = process.env.tokenExpireConfig || '24h'
export enum ProfileType {
    ZALO = "ZALO",
    FACEBOOK = "FACEBOOK",
    OTHER = "OTHER"
  }
  
  