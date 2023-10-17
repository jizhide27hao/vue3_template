<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
const aaa = 1231 + 'ddd';
const fn = aa => {
  let count = 123;
  count++;
  console.log('fff', aa + aaa, count);
};
fn(111);
</script>

<template>
  <main>
    <div class="test">aaa</div>
    <TheWelcome />
  </main>
</template>
<style scoped>
.test {
  color: red;
}
</style>
