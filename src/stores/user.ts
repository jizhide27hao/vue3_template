import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type UserInfo } from '../apis/methods/user';

const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null);

  const updateUserHeadImg = (url: string) => {
    userInfo.value!.headPicture = url;
  };

  const setUserInfo = (data: UserInfo) => {
    userInfo.value = data;
  };

  return {
    userInfo,
    updateUserHeadImg,
    setUserInfo
  };
});

export default useUserStore;
