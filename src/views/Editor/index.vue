<template>
  <div class="main-editor-wrapper">
    <div class="component-list-wrapper">组件列表</div>
    <div class="canvas-wrapper">
      <h5>画布区域</h5>
      <div class="canvas-content">
        <component
          v-for="component in components"
          :key="component.id"
          :is="componentsMap[component.name] || 'div'"
          v-bind="component.props"
        />
      </div>
    </div>
    <div class="component-props-wrapper">组件属性</div>
  </div>
</template>

<script lang="ts"> export default { name: 'main-editor' } </script>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import LText from '@/components/LText/index.vue'
import { useEditorProps } from '@/store/editor'
const editorProps = useEditorProps()
const { components } = storeToRefs(editorProps)

/** 因为setup中组件无法注册组件，所以定义一个componentMap，以便模板中使用 */
const componentsMap: any = {
  'l-text': LText,
}

</script>

<style lang="less" scoped>
.main-editor-wrapper {
  display: flex;
  width: 100vw;
  .component-list-wrapper {
    width: 300px;
    height: 100vh;
    flex-shrink: 0;
    background-color: burlywood;
  }

  .canvas-wrapper {
    flex-grow: 1;
    position: relative;
  }
  .canvas-content {
    position: relative;
    margin: 10px;
    box-sizing: border-box;
    height: 80vh;
    border: 1px solid gray;
  }

  .component-props-wrapper {
    width: 300px;
    flex-shrink: 0;
    height: 100vh;
    background-color: purple;
  }
}
</style>
