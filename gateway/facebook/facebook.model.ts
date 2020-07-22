export interface IFacebookData {
  name: string;
  id: string; // id of user in zalo system. 
  picture: {
    data: {
      url: string;
      height: number;
      width: number;
      is_silhouette: string;

    };
  };
}
