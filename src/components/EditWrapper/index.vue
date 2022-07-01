<template>
  <div class="edit-wrapper" :class="{ active: props.isActive }">
    <div @click="handleClickWrapper" class="mask">
      <div v-if="props.isActive" class="action">
        <div class="del" @click="handleDel"><DeleteOutlined style="color: red" /></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'eidt-wrapper',
}
</script>
<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  componentId: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    defaule: false,
  },
})

const emit = defineEmits(['setActive', 'delComponent'])
const handleClickWrapper = (e: MouseEvent) => {
  emit('setActive', props.componentId)
  e.stopPropagation()
  e.preventDefault()
}
const handleDel = () => {
  emit('delComponent', props.componentId)
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
    z-index: 10;
    .action {
      height: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
