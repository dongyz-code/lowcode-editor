<template>
  <div class="child_title">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'child_component',
  props: {
    title: String,
  },
})
</script>

<style lang="less" scoped></style>
