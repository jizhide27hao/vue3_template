<script setup lang="ts">
import { ref } from 'vue';

const msg = ref('hello home');
</script>

<template>
  <div class="home">
    {{ msg }}
    <cropper-img></cropper-img>
    <TestButton />
  </div>
</template>

<style scoped></style>
