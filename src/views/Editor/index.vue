<template>
  <div class="main-editor-wrapper">
    <div class="component-list-wrapper">
      <ComponentList :list="defaultTextTemplates" @addComponentToCanvas="addComponentToCanvas" />
    </div>
    <div class="canvas-wrapper">
      <h2 class="canvas-title">画布区域</h2>
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
import { v4 as uuid } from 'uuid'
import ComponentList from '@/components/ComponentList/index.vue'
import LText from '@/components/LText/index.vue'
import { useEditorProps } from '@/store/editor'
import { defaultTextTemplates } from '@/config/defaultTemplates'
import { TextComponentProps } from '@/config/defaultProps'
const editorProps = useEditorProps()
const { components } = storeToRefs(editorProps)

/** 因为setup中组件无法注册组件，所以定义一个componentMap，以便模板中使用 */
const componentsMap: any = {
  'l-text': LText,
}

const addComponentToCanvas = (component: TextComponentProps) => {
  const componentData = {
    id: uuid(),
    name: 'l-text',
    props: component
  }
  editorProps.addComponents(componentData)
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
    background-color: #ccc;
  }
  .canvas-title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  .canvas-content {
    position: relative;
    margin: 10px auto;
    box-sizing: border-box;
    height: 80vh;
    min-height: 600px;
    width: 375px;
    border: 1px solid rgb(152, 83, 83);
    background-color: white;
  }

  .component-props-wrapper {
    width: 300px;
    flex-shrink: 0;
    height: 100vh;
    background-color: purple;
  }
}
</style>
