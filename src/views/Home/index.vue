<template>
  <Card title="文件上传" style="width: 500px">
    <Uplode action="/api/upload/avatar" list-type="picture" :before-upload="beforeUpload" :data="{ a: '456' }">
      <div class="upload-btn">
        <PlusOutlined class="icon" />
        <div>Upload</div>
      </div>
    </Uplode>
  </Card>

  <Card title="Ant Design Vue Upload" style="width: 500px; margin-top: 15px">
    <AntUpload action="/jiji" :multiple="true"> 点击上传 </AntUpload>
  </Card>
</template>

<script lang="ts">
export default {
  name: 'home-page',
}
</script>

<script lang="ts" setup>
import Uplode from '@/components/Upload/index.vue'
import { Card, Upload as AntUpload } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
const beforeUpload = (file: File) => {
  // return new Promise<File>((resolve, reject) => {
  //   const a = 123 as unknown as File
  //   resolve(a)
  // })
  return true
}
</script>

<style lang="less" scoped>
.upload-btn {
  width: 110px;
  height: 110px;
  box-sizing: border-box;
  border: 1px solid @border-color-base;
  text-align: center;
  .icon {
    padding-top: 30px;
  }
}
</style>
