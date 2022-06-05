<template>
  <h3 class="component-list-title">组件列表</h3>
  <ul class="component-list-content">
    <li
      v-for="(item, index) in props.list"
      :key="index"
      class="component-item"
      @click="handleClick(item)"
    >
      <LText v-bind="(item as TextComponentProps)" />
    </li>
  </ul>
</template>

<script lang="ts">export default { name: 'component-list' }</script>
<script lang="ts" setup>
import LText from '@/components/LText/index.vue'
import { TextComponentProps } from '@/config/defaultProps'
const props = defineProps({
  list: {
    type: Array,
    require: true
  }
})
const emit = defineEmits(['add-component-to-canvas'])

/**
 * 点击组件目录，添加到画布区域
 */
const handleClick = (component: any) => {
  emit('add-component-to-canvas', component as TextComponentProps)
}

</script>


<style lang="less" scoped>
  .component-list-title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin: 12px 0;
  }
  .component-list-content {
    .component-item {
      text-align: left;
      margin: 10px 0;
    }
  }
</style>
