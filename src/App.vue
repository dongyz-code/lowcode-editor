<template>
  <router-view />
  <div>counter: {{ editorState.counter }}</div>
  <a-button @click="handleClick">++</a-button>
</template>
<script lang="ts">
  export default {
    name: 'App'
  }
</script>
<script lang="ts" setup>
import { useEditorState } from '@/store/editor'

const editorState = useEditorState()
const handleClick = () => {
  editorState.counter++
}
</script>

<style lang="less">

</style>
