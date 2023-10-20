<script setup lang="ts">
import { ref } from 'vue';

const msg = ref('cropper img');

defineExpose({});
defineOptions({
  name: 'CropperImg'
});
</script>

<template>
  <div>{{ msg }}</div>
</template>

<style scoped></style>
