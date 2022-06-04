<template>
  <component :is="props.tag || 'div'" :style="styleProps" @click="handleClick"> {{ props.text }}</component>
</template>

<script lang="ts">
export default {  name: 'l-text' }
</script>

<script lang="ts" setup>
import { textDefaultProps, transformToComponentProps } from '@/config/defaultProps'
import useComponentCommon from '@/hooks/useComponentCommon'

const props = defineProps(transformToComponentProps(textDefaultProps))
const {styleProps, handleClick} = useComponentCommon(props, ['text', 'url', 'actionType'])

</script>

<style lang="less" scoped>

</style>
