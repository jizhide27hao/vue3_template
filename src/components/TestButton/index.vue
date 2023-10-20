<script setup lang="ts">
import { ref } from 'vue';

const msg = ref('test button');

defineExpose({});
defineOptions({
  name: 'TestButton'
});
</script>

<template>
  <div>{{ msg }}</div>
</template>

<style scoped></style>
