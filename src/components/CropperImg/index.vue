<script lang="ts" setup name="CropperImg">
import { ref, reactive, CSSProperties, watch } from 'vue';
import { VueCropper } from 'vue-cropper';
import { message } from 'ant-design-vue';
import 'vue-cropper/dist/index.css';
import useUserStore from '@/stores/user';
import { patchUserHeadApi } from '@/apis/methods/user';

interface PreviewType {
  w: number;
  h: number;
  div: CSSProperties;
  url: string;
  img: CSSProperties;
  zoom: number;
}
interface Props {
  imgUrl?: string;
}

const props = defineProps<Props>();
/* data */
const cropperRef = ref<InstanceType<typeof VueCropper> | null>(null);

const visible = ref<boolean>(false);
const headPicture = ref('');
const uploading = ref(false);
const { updateUserHeadImg } = useUserStore();

const option = reactive({
  img: '',
  outputSize: 1,
  full: false,
  outputType: 'png',
  canMove: true,
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  centerBox: true,
  high: true,
  maxImgSize: 99999,
  autoCropWidth: 180,
  autoCropHeight: 180,
  fixed: true,
  fixedNumber: [1, 1],
  info: true,
  mode: 'cover'
});
// 裁剪后的预览样式信息
const previews = reactive<PreviewType>({
  w: 0,
  h: 0,
  div: {},
  url: '',
  img: {},
  zoom: 1
});

/* methods */
const showModal = () => {
  visible.value = true;
};

const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    let imgResult = '';
    reader.readAsDataURL(file);
    reader.onload = () => {
      imgResult = reader.result as string;
    };
    reader.onerror = error => {
      reject(error);
    };
    reader.onloadend = () => {
      resolve(imgResult);
    };
  });

// 上传图片 获取base64
const customRequest = ({ file }: any) => {
  if (!file.type.includes('image')) {
    message.warning('只能上传图片');
    return;
  }
  const size = 2 * 1024 * 1024;
  if (file.size > size) {
    message.warning('图片不得超过2M');
    return;
  }
  getBase64(file).then(res => {
    option.img = res;
  });
};

const changeImg = (url: string) => {
  option.img = url;
  showModal();
};

// 实时预览函数
const realTime = (data: PreviewType) => {
  const zoom = 120 / data.w;
  previews.w = data.w;
  previews.h = data.h;
  previews.div = data.div;
  previews.url = data.url;
  previews.img = data.img;
  previews.zoom = zoom;
};

// 关闭
const handleClose = () => {
  option.img = '';
  previews.url = '';
  visible.value = false;
};

// 确定
const handleOk = () => {
  cropperRef.value.getCropData((data: string) => {
    uploading.value = true;
    patchUserHeadApi(data)
      .send()
      .then(() => {
        headPicture.value = data;
        updateUserHeadImg(data);
        message.success('头像更换成功');
        handleClose();
      })
      .finally(() => {
        uploading.value = false;
      });
  });
};

/* watch */
watch(
  () => props.imgUrl,
  val => {
    if (val) {
      headPicture.value = val;
    }
  },
  {
    immediate: true
  }
);
</script>

<template>
  <div class="head-picture">
    <a-avatar :src="headPicture" class="head-picture-avatar cursor-pointer" :size="80"></a-avatar>
    <div class="head-picture-tip" @click="changeImg(headPicture)">更换头像</div>
  </div>
  <a-modal
    v-model:open="visible"
    title="上传头像"
    :width="640"
    :mask-closable="false"
    :keyboard="false"
    @ok="handleOk"
    @cancel="handleClose"
  >
    <template #footer>
      <a-button key="back" @click="handleClose">取消</a-button>
      <a-button key="submit" type="primary" :loading="uploading" @click="handleOk">确认</a-button>
    </template>
    <div class="cropper-box">
      <div class="cropper-left">
        <vue-cropper v-show="option.img" ref="cropperRef" v-bind="option" @real-time="realTime"></vue-cropper>
        <div v-show="!option.img" class="add-box">
          <a-upload :custom-request="customRequest" :show-upload-list="false" accept="image/png, image/jpeg">
            <div class="text-content">
              <SvgIcon name="add" :width="32" :height="32" />
              <div class="upload-text">添加照片</div>
              <div class="upload-hint">请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</div>
            </div>
          </a-upload>
        </div>
        <div v-show="uploading" class="uploading-wrapper">
          <a-spin />
          <span>上传中...</span>
        </div>
      </div>
      <div class="cropper-right">
        <div class="head-img">
          <div
            v-if="previews.url"
            class="box"
            :style="{
              width: `${previews.w}px`,
              height: `${previews.h}px`,
              zoom: previews.zoom
            }"
          >
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div>
          <div v-else class="avatar">
            <SvgIcon name="head" :width="88" :height="88" />
          </div>
          <div class="head-text">头像预览</div>
        </div>
      </div>
    </div>
    <div class="reselect">
      <a-upload :custom-request="customRequest" :show-upload-list="false" accept="image/png, image/jpeg">
        <div v-show="option.img" class="reselect-text">
          <SvgIcon name="reset" />
          重新选择
        </div>
      </a-upload>
    </div>
  </a-modal>
</template>

<style scoped>
.head-picture {
  position: relative;
}

.head-picture-tip {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  width: 80px;
  height: 80px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  background-color: #00000087;
  border-radius: 50%;
  line-height: 80px;
  cursor: pointer;
}

.head-picture-avatar:hover + .head-picture-tip,
.head-picture-tip:hover {
  display: block;
}

.cropper-box {
  display: flex;
  margin-top: 32px;
  width: 100%;
  height: 368px;
}

.cropper-left {
  position: relative;
  width: 368px;
}

.uploading-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0.8;
}

.cropper-left .add-box {
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  background-color: rgb(232 232 232 / 60%);
}

.cropper-left :deep(.ant-upload) {
  display: table;
  height: 100%;
}

.cropper-left .text-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  height: 100%;
  color: #666;
}

.cropper-left .upload-text {
  margin: 16px 0;
  font-size: 16px;
}

.cropper-left .upload-hint {
  font-size: 14px;
}

.cropper-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-left: 20px;
  height: 100%;
}

.head-img .box,
.head-img .avatar {
  overflow: hidden;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.head-img .avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8e8e8;
}

.head-img .head-text {
  margin-top: 15px;
  font-size: 16px;
  text-align: center;
  color: #666;
}

.reselect {
  margin-top: 16px;
  width: 368px;
  height: 30px;
  text-align: center;
}

.reselect-text {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #999;
  cursor: pointer;
}

.reselect-text svg {
  margin-right: 5px;
}
</style>
