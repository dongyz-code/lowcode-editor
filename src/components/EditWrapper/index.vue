<template>
  <div class="edit-wrapper" :class="{active: props.isActive}">
    <div @click="handleClickWrapper" class="mask"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'eidt-wrapper',
}
</script>
<script lang="ts" setup>
const props = defineProps({
  componentId: {
    type: String,
    require: true
  },
  isActive: {
    type: Boolean,
    defaule: false
  }
})


const emit = defineEmits(['setActive'])
const handleClickWrapper = (e: MouseEvent) => {
  emit('setActive', props.componentId)
  e.stopPropagation()
  e.preventDefault()
}
</script>

<style lang="less" scoped>
.edit-wrapper {
  position: relative;
  &:not(.active) {
    &:hover {
      border: 1px pink dashed;
    }
  }
  &.active {
    border: 1px rgb(59, 82, 235) solid;
  }

  .mask {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
