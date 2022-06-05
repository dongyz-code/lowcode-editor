<template>
  <div
    class="edit-wrapper"
    :class="{active: props.isActive}"
    @click="handleClickWrapper"
  >
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
const handleClickWrapper = () => {
  emit('setActive', props.componentId)
}
</script>

<style lang="less" scoped>
.edit-wrapper {
  cursor: pointer;
  &:not(.active) {
    &:hover {
      border: 1px pink dashed;
    }
  }
  &.active {
    border: 1px rgb(59, 82, 235) solid;
  }
}
</style>
