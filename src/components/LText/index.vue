<template>
  <component :is="props.tag || 'div'" :style="styleProps"> {{ props.text }}</component>
</template>

<script lang="ts">
export default {  name: 'l-text' }
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { pick } from 'lodash-es'
const props = defineProps<{
  text: string,
  fontSize: string,
  tag: string
}>()

const styleProps = computed(() => pick(props, ['fontSize']))
console.log('styleProps', styleProps)
console.log('props', props)


</script>

<style lang="less" scoped>

</style>
