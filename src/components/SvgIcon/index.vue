<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    require: true,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 16
  },
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#666'
  }
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`;
  return 'svg-icon';
});

const iconWidth = computed(() => {
  if (props.width) return `${props.width}px`;
  return `${props.size}px`;
});

const iconHeight = computed(() => {
  if (props.height) return `${props.height}px`;
  return `${props.size}px`;
});

defineOptions({
  name: 'SvgIcon'
});
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: v-bind(iconWidth);
  height: v-bind(iconHeight);
  fill: v-bind('props.color');
  vertical-align: middle;
}

.svg-icon:focus {
  outline: none;
}
</style>
