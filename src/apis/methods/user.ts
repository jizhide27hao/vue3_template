import alovaInstance from '../alova';

export interface UserInfo {
  name: string;
  email: string;
  age: number;
  headPicture: string;
}
export const getUserApi = () => alovaInstance.Post<UserInfo>('/api/getUserInfo');

export const patchUserHeadApi = (headPicture: string) =>
  alovaInstance.Post<UserInfo>('/api/changeHeadPic', {
    headPicture
  });
