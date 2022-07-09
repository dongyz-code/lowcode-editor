<template>
  <Card title="文件上传" style="width: 500px">
    <Uplode />
  </Card>
</template>

<script lang="ts">
export default {
  name: 'home-page',
}
</script>

<script lang="ts" setup>
import Uplode from '@/components/Upload/index.vue'
import { Card } from 'ant-design-vue'
</script>

<style lang="less" scoped></style>
