<script setup lang="ts">
import { ref } from 'vue';
import { getUserApi, type UserInfo } from '@/apis/methods/user';

// 工具库
import { setToken } from '@/utils/storage';
import dayjs from 'dayjs';

const userInfo = ref<UserInfo>({} as UserInfo);
getUserApi()
  .send()
  .then(res => {
    console.log('getUserApi', res);
    userInfo.value = res;
    setToken(res.email);
  });
</script>

<template>
  <div class="home">
    <div class="mb-5 t-color">{{ userInfo.age }}</div>
    {{ userInfo.name }}
    <TestButton />
    <div>
      <SvgIcon class="icon mt-5" name="community" color="red" size="18" />
      <SvgIcon class="icon ml-5" name="add" color="red" size="18" />
    </div>
    <div>
      {{ dayjs('2023-10-24 10:10:10').fromNow() }}
    </div>
    <div>
      <cropper-img :img-url="userInfo.headPicture"></cropper-img>
    </div>
    <div>
      <a-button type="primary" size="large">hello</a-button>
    </div>
  </div>
</template>

<style scoped></style>
