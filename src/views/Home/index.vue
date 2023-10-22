<script setup lang="ts">
import { ref } from 'vue';

const msg = ref('hello home');
</script>

<template>
  <div class="home">
    <div class="mb-5 h-full w-full t-color">hgel</div>
    {{ msg }}
    <cropper-img></cropper-img>
    <TestButton />
  </div>
</template>

<style scoped></style>
